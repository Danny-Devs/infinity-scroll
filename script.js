const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let readyFlag = false;
let imagesLoaded = 0;
let totalImages = 0;
let unsplashDataArr = [];

// Unsplash API
let count = 5;
const apiKey = "HayaNVLUGwFAbHbvTLtX8opgo3no6avC_xXqTfq0LpA";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Check if all images were loaded
function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    readyFlag = true;
    loader.hidden = true;
    // increase # of loaded images to 10 after initial image count load
    count = 10;
  }
}

// Helper function to set attributes on DOM elements
function setAttributes(htmlEl, attributesObj) {
  for (const key in attributesObj) {
    htmlEl.setAttribute(key, attributesObj[key]);
  }
}

function displayPhotos() {
  imagesLoaded = 0;
  totalImages = unsplashDataArr.length;
  unsplashDataArr.forEach((imgObj) => {
    const newAnchor = document.createElement("a");
    setAttributes(newAnchor, {
      href: imgObj.links.html,
      target: "_blank",
    });
    const newImg = document.createElement("img");
    setAttributes(newImg, {
      src: imgObj.urls.regular,
      alt: imgObj.alt_description,
      title: imgObj.alt_description,
    });
    // Event Listener, check when each is finished loading
    newImg.addEventListener("load", imageLoaded);
    newAnchor.appendChild(newImg);
    imageContainer.appendChild(newAnchor);
  });
}

// Get photos from Unsplash API
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    unsplashDataArr = await response.json();
    displayPhotos();
  } catch (error) {
    // Catch Error here
    console.error(error);
  }
}

// Check to see if scrolling near bottom, load more photos
window.addEventListener("scroll", () => {
  if (
    window.scrollY + window.innerHeight > document.body.offsetHeight - 1000 &&
    readyFlag
  ) {
    readyFlag = false;
    getPhotos();
  }
});

// On Load
getPhotos();
