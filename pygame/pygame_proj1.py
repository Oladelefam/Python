import pygame

pygame.init()
WIDTH, HEIGHT = (500, 600)
WINDOW = pygame.display.set_mode((WIDTH, HEIGHT))



Fps = 60

def main():

    Running = True


    Clock = pygame.time.Clock()
    while Running:
        Clock.tick(Fps)
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                Running = False

if "__main__" == __name__:
    main()
            
