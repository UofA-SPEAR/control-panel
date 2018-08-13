// canvas variables
let drive_canvas;
let drive_ctx;

// this object is sent to the server to send to the rover whenever it is updated
let drive_roverData = {
    left: 0,
    right: 0,
    wheelie: 0,
};

// allows smoother steering controls
let drive_keyPressedMap = {
    left_up: false,
    right_up: false,
    left_down: false,
    right_down: false
};

// default sensitivity, this is controlled with number keys 1-9
let drive_sensitivity = 1;
// this, combinined with drive_senstivity control the drive speed

// quick and dirty fix to remove sensitivity stuff, please do this better
let drive_speedmap = [0, 0.01, 0.03, 0.05, 0.10, 0.15, 0.25, 0.50, 1, 2]; 

// sync mode is for if left and right should be the same
let drive_syncmode = false;

// wheelie mode is for turning, and hopping rocks
let drive_wheeliemode = false;

// should transmit drive signal
let drive_transmitting = false;

let drive_backcolour = '#e53935';
let drive_wheelieoff  = '#e53935';
let drive_wheelieon = '#e58995';

// setup code
function drive_setup() {
    drive_canvas = document.getElementById("drive-model");
    drive_ctx = drive_canvas.getContext("2d");

    drive_addKeyBindings();
    drive_updateDisplay(drive_roverData);

    requestAnimationFrame(drive_onFrame);
}

// keybindings control drive_keyPressedMap instead of rover directly to allow for smoother steering controls
function drive_addKeyBindings() {

    keybindings = {  // Key bindings
        lu : Keys.i, // l = left tread
        ld : Keys.k, // r = right tread
        ru : Keys.o, // u = direction up
        rd : Keys.l, // d = direction down
        s1 : Keys.u, // 1 = sync treads on 
        s0 : Keys.p, // 0 = sync treads off
        w :  Keys.w, // wheelie mode toggle
        q  : Keys.q, // q = quit driving (reset wheels)
        p  : Keys.a, // a = pause driving
    };

    document.getElementById("window-drive").style.backgroundColor = drive_transmitting ? '#e53935' : '#AAAAAA';

    document.onkeydown = function(e) {
        e = e || window.event;
        let code = e.which || e.keyCode;


        // check if 1-9 keys are pressed
        if (code >= Keys.num_1 && code <= Keys.num_9) {
            drive_sensitivity = code - Keys.num_0; // linear scaling for sensitivity from 1-9, probably change this
        } else {
            switch (code) {
                case keybindings.lu:
                    drive_keyPressedMap.left_up = true;
                    break;
                case keybindings.ld:
                    drive_keyPressedMap.left_down = true;
                    break;
                case keybindings.ru:
                    drive_keyPressedMap.right_up = true;
                    break;
                case keybindings.rd:
                    drive_keyPressedMap.right_down = true;
                    break;
                case keybindings.s1:
                    drive_syncmode = true;
                    break;
                case keybindings.s0:
                    drive_syncmode = false;
                    break;
                case keybindings.w:
                    drive_wheeliemode = !drive_wheeliemode;
                    drive_backcolour = drive_wheeliemode ? drive_wheelieon : drive_wheelieoff;
                    document.getElementById("window-drive").style.backgroundColor = drive_transmitting ? drive_backcolour : '#AAAAAA';
                    break;
                case keybindings.p:
                    drive_transmitting = !drive_transmitting;
                    document.getElementById("window-drive").style.backgroundColor = drive_transmitting ? drive_backcolour : '#AAAAAA';
                    // fall through is intentional
                case keybindings.q:
                    drive_roverData.left = drive_roverData.right = 0; 
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
             case keybindings.lu:
                    drive_keyPressedMap.left_up = false;
                    break;
                case keybindings.ld:
                    drive_keyPressedMap.left_down = false;
                    break;
                case keybindings.ru:
                    drive_keyPressedMap.right_up = false;
                    break;
                case keybindings.rd:
                    drive_keyPressedMap.right_down = false;
                    break;
                default:
                    return;
        }
        e.preventDefault();
    }

}
function drive_processData(data){
    drive_roverData = data;
}

let drive_time = 5;
function drive_onFrame(time) {

    if(drive_transmitting){ 
        console.log(drive_keyPressedMap);
        // updates the rover angle based on what keys are press, I.E. only if left XOR right is pressed
        if (drive_keyPressedMap.left_down && !drive_keyPressedMap.left_up) {
            drive_roverData.left -= drive_speedmap[drive_sensitivity];
        } else if (drive_keyPressedMap.left_up && !drive_keyPressedMap.left_down) {
            drive_roverData.left += drive_speedmap[drive_sensitivity];
        }

        if(drive_syncmode){
            drive_roverData.right = drive_roverData.left; 
        }

        if (drive_keyPressedMap.right_down && !drive_keyPressedMap.right_up) {
            drive_roverData.right -= drive_speedmap[drive_sensitivity];
        } else if (drive_keyPressedMap.right_up && !drive_keyPressedMap.right_down) {
            drive_roverData.right += drive_speedmap[drive_sensitivity];
        }

        if(drive_syncmode){
            drive_roverData.left = drive_roverData.right; 
        }


        // bound between -1 and 1
        drive_roverData.right = Math.max(-1, Math.min(drive_roverData.right, 1));
        drive_roverData.left = Math.max(-1, Math.min(drive_roverData.left, 1));


        drive_roverData.wheelie = drive_wheeliemode ? -0.1 : 0;

        drive_time--;
        if(drive_time <= 0){
            drive_time = 5;
            console.log(drive_roverData);
            sendDriveData(drive_roverData); // send updated rover data to server
        }
    }
    drive_updateDisplay();

    // calling this means the browser will call this function again in approximatly 16.666667 milliseconds, it is actually surprisingly consistiant
    requestAnimationFrame(drive_onFrame);
}


function drive_updateDisplay() {

    // Update net info
    document.getElementById("drive-left").innerHTML = (100*drive_roverData.left).toFixed(2);
    document.getElementById("drive-right").innerHTML = (100*drive_roverData.right).toFixed(2);


    const rect_width = drive_canvas.width/6;
    const rect_height = 9/10 * drive_canvas.height;
    drive_ctx.lineWidth=10;

    drive_ctx.beginPath();
    drive_ctx.clearRect(0, 0, drive_canvas.width, drive_canvas.height);
    drive_ctx.rect(drive_canvas.width/3 - rect_width/2, (drive_canvas.height - rect_height) /2, rect_width,rect_height);
    drive_ctx.rect(2 * drive_canvas.width/3 - rect_width/2, (drive_canvas.height - rect_height) /2, rect_width,rect_height);
    drive_ctx.stroke();

    drive_ctx.beginPath();
    drive_ctx.rect(drive_canvas.width/3 - rect_width/2, drive_canvas.height/2-rect_width/2 + (rect_height/2 - rect_width/2)* (-drive_roverData.left),rect_width, rect_width);
    drive_ctx.rect(2*drive_canvas.width/3 - rect_width/2, drive_canvas.height/2-rect_width/2 + (rect_height/2 - rect_width/2)* (-drive_roverData.right),rect_width, rect_width);
    drive_ctx.fill();

}
