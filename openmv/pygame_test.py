import pygame
import serial

import image_reader


def main():
    # Initializes pygame.
    pygame.init()
    screen = pygame.display.set_mode((640, 480))
    # Creates the serial connection.
    ser = serial.Serial("COM11", baudrate=115200, timeout=None)
    # Creates a clock to measure FPS.
    clock = pygame.time.Clock()

    # Begins the main loop.
    running = True
    while running:
        # Gets the image from the OpenMV camera.
        img = image_reader.get_frame(ser)
        # Converts the image to a pygame image.
        img = pygame.image.fromstring(img.tobytes(), img.size, "RGB")
        # Draws the image to the screen.
        screen.fill((0, 0, 0))
        screen.blit(img, img.get_rect())
        pygame.display.flip()
        # Checks if the user has clicked the close button.
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                running = False
        # Prints the FPS.
        clock.tick()
        fps = clock.get_fps()
        print(fps)


if __name__ == "__main__":
    main()
