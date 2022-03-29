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
let foldernames = ['cardboard', 'glass', 'metal', 'paper', 'plastic'];
//let amount = [403, 501, 410, 594, 482];
let amount = [10, 25, 20, 12, 15];
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
const button = document.getElementById('btn');
const accuracy = document.getElementById('accuracy');
const save = document.getElementById('save');

//* event listeners
button.addEventListener('click', training);
save.addEventListener('click', saveModel);

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
      classify();
      //save();
    }
  });
}

function classify() {
  featureExtractor.classify(
    document.getElementById('classifyme1'),
    (err, result) => {
      console.log(result); //? Should output 'metal'
      accuracy.innerText = `I am ${Math.round(
        result[0].confidence * 100
      )}% sure it is ${result[0].label}`;
    }
  );
}

function saveModel() {
  featureExtractor.save('Model');
}

function load() {
  featureExtractor.load();
}
