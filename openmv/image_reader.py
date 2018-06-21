import io

import serial
from PIL import Image

IMAGE_START = "image_starts_here\n".encode("utf-8")
IMAGE_END = "image_ends_here\n".encode("utf-8")


def get_frame(ser):
    # Waits until the image start signal has been received.
    line = bytes()
    while line != IMAGE_START:
        line = ser.readline()

    # Reads in the data up until the image end signal.
    data = bytearray()
    line = bytes()
    while line != IMAGE_END:
        data.extend(line)
        line = ser.readline()

    # Creates an image object and returns it.
    img = Image.open(io.BytesIO(data))
    return img


def main():
    ser = serial.Serial("COM11", baudrate=115200, timeout=None)
    while True:
        img = get_frame(ser)
        img.show()


if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt as e:
        print("Stopped.")
