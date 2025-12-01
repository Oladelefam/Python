#Beetle Game
#6 = body
#5 = head
#4 = wing - need 2
#3 = leg - need 6
#2 = antenna - need 2
#1 = eye - need 2
#body before other
#head before antenna and eyes
#
import random

def bugdone():

    print("    \/   ")
    print("   0[]0  ")
    print("  -[  ]- ")
    print("  -[||]- ")
    print("  -[  ]- ")


p1bug = ["    \/   ", "   0[]0  ", "  -[  ]- ", "  -[||]- ",  "  -[  ]- "]
p2bug = ["    \/   ", "   0[]0  ", "  -[  ]- ", "  -[||]- ",  "  -[  ]- "]



p1body = False
p1head = False
p1legs = 0
p1wings = 0
p1eyes = 0
p1antenna = 0
p1numrolls = 0

p2body = False
p2head = False
p2legs = 0
p2wings = 0
p2eyes = 0
p2antenna = 0
p2numrolls = 0
winner = ""
gameon = True
while gameon:

    enter = input("Player 1 - Press enter to roll the dice...")
    p1roll = random.randint(1,6)
    p1numrolls = p1numrolls + 1
    print("You rolled a ",p1roll)
    if p1roll == 6:
        print("Body!")
        print(p1bug[3])
        p1body = True
    elif p1roll == 5 and p1body == True:
        print("Head!")
        if p1body == False:
            print("Invalid roll you need to roll a 6 to get a body")
        else:    
            print(p1bug[1])

        p1head = True
    elif p1roll == 4 and p1body == True:
        print("Legs!")
        print(p1bug[3])
        p1legs = p1legs + 1
    elif p1roll == 3 and p1body == True:
        print("Wings!")
        print(p1bug[3])
        p1wings = p1wings + 1
    elif p1roll == 2 and p1head == True:
        print("Eyes!")
        print(p1bug[3])
        p1eyes = p1eyes + 1
    elif p1roll == 1 and p1head == True:
        print("Antenna!")
        print(p1bug[3])
        p1antenna = p1antenna + 1
    else:
        print("You cannot use that yet!")

    if p1antenna >= 2 and p1eyes >= 2 and p1legs >= 6 and p1wings >= 2:
        winner = "player1"
        gameon = False
       
   

    enter=input("Player 2 - Press enter to roll the dice...")
    p2roll = random.randint(1,6)
    p2numrolls = p2numrolls + 1
    print("You rolled a ",p2roll)
    if p2roll == 6:
        print("Body!")
        p2body = True
    elif p2roll == 5 and p2body == True:
        print("Head!")
        p2head = True
    elif p2roll == 4 and p2body == True:
        print("Legs!")
        p2legs = p2legs + 1
    elif p2roll == 3 and p2body == True:
        print("Wings!")
        p2wings = p2wings + 1
    elif p2roll == 2 and p2head == True:
        print("Eyes!")
        p2eyes = p2eyes + 1
    elif p2roll == 1 and p2head == True:
        print("Antenna!")
        p2antenna = p2antenna + 1
    else:
        print("You cannot use that yet!")

    if p2antenna >= 2 and p2eyes >= 2 and p2legs >= 6 and p2wings >= 2:
        winner = "player2"
        gameon = False
       
   



print("Bug complete!")
print("The winner is ",winner)
if winner == "player1":
    print("You took",p1numrolls,"rolls to complete the bug!")
else:
    print("You took",p2numrolls,"rolls to complete the bug!")