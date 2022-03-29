const width = 512;
const height = 384;

console.log('nn');
const options = {
  inputs: [512, 384, 3],
  task: 'imageClassification',
  debug: true,
};

const nn = ml5.neuralNetwork(options);
let cardboard = [];

function preload() {
  console.log('model loaded');
  for (let i = 1; i < 20; i++) {
    let index = nf(i, 1, 0);
    cardboard[i] = loadImage(`data/cardboard/cardboard${index}.jpg`);
    console.log(cardboard[i]);
  }
}

function setup() {
  image(cardboard[0], 0, 0, width, height);
  //addImages();
}

function addImages() {
  for (let i = 1; i < 20; i++) {
    nn.addData({ image: cardboard[i] }, { label: 'cardboard' });
  }
  nn.normalizeData();
  console.log('You are now here');
  nn.train({ epochs: 20 }, finishedtraining);
}

function finishedtraining() {
  console.log('finished training');
}

console.log('The end');
