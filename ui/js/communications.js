var ws;
var localtime;
var awaytime;
// initialize stuff here
function communications_setup() {
    //ws = new WebSocket("ws://" + window.location.host + "/interface");
    ws = new WebSocket("ws://192.168.0.61:9090/websocket");
    ws.onmessage = handleMessage;
    localtime = new Date().getTime() / 1000;
}

// received messages are handled here, the json string it receives is stored in evt.data
function handleMessage(evt) {
    console.log(evt.data);
    var data = JSON.parse(evt.data); // Parse the incoming JSON
    // if statements to determine how to handle message
    if (data.type == "test") {
        console.log("Message Recived: " + evt.data);
    }else if(data.type == "science"){
        science_processData(data);
    }else if(data.type == "velocity"){
        drive_processData(data);
    }else if(data.type == "time"){
        awaytime = data.time;
    }
}

// sends the drive data to the server in a json format
function sendDriveData(roverData){
    roverData.type = "drive";
    sendMessage(JSON.stringify(roverData));
}

function sendRopeData(RopeData) {
    armData.type = "rope";
    console.log(JSON.stringify(ropeData));
    sendMessage(JSON.stringify(ropeData));
}

function sendArmData(armData) {
    armData.type = "arm";
    console.log(JSON.stringify(armData));
    sendMessage(JSON.stringify(armData));
}

function sendMessage(strData){
    if(ws.readyState == ws.OPEN){
        ws.send(strData);
    }
}

window.onbeforeunload = function() {
    ws.close(); // close the connection when the window is closed
};
