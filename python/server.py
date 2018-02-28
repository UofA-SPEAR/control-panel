import json
import os

import tornado.ioloop
import tornado.web
import tornado.websocket

import communicator


# WebSocketHandler handles the data connection to the client
class Handler(tornado.websocket.WebSocketHandler):
    # open is run when a client connections to the WebSocket
    def open(self):
        """ Sends the client any data they need on connection"""
        print("Client Connected")
        # Test data, TODO: remove for production
        self.write_message('{"type":"test"}')
        self.write_message(
            '{"type":"science", "moisture": 5, "temperature": 27, "uv": 119.3, "gps": {"lon": 113.543, "lat": 129.765}}')
        self.write_message(
            '{"type":"velocity", "netAngle": 0.5, "netSpeed": 9}')

    # on_message is run anytime the server recives a new message from the client
    def on_message(self, data):
        """ Basically the mailroom, all incoming messages are sorted and sent elsewhere """
        # load the message json into an object
        message = json.loads(data)

        # Send external communications to communicator.py
        if message["type"] == "drive":
            communicator.handleSteeringDirections(message)
        elif message["type"] == "arm":
            print("arm")

    # Run when the WebSocket connection is lost
    def on_close(self):
        """ For cleaning up when client disconnects """
        print("Client Disconnected")


# Static handler serves the ui to the client through the browser, uses the ui folder
class StaticHandler(tornado.web.StaticFileHandler):
    def parse_url_path(self, url_path):
        """ Appends index.html to blank url paths

        This allows urls like localhost:8888 to redirect
        to the actual file path which should be accessed
        with localhost:8888/index.html So basically this
        is just a convenience function
         """
        if not url_path or url_path.endswith('/'):
            url_path = url_path + 'index.html'
        return url_path


def main(port):
    """Creates and runs the server instance on a specifed port"""
    # initialize the tornado object
    application = tornado.web.Application([
        (r"/interface", Handler),
        (r"/video/(.*)", StaticHandler, {"path": os.getcwd() + "/video"}),
        (r"/(.*)", StaticHandler, {"path": os.getcwd() + "/ui"})
    ], debug=True)

    try:
        print("### Initializing Server ###")
        application.listen(port)
        print("Running on port %d" % port)
        tornado.ioloop.IOLoop.current().start()
    except KeyboardInterrupt:
        print("### Ending Server ###")


if __name__ == "__main__":
    main(8888)
