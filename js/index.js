//variables ML5
const options = {
  epochs: 35,
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
const imgcb = document.getElementById('traincb');

const button = document.getElementById('btn');
let foldernames = ['cardboard', 'glass', 'metal', 'paper', 'plastic'];
//let amount = [403, 501, 410, 594, 482];
let amount = [200, 250, 201, 221, 215];

let images = [];

for (let index = 0; index < foldernames.length; index++) {
  for (let i = 1; i < amount[index]; i++) {
    images.push({
      file: `./data/${foldernames[index]}/${foldernames[index]}${i}.jpg`,
      label: `${foldernames[index]}`,
    });
  }
}

console.log(images);

//variables accuracy
const accuracy = document.getElementById('accuracy');

button.addEventListener('click', training);

//functions
function modelLoaded() {
  console.log('Model loaded');
  loadCB();
}

function loadCB() {
  imgcb.src = images[cbIndex].file;
  console.log(images[cbIndex].file);
  imgcb.addEventListener('load', addCb());
}

function addCb() {
  console.log(`Dit is cb ${cbIndex} with label ${images[cbIndex].label}`);
  classifier.addImage(imgcb, images[cbIndex].label, imageAddedCb);
}

function imageAddedCb() {
  cbIndex++;
  //console.log('Feature extractor finished');
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
      //classify();
      save();
    }
  });
}

function classify() {
  featureExtractor.classify(
    document.getElementById('classifyme1'),
    (err, result) => {
      console.log(result); //? Should output 'metal'
      accuracy.innerText = `Accuracy = ${result[0].confidence}`;
    }
  );
}

function save() {
  featureExtractor.save('Model');
}

function load() {
  featureExtractor.load();
}
