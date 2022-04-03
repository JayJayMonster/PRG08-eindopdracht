//variables ML5
const options = {
  numLabels: 5,
};
const featureExtractor = ml5.featureExtractor(
  'MobileNet',
  options,
  modelLoaded
);
const classifier = featureExtractor.classification();

//variables images
let cbIndex = 0;
const img = new Image(512, 384);
const testImg = document.getElementById('output');
let foldernames = ['cardboard', 'glass', 'metal'];
//let amount = [403, 501, 410, 594, 482];
//let amount = [203, 301, 210, 394, 282];
let amount = [30, 35, 45];
let images = [];

for (let index = 0; index < foldernames.length; index++) {
  for (let i = 1; i < amount[index]; i++) {
    images.push({
      file: `./data/${foldernames[index]}/${foldernames[index]}${i}.jpg`,
      label: `${foldernames[index]}`,
    });
  }
}

//variables accuracy
const fileButton = document.getElementById('file');
const button = document.getElementById('btn');
const accuracy = document.getElementById('accuracy');
const save = document.getElementById('save');
let synth = window.speechSynthesis;

//* event listeners
button.addEventListener('click', training);
save.addEventListener('click', saveModel);
fileButton.addEventListener('change', event => loadFile(event));

//functions
function modelLoaded() {
  console.log('Model loaded');
  loadCB();
}

function loadCB() {
  img.src = images[cbIndex].file;
  console.log(images[cbIndex].file);
  img.addEventListener('load', addCb());
}

function addCb() {
  console.log(`Dit is image ${cbIndex} with label ${images[cbIndex].label}`);
  classifier.addImage(img, images[cbIndex].label, imageAddedCb);
}

function imageAddedCb() {
  cbIndex++;
  if (cbIndex < images.length) {
    loadCB();
  } else {
    console.log('finished loading images');
  }
}

function training() {
  classifier.train(lossValue => {
    console.log('Loss is', lossValue);
    if (lossValue == null) {
      saveModel();
    }
  });
}

function loadFile(event) {
  testImg.src = URL.createObjectURL(event.target.files[0]);
}

function saveModel() {
  featureExtractor.save('Model');
}
