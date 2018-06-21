import pyb
import sensor

sensor.reset()
sensor.set_pixformat(sensor.RGB565)  # Sets pixel format to RGB565.
sensor.set_framesize(sensor.QVGA)  # Sets frame size to QVGA (320x240).
sensor.skip_frames(time=2000)  # Waits for settings take effect.

# Creates the USB connection.
usb = pyb.USB_VCP()

# Signals to mark the start and end of an image.
IMAGE_START = "image_starts_here\n"
IMAGE_END = "image_ends_here\n"
while (True):
    img = sensor.snapshot()  # Takes a picture and returns the image.
    img = img.compressed(quality=35)  # Compresses the photo as a JPEG.

    # Sends the image to the USB connected device.
    usb.send(IMAGE_START)
    usb.send(img)
    usb.send("\n")
    usb.send(IMAGE_END)
