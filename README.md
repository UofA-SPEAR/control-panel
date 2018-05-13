# SPEAR Rover Control Panel
A web app designed to control SPEAR's mars rover. Allows the rover to be controlled remotely and receives live feedback.

## Systems
### Drive
Allows the user to control the movement of the rover's wheels.
The drive system uses skid-steer controls, similar to tanks.
The left and right sets of wheels are controlled independently.<br>
Press i to move the left tread up.<br>
Press k to move the left tread down.<br>
Press o to move the right tread up.<br>
Press l to move the right tread down.<br>

### Arm
Our rover features a mechanical arm that allows for 5 ranges of motion:
rotation from the base of the arm, vertical movement of the entire arm,
bending at the first joint, rotation at the wrist, and opening/closing the hand.
These are controlled using the z, x, c, v, and b keys respectively.
Press n to invert the direction of the controls.

### Video
Live video is streamed by the rover's cameras and is displayed by the control panel.
Six video streams should be available for viewing when connected.

## Getting started
Open a terminal and execute `./run.sh`. The test server for the control panel should be launched.<br>
Launch Google Chrome and navigate to http://localhost:8888/. The control panel should appear and be ready for use.

## Authors
Jacob Reckhard, Kyle Hennig, and Hudson Shykowski.
