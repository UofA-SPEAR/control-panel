# OpenMV camera video stream
This folder contains all of the necessary code to stream video directly from the OpenMV camera to the TX2.

## Camera
The module `camera.py` should be compiled to bytecode and run on the OpenMV camera itself. Written in MicroPython, this module handles setting up the camera sensors, creates a USB connection, and sends a JPEG image to the connected device.<br><br>
The [OpenMV IDE](https://openmv.io/pages/download) can be used to easily write code to the camera.

## Image reader
The module `image_reader.py` is used to communicate with the camera module. It reads in the JPEG images sent by the camera, and converts the raw bytes into Pillow Image objects. Please see the [Pillow documentation](https://pillow.readthedocs.io/en/5.1.x/) for more information.

Use `image_reader.get_frame()` to get the most next frame sent by the camera.

## Server
The module `server.py` creates a Tornado server capable of streaming MJPEG video using images from the image reader. Connect to the endpoint  `/video-stream` to begin streaming.<br><br>
If you wish to embed the video within a page, use an image element as follows:
```
<img src="/video-stream">
```
The image element will automatically update the displayed image to match the current frame of the camera.

## Pygame test
Created to test if the video stream was working, the module `pygame_test.py` creates a new window and draws the current frame of the camera to the screen. It can also be used to determine the frame rate of the received video.

## Authors
Kyle Hennig
