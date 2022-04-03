let cardboard = [];
let glass = [];
let metal = [];

function preload() {
  console.log('model loaded');
  for (let i = 1; i < 20; i++) {
    let index = nf(i, 1, 0);
    cardboard[i] = loadImage(`data/cardboard/cardboard${index}.jpg`);
    glass[i] = loadImage(`data/glass/glass${index}.jpg`);
    metal[i] = loadImage(`data/metal/metal${index}.jpg`);
    //console.log(cardboard);
  }
}

function setup() {
  //createCanvas(400, 400);
  //image(cardboard[1], 0, 0, width, height);

  const options = {
    inputs: [512, 384, 4],
    task: 'imageClassification',
    debug: true,
  };

  const nn = ml5.neuralNetwork(options);

  for (let i = 1; i < cardboard.length; i++) {
    nn.addData({ image: cardboard[i] }, { label: 'cardboard' });
    nn.addData({ image: glass[i] }, { label: 'glass' });
    nn.addData({ image: metal[i] }, { label: 'metal' });
  }
  nn.normalizeData();
  nn.train({ epochs: 50 }, finishedTraining);
}

function finishedTraining() {
  console.log('finished training');
  nn.save();
}

// console.log('The end');
