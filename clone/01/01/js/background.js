let images = ["01.jpg","02.jpg","03.jpg","04.jpg"];

let backgroundImg = (images[Math.floor(Math.random() * images.length)]);

let bgImage = document.createElement("img");

bgImage.src = `./img/${backgroundImg}`;

document.body.appendChild(bgImage);