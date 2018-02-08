// canvas variables
let drive_canvas;
let drive_ctx;

// constants for the speed of controls
const drive_angleRotationSpeed = Math.PI / 300; // arrow rotational speed
const drive_speedChangingSpeed = 0.05; // arrow growth/shrinking speed
const drive_roverMaxSpeed = 10; // in meters per second, effects the scale of the arrow

// this object is sent to the server to send to the rover whenever it is updated
let drive_roverData = {
    netSpeed: 9,
    netAngle: Math.PI / 6
};

// allows smoother steering controls
let drive_keyPressedMap = {
    left: false,
    right: false,
    up: false,
    down: false
};

// default sensitivity, this is controlled with number keys 1-9
let drive_sensitivity = 5;

// setup code
function drive_setup() {
    drive_canvas = document.getElementById("drive-model");
    drive_ctx = drive_canvas.getContext("2d");

    drive_addKeyBindings();
    drive_updateDisplay(drive_roverData);

    requestAnimationFrame(onFrame);
}

// keybindings control drive_keyPressedMap instead of rover directly to allow for smoother steering controls
function drive_addKeyBindings() {
    document.onkeydown = function(e) {
        e = e || window.event;
        let code = e.which || e.keyCode;

        // check if 1-9 keys are pressed
        if (code >= Keys.num_1 && code <= Keys.num_9) {
            drive_sensitivity = code - Keys.num_0; // linear scaling for sensitivity from 1-9, probably change this
        } else {
            switch (code) {
                case Keys.arrow_left:
                    drive_keyPressedMap.left = true;
                    break;
                case Keys.arrow_up:
                    drive_keyPressedMap.up = true;
                    break;
                case Keys.arrow_right:
                    drive_keyPressedMap.right = true;
                    break;
                case Keys.arrow_down:
                    drive_keyPressedMap.down = true;
                    break;
                default:
                    return;
            }
        }
        e.preventDefault();
    }

    document.onkeyup = function(e) {
        e = e || window.event;
        switch (e.which || e.keyCode) {
            case Keys.arrow_left:
                drive_keyPressedMap.left = false;
                break;
            case Keys.arrow_up:
                drive_keyPressedMap.up = false;
                break;
            case Keys.arrow_right:
                drive_keyPressedMap.right = false;
                break;
            case Keys.arrow_down:
                drive_keyPressedMap.down = false;
                break;
            default:
                return;
        }
        e.preventDefault();
    }

}

function onFrame(time) {
    let isChanged = false; // so it doesn't bother sending data if there is no new data

    // updates the rover angle based on what keys are press, I.E. only if left XOR right is pressed
    if (drive_keyPressedMap.left && !drive_keyPressedMap.right) {
        drive_roverData.netAngle += drive_sensitivity * drive_angleRotationSpeed;
        isChanged = true;
    } else if (drive_keyPressedMap.right && !drive_keyPressedMap.left) {
        drive_roverData.netAngle -= drive_sensitivity * drive_angleRotationSpeed;
        isChanged = true;
    }

    // updates the rover speed based on what keys are press, I.E. only if up XOR down is pressed
    if (drive_keyPressedMap.up && !drive_keyPressedMap.down) {
        drive_roverData.netSpeed += drive_sensitivity * drive_speedChangingSpeed;
        isChanged = true;
    } else if (drive_keyPressedMap.down && !drive_keyPressedMap.up) {
        drive_roverData.netSpeed -= drive_sensitivity * drive_speedChangingSpeed;
        isChanged = true;
    }


    if (isChanged) {
        drive_updateDisplay(drive_roverData); // TODO: at some point stop updating the arrow here and wait for the server to respond with the arrow location
        sendDriveData(drive_roverData); // send updated data to server
    }

    // calling this means the browser will call this function again in approximatly 16.666667 milliseconds, it is actually surprisingly consistiant
    requestAnimationFrame(onFrame);
}


function drive_updateDisplay(roverData) {

    // angle should not go into negatives or past two pi, this makes it loop around
    if (roverData.netAngle < 0) {
        roverData.netAngle += Math.PI * 2;
    } else if (roverData.netAngle > Math.PI * 2) {
        roverData.netAngle -= Math.PI * 2;
    }

    // Update net info
    document.getElementById("drive-netspeed").innerHTML = roverData.netSpeed.toFixed(2);
    document.getElementById("drive-netangle").innerHTML = (roverData.netAngle / Math.PI * 180).toFixed(2);


    // calculate length of arrow
    const radius = (drive_canvas.width / 3) / drive_roverMaxSpeed * roverData.netSpeed;
    const arrowHead = 20;

    // clears canvas for redraww
    drive_ctx.clearRect(0, 0, drive_canvas.width, drive_canvas.height);

    // draws circle
    drive_ctx.lineWidth = 3;
    drive_ctx.beginPath();
    drive_ctx.arc(drive_canvas.width / 2, drive_canvas.width / 2, drive_canvas.width / 3, 0, 2 * Math.PI);
    drive_ctx.stroke();

    // draws arrow
    let angle = roverData.netAngle;
    drive_drawArrow(drive_canvas.width / 2, drive_canvas.width / 2, drive_canvas.width / 2 + radius * Math.cos(angle), drive_canvas.width / 2 - radius * Math.sin(angle), arrowHead);

}

// constants relating to the arrow
const drive_arrowColour = "#000000";
const drive_arrowThickness = 25;

// draws that lovely arrow
function drive_drawArrow(fromX, fromY, toX, toY, headSize) {

    const angle = Math.atan2(toY - fromY, toX - fromX);

    //Draws the Line
    drive_ctx.beginPath();
    drive_ctx.moveTo(fromX, fromY);
    drive_ctx.lineTo(toX, toY);
    drive_ctx.strokeStyle = drive_arrowColour;
    drive_ctx.lineWidth = drive_arrowThickness;
    drive_ctx.stroke();

    // Draws the arrow head
    drive_ctx.beginPath();
    drive_ctx.moveTo(toX, toY);
    drive_ctx.lineTo(toX - headSize * Math.cos(angle - Math.PI / 7), toY - headSize * Math.sin(angle - Math.PI / 7));
    drive_ctx.lineTo(toX - headSize * Math.cos(angle + Math.PI / 7), toY - headSize * Math.sin(angle + Math.PI / 7));
    drive_ctx.lineTo(toX, toY);
    drive_ctx.lineTo(toX - headSize * Math.cos(angle - Math.PI / 7), toY - headSize * Math.sin(angle - Math.PI / 7));
    drive_ctx.strokeStyle = drive_arrowColour;
    drive_ctx.lineWidth = drive_arrowThickness;
    drive_ctx.stroke();

    drive_ctx.fillStyle = drive_arrowColour;
    drive_ctx.fill();
}
