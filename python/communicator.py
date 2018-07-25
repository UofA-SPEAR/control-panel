def handleSteeringDirections(steeringData):
    """Processes and sends steering data to the rover from the home base controller"""
    speed = steeringData["left"]
    angle = steeringData["right"]
    print("Sending left(%f) and right(%f)" % (speed, angle))
    # TODO: actually send data to rover
