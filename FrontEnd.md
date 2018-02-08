# Front End
This is the UI for controlling the rover.

## HTML and JavaScript Client
The interface is written in JavaScript and handles user input. It has 4 sections.
- Video Feed
- Arm Control
- Drive Control
- Data Panel

Due to the way name spaces work in JavaScript and HTML, a naming convention is to be followed.
The section you are working in is to be prepended to the variable name or id, followed by an _ for variables
and a - for ids.

### Video Feed
This is where live video from the rover's cameras will be displayed.
Video from the rover will be converted in real-time to RTMP using FFmpeg.
An NGINX server will convert the RTMP stream to use the HLS protocol.
The naming convention is video-id for HTML IDs and video_variable for variables

### Arm Control
This is for controlling the arm, a representation of the arms current position will also be displayed here
The naming convention is arm-id for HTML IDs and arm_variable for variables

The plan with this is to use three.js to display a 3d mockup of the arm so we can see how it looks as it's controlled

### Drive Control
This is for controlling the wheels, a vector representing the rovers current velocity as well as numerical data is displayed
The naming convention is drive-id for HTML IDs and drive_variable for variables

Currently this uses the arrow keys to turn and adjust speed, as well as number keys 1-9 to adjust the control sensitivity.
It represents the rovers direction on a canvas so the driver has a visualization of where it is going


### Data Panel
This is for displaying information from the rover
The naming convention is science-id for HTML IDs and science_variable for variables

This is just a grid of information, things will be added and moved as more things are needed to be displayed


## Python Web-server
The JavaScript client will connect to the python web-server which should be running on the same machine. It then will then convert the abstract instructions from the client into instructions to send to the rover.
