let playBtn = document.getElementById('play-button');
let menuScene = document.getElementById('menu-scene');
let webcamScene = document.getElementById('webcam-scene');
let mainBody = document.getElementById('main-body');
let snap = document.getElementById('snap');
let marcoThumb = document.getElementById('marco-thumb');
let marco;

const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const errorMsgElement = document.querySelector('span#errorMsg');


const constraints = {
  audio: false,
  video: {
    width: 1280, height: 720
  }
};

// Access webcam
async function init() {
  try {
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      handleSuccess(stream);
  } catch (e) {
      errorMsgElement.innerHTML = `navigator.getUserMedia error:${e.toString()}`;
  }
}

// Success
function handleSuccess(stream) {
  window.stream = stream;
  video.srcObject = stream;
}

// Load init
init();

// Draw image
var context = canvas.getContext('2d');
snap.addEventListener("click", function() {
  context.drawImage(video, 0, 0, 640, 480);
});

async function takeScreenshot (){
  let canva = document.getElementsByTagName("canvas")[0];
  let url = canva.toDataURL('image/png');

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const originalImage = new Image();
  originalImage.src = url;

  const logo2 = new Image();
  if (marco === 'marco1'){
    logo2.src = "assets/images/marco1.png";
  }else if(marco === 'marco2'){
    logo2.src = "assets/images/marco2.png";
  }else if(marco === 'marco3'){
    logo2.src = "assets/images/marco3.png";
  }else if(marco === 'marco4'){
    logo2.src = "assets/images/marco4.png";
  }

  Promise.all([
    new Promise((resolve) => originalImage.onload = resolve),
    new Promise((resolve) => logo2.onload = resolve)
  ]).then(() => {
    const logo2Width = originalImage.width;
    const logo2Height = 150;

    canvas.width = originalImage.width;
    canvas.height = originalImage.height;
    ctx.drawImage(originalImage, 0, 0);

    const logo2X = 0;
    const logo2Y = canvas.height - logo2Height;
    ctx.drawImage(logo2, logo2X, logo2Y, logo2Width, logo2Height);

    const imageWithLogo = new Image();
    imageWithLogo.src = canvas.toDataURL();
    
    /* ***** */
      // Decodificar la imagen Base64
      const imageData = imageWithLogo.src.split(',')[1];
      const decodedImageData = atob(imageData);
      // Convertir la imagen decodificada en un arreglo de bytes
      const byteCharacters = decodedImageData.split('').map(char => char.charCodeAt(0));
      const byteArray = new Uint8Array(byteCharacters);
      // Crear un objeto Blob a partir del arreglo de bytes
      const blob = new Blob([byteArray], { type: 'image/png' }); // Ajusta el tipo MIME según el formato de la imagen
      // Crear un objeto FormData y agregar el blob
      const formData = new FormData();
      formData.append('image', blob, 'image.png'); // El último parámetro es el nombre del archivo
    /* ***** */
    Livewire.emit('savePhotoListener', imageWithLogo.src)
  });
}

function play (){
  setTimeout(() => {
    webcamScene.setAttribute("class", "webcam-scene");
    menuScene.setAttribute("class", "hidden");
    mainBody.style.background = "url('./assets/images/back2.jpg') no-repeat";
    mainBody.style.backgroundSize = "cover";
  }, 500);
}

function setMarco(name){
  marcoThumb.src = `./assets/images/${name}.png` ;
  marco = name;
}

playBtn.addEventListener('click', play);
snap.addEventListener('click', takeScreenshot);