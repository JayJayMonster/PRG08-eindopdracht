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

const modelURL = URL + 'model.json';
const metadataURL = URL + 'metadata.json';

//variables accuracy
const fileButton = document.getElementById('file');
const button = document.getElementById('btn');
const accuracy = document.getElementById('accuracy');
const testImg = document.getElementById('output');
let synth = window.speechSynthesis;
const labelsArray = ['Cardboard', 'Glass', 'Metal', 'Paper', 'Plastic'];

//* event listeners
button.addEventListener('click', classify);
fileButton.addEventListener('change', event => loadFile(event));

//functions
function modelLoaded() {
  console.log('Model loaded');
  load();
}

async function load() {
  featureExtractor.load('./model/model.json');
  console.log('Ive loaded my model');
}

function classify() {
  featureExtractor.classify(
    document.getElementById('output'),
    (err, result) => {
      console.log(result);
      accuracy.innerText = `I am ${Math.round(
        result[0].confidence * 100
      )}% sure it is ${labelsArray[result[0].label]}`;
      speak(accuracy.innerHTML);
    }
  );
}

function speak(text) {
  if (synth.speaking) {
    return;
  }
  if (text !== '') {
    let utterThis = new SpeechSynthesisUtterance(text);
    synth.speak(utterThis);
  }
}

function loadFile(event) {
  testImg.src = URL.createObjectURL(event.target.files[0]);
}
