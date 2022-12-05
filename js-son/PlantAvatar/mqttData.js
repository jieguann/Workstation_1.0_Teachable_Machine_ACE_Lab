


var humanMessage;


const mqtt = require("mqtt")
const clientId = 'mqttjs_' + Math.random().toString(16).substr(2, 8)
//ar humanMessage;

  const host = 'wss://mqtt.eclipseprojects.io:443/mqtt'

  //console.log('Connecting mqtt client')
  const client = mqtt.connect(host)

 

  client.on('connect', () => {
  console.log('Client connected:' + clientId)
  // Subscribe
  client.subscribe('acelab/humanpresent', { qos: 0 })
  //client.subscribe('acelab/humanpresent', { qos: 0 })
})


  client.on('message', (topic, message, packet) => {
    //client.subscribe('acelab/humanpresent', { qos: 0 })
    var msg = message.toString()
    //return humanMessage;
    if(topic == 'acelab/humanpresent'){

    if(msg == "Human Present"){
       humanMessage = true;
    }
    else{
      humanMessage = false;
    }

    
    
}
    
    //console.log('Received Message: ' + message.toString() + '\nOn topic: ' + topic)
})



  //console.log(humanMessage);
 // console.log(human());