// canvas variables
let arm_canvas;
let arm_ctx;

function arm_setup() {
    arm_addKeyBindings();
    drive_canvas = document.getElementById("arm-model");
    drive_ctx = drive_canvas.getContext("2d");
}

function arm_render() {
    requestAnimationFrame(arm_render);
    arm_renderer.render(arm_scene, arm_camera);
  }

// --------------------------------------
// ----- Controls and communication -----
// --------------------------------------

// Sent by the control panel to the rover.
let arm_roverData = {
    shoulder: 400,
};

// Receives input from the user, then updates the 3D model and the rover.
function arm_onMove() {
    // Updates the 3D model of the arm.

    if(arm_roverData.shoulder <= 0){
        arm_roverData.shoulder = 0;
    }

    if(arm_roverData.shoulder >= 1024){
        arm_roverData.shoulder = 1024;
    }

    // Asks the rover to move the arm accordingly.
    let ang = arm_roverData.shoulder;
    arm_roverData.shoulder = arm_roverData.shoulder / 1024 * 4294967295;
    console.log(ang);
    sendArmData(arm_roverData);
    arm_roverData.shoulder = ang;
}

// Moves the arm when the user clicks on the keys z, x, c, v, and b.
// Pressing n toggles the direction of the motion.
let arm_increment = 50;
function arm_addKeyBindings() {
    window.addEventListener("keydown", e => {
        e = e || window.event;
        switch (e.which || e.keyCode) {
            case Keys.x:
                arm_roverData.shoulder += arm_increment;
                arm_onMove();
                break;
            case Keys.m:
                arm_increment *= -1;
                break;
        }
        e.preventDefault();
    });
}

function arm_updateDisplay() {

    const rect_width = arm_canvas.width/6;
    const rect_height = 9/10 * arm_canvas.height;
    arm_ctx.lineWidth=10;

    arm_ctx.beginPath();
    arm_ctx.clearRect(0, 0, arm_canvas.width, arm_canvas.height);
    arm_ctx.rect(arm_canvas.width/3 - rect_width/2, (arm_canvas.height - rect_height) /2, rect_width,rect_height);
    arm_ctx.rect(2 * arm_canvas.width/3 - rect_width/2, (arm_canvas.height - rect_height) /2, rect_width,rect_height);
    arm_ctx.stroke();
}
