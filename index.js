//Source: https://www.youtube.com/watch?v=oSrwWZbEAWs

let submitBtn = document.getElementById("submit-btn");

let generateGif = () => {
  //display loader until gif load
  let loader = document.querySelector(".loader");
  loader.style.display = "block";
  document.querySelector(".wrapper").style.display = "none";

  //Get search value (default => laugh)
  let q = document.getElementById("search-box").value;
  // 10 Gifs to be displayed in result
  let gifCount = 10;
  // API URL
  let finalURL = `https://api.giphy.com/v1/gifs/search?api_key=P6YwmNOCwztkKf1kSvJsvesuKFaDDVgo&q=${q}&limit=${gifCount}&offset=0&country_code=&rating=g&lang=en`;
  document.querySelector(".wrapper").innerHTML = "";

  // send a request (make a call) to API
  fetch(finalURL)
    .then((resp) => resp.json())
    .then((info) => {
      console.log(info.data);
      let gifsData = info.data;
      gifsData.forEach((gif) => {
        // Generate card for every gif
        let container = document.createElement("div");
        container.classList.add("container");
        let iframe = document.createElement("img");
        // check if API responds with data
        console.log(gif);
        iframe.setAttribute("src", gif.images.downsized_medium.url);
        iframe.onload = () => {
          //if iframes has loaded correctly resduce the count when each gif loads
          gifCount--;
          if (gifCount == 0) {
            //if all gifs have loaded the hide loader and display gifs UI
            loader.style.display = "none";
            document.querySelector(".wrapper").style.display = "grid";
          }
        };
        container.append(iframe);
        console.log(iframe);

        //Copy link button
        let copyBtn = document.createElement("button");
        copyBtn.innerHTML = "Copy Link";
        copyBtn.onclick = () => {
          //append the obtained ID to default URL
          let copyLink = `https://media0.giphy.com/media/${gif.id}/giphy.mp4`;
          //Copy text inside the text field
          navigator.clipboard
            .writeText(copyLink)
            .then(() => {
              alert("GIF copied to clipboard");
            })
            .catch(() => {
              //if navigator is not supported
              alert("GIF copied to clipboard");
              //create temporary input
              let hiddenInput = document.createElement("input");
              hiddenInput.setAttribute("type", "text");
              document.body.appendChild(hiddenInput);
              hiddenInput.value = copyLink;
              //Select input
              hiddenInput.select();
              //Copy the value
              document.execCommand("copy");
              //Remove the input
              document.body.removeChild(hiddenInput);
            });
        };
        container.append(copyBtn);

        document.querySelector(".wrapper").append(container);
      });
    });
};

//Generate Gifs on screen load or when user clicks on submit

submitBtn.addEventListener("click", generateGif);
window.addEventListener("load", generateGif);

//TODOS:
//Make the code cleaner (seperated Functions!?)
