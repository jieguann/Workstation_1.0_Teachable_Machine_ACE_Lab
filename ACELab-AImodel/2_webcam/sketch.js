// ml5.js: Object Detection with COCO-SSD (Webcam)
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/learning/ml5/1.3-object-detection.html
// https://youtu.be/QEzRxnuaZCk

// p5.js Web Editor - Image: https://editor.p5js.org/codingtrain/sketches/ZNQQx2n5o
// p5.js Web Editor - Webcam: https://editor.p5js.org/codingtrain/sketches/VIYRpcME3
// p5.js Web Editor - Webcam Persistence: https://editor.p5js.org/codingtrain/sketches/Vt9xeTxWJ

// let img;
let video;
let detector;
let detections = [];
let object;
let personArray = [];

function preload() {
  // img = loadImage('dog_cat.jpg');
  detector = ml5.objectDetector('cocossd');
}

function gotDetections(error, results) {
  if (error) {
    console.error(error);
  }
  detections = results;
  detector.detect(video, gotDetections);
}

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();
  detector.detect(video, gotDetections);
}

function draw() {
  drawDetection();
  
}

function drawDetection(){
  image(video, 0, 0);

  for (let i = 0; i < detections.length; i++) {
    object = detections[i];
    stroke(0, 255, 0);
    strokeWeight(4);
    noFill();
    rect(object.x, object.y, object.width, object.height);
    noStroke();
    fill(255);
    textSize(24);
    text(object.label, object.x + 10, object.y + 24);
    

    if(object.label=="person"){
      
      personArray.push(object);
      
    }
  }
  //empty personArray
  // calculate how many people are in the frame
  console.log(personArray.length);
  //turn number of people into a string
  let numPeople = personArray.length.toString();
  client.publish('acelab/humanpresent', numPeople, { qos: 0, retain: false })
  personArray = [];
  

}



//Code for MQTT

const clientId = 'mqttjs_' + Math.random().toString(16).substr(2, 8)

const host = 'wss://mqtt.eclipseprojects.io:443/mqtt'

console.log('Connecting mqtt client')
const client = mqtt.connect(host)

client.on('error', (err) => {
console.log('Connection error: ', err)
client.end()
})

client.on('reconnect', () => {
console.log('Reconnecting...')
})

client.on('message', (topic, message, packet) => {
  console.log('Received Message: ' + message.toString() + '\nOn topic: ' + topic)
})




