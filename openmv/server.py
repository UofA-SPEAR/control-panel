from io import BytesIO

import serial
import tornado.gen
import tornado.ioloop
import tornado.web

import image_reader

# Connects to the OpenMV camera via serial.
ser = serial.Serial("COM11", baudrate=115200, timeout=None)


class StreamHandler(tornado.web.RequestHandler):
    @tornado.gen.coroutine
    def get(self):
        # Prevents caching.
        self.set_header("Cache-Control", "no-cache, no-store, must-revalidate")
        self.set_header("Pragma", "no-cache")
        self.set_header("Expires", "0")
        # Closes the connection when lost.
        self.set_header("Connection", "close")
        # Specifies the resource is an MJPEG stream and the boundary to use.
        self.set_header("Content-Type", "multipart/x-mixed-replace;boundary=--boundarydonotcross")

        while True:
            # Gets the image from the OpenMV camera.
            img = image_reader.get_frame(ser)
            # Saves the image to a bytes buffer.
            buffer = BytesIO()
            img.save(buffer, format="JPEG")
            # Gets the value stored in the buffer.
            output = buffer.getvalue()

            # Writes the boundary between frames.
            self.write("--boundarydonotcross\n")
            # Writes the necessary headers.
            self.write("Content-type: image/jpeg\r\n")
            self.write("Content-length: {}\r\n\r\n".format(len(output)))
            # Writes the image.
            self.write(output)
            # Yields until the written data has been flushed.
            yield tornado.gen.Task(self.flush)


def main():
    app = tornado.web.Application([
        (r"/video-stream", StreamHandler)
    ])
    app.listen(8888)
    tornado.ioloop.IOLoop.current().start()


if __name__ == "__main__":
    main()
