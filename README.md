# SPEAR Rover Control Panel
A web app designed to control SPEAR's mars rover. Allows the rover to be controlled remotely and receives live feedback. Designed for use on Google Chrome.

## Systems
### Drive
Allows the user to control the movement of the rover's wheels.
The drive system uses skid-steer controls, similar to tanks.
The left and right sets of wheels are controlled independently.<br>
Press i to move the left tread up.<br>
Press k to move the left tread down.<br>
Press o to move the right tread up.<br>
Press l to move the right tread down.<br>

Press q to reset both wheels to 0<br>

Press u to turn on sync mode<br>
Press p to turn off sync mode<br>

Sync mode allows one to control both sides at the same time. Like if you want to drive in a straight line. Note, upon turning sync mode on, the right wheels will match the position of the left wheels.

Sensitivity is controlled using the 1-9 keys on the keypad. Default is 1 so we don't send the rover through a wall on startup.

### Arm
Our rover features a mechanical arm that allows for 5 ranges of motion:
rotation from the base of the arm, vertical movement of the entire arm,
bending at the first joint, rotation at the wrist, and opening/closing the hand.
These are controlled using the z, x, c, v, and b keys respectively.
Press n to invert the direction of the controls.

### Video
Live video is streamed by the rover's cameras and is displayed by the control panel.
Multiple video streams should be available for viewing when all the cameras are connected.
Uses FFmpeg and an NGINX server to transcode and stream video on the fly.

## Getting started
Open a terminal and execute `./run.sh`. The test server for the control panel should be launched.<br>
Launch Google Chrome and navigate to http://localhost:8888/. The control panel should appear and be ready for use.
