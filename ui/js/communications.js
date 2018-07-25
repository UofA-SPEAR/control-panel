var ws;
// initialize stuff here
function communications_setup() {
    //ws = new WebSocket("ws://" + window.location.host + "/interface");
    ws = new WebSocket("ws://192.168.0.61:9090/websocket");
    ws.onmessage = handleMessage;

}

// received messages are handled here, the json string it receives is stored in evt.data
function handleMessage(evt) {
    var data = JSON.parse(evt.data); // Parse the incoming JSON
    console.log(evt.data);

    // if statements to determine how to handle message
    if (data.type == "test") {
        console.log("Message Recived: " + evt.data);
    }else if(data.type == "science"){
        science_processData(data);
    }else if(data.type == "velocity"){
        drive_processData(data);
    }
}

// sends the drive data to the server in a json format
function sendDriveData(roverData){
    roverData.type = "drive";
    sendMessage(JSON.stringify(roverData));
}

function sendArmData(armData) {
    armData.type = "arm";
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
