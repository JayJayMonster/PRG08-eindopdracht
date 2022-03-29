//variables ML5
const options = {
  version: 1,
  topk: 3,
  learningRate: 0.01,
  hiddenUnits: 150,
  epochs: 200,
  numLabels: 6,
  batchSize: 1.0,
};

const featureExtractor = ml5.featureExtractor(
  'MobileNet',
  options,
  modelLoaded
);
const classifier = featureExtractor.classification();

//variables images
let cbIndex = 1;
let glassIndex = 1;
let metalIndex = 1;
let paperIndex = 1;
let plasticIndex = 1;
let trashIndex = 1;
const imgcb = document.getElementById('traincb');
const imgGlass = document.getElementById('trainglass');
const imgMetal = document.getElementById('trainmetal');
const imgPaper = document.getElementById('trainpaper');
const imgPlastic = document.getElementById('trainplastic');
const imgTrash = document.getElementById('traintrash');
const button = document.getElementById('btn');

//variables accuracy
const accuracy = document.getElementById('accuracy');

button.addEventListener('click', training);

//functions
function modelLoaded() {
  console.log('Model loaded');
  loadCB();
  loadGlass();
  loadMetal();
  loadPaper();
  loadPlastic();
  loadTrash();
}

function loadCB() {
  imgcb.src = `data/cardboard/cardboard${cbIndex}.jpg`;
  imgcb.addEventListener('load', addCb());
}

function loadGlass() {
  imgGlass.src = `data/glass/glass${glassIndex}.jpg`;
  imgGlass.addEventListener('load', addGlass());
}

function loadMetal() {
  imgGlass.src = `data/metal/metal${metalIndex}.jpg`;
  imgGlass.addEventListener('load', addMetal());
  metalIndex++;
}

function loadPaper() {
  imgPaper.src = `data/paper/paper${paperIndex}.jpg`;
  imgPaper.addEventListener('load', addPaper());
  paperIndex++;
}

function loadPlastic() {
  imgPlastic.src = `data/plastic/plastic${plasticIndex}.jpg`;
  imgPlastic.addEventListener('load', addPlastic());
  plasticIndex++;
}

function loadTrash() {
  imgTrash.src = `data/trash/trash${trashIndex}.jpg`;
  imgTrash.addEventListener('load', addTrash());
  trashIndex++;
}

function addCb() {
  console.log(`Dit is cb ${cbIndex}`);
  classifier.addImage(imgcb, 'cardboard', imageAddedCb);
}

function addMetal() {
  console.log(`Dit is metal ${metalIndex}`);
  classifier.addImage(imgMetal, 'metal', imageAddedMetal);
}

function addGlass() {
  console.log(`Dit is glass ${glassIndex}`);
  classifier.addImage(imgGlass, 'glass', imageAddedGlass);
}

function addPaper() {
  console.log(`Dit is paper ${paperIndex}`);
  classifier.addImage(imgPaper, 'paper', imageAddedPaper);
}

function addPlastic() {
  console.log(`Dit is plastic ${plasticIndex}`);
  classifier.addImage(imgPlastic, 'plastic', imageAddedPlastic);
}

function addTrash() {
  console.log(`Dit is trash ${trashIndex}`);
  classifier.addImage(imgTrash, 'trash', imageAddedTrash);
}

function imageAddedCb() {
  cbIndex++;
  //console.log('Feature extractor finished');
  if (cbIndex < 50) {
    loadCB();
  } else {
    console.log('finished loading cardboard images');
  }
}

function imageAddedGlass() {
  glassIndex++;
  //console.log('Feature extractor finished');
  if (glassIndex < 50) {
    loadGlass();
  } else {
    console.log('finished loading glass images');
  }
}

function imageAddedMetal() {
  //console.log('Feature extractor finished');
  if (metalIndex < 50) {
    loadMetal();
  } else {
    console.log('finished loading metal images');
  }
}

function imageAddedPaper() {
  //console.log('Feature extractor finished');
  if (paperIndex < 50) {
    loadPaper();
  } else {
    console.log('finished loading paper images');
  }
}
function imageAddedPlastic() {
  //console.log('Feature extractor finished');
  if (plasticIndex < 50) {
    loadPlastic();
  } else {
    console.log('finished loading plastic images');
  }
}
function imageAddedTrash() {
  //console.log('Feature extractor finished');
  if (trashIndex < 50) {
    loadTrash();
  } else {
    console.log('finished loading trash images');
  }
}

function training() {
  classifier.train(lossValue => {
    console.log('Loss is', lossValue);
    if (lossValue == null) {
      classify();
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
