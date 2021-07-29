const body = document.querySelector('body')

function createImage() {
    const image = new Image();
    image.src = "./public/image/background2.jpg"
    image.classList.add('bgImage')
    body.appendChild(image)
}
function init() {
    createImage()
}
init();