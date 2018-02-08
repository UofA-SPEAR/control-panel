def handleSteeringDirections(steeringData):
    """Processes and sends steering data to the rover from the home base controller"""
    speed = steeringData["netSpeed"]
    angle = steeringData["netAngle"]
    print("Sending speed(%f) and angle(%f)" % (speed, angle))
    # TODO: actually send data to rover
