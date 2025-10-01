# Text based game MVP
# Try to have different outcome but must first try to find out how to do that ?😕
#I am going to try to make the desicion be based of luck
from random import *

print("Welcome to the magical wonderland.")

Enter_user = input("Enter Username: ")

print(f"Welcome {Enter_user.capitalize()} in a world marked for doom you are the hero sent to save it. ")
print("Only you can save them all but you are not alone.")
print("Bulid your companion. I bid you farewell brave hero.")

# Die roll
def dice_roll():
    Die = randint(1, 10)
    return Die
    


Char_uX = input("Enter what characater you are Wizard, Swordsman, Archer: ")
Com_UX = input("Enter what characater your companion is are Wizard, Swordsman, Archer: ")

if Char_uX == Com_UX:
    if Char_uX == "Swordsman":
        Plural = "Swordsmen"
    if Char_uX == "Archer":
        Plural = "Archers"
      
    print(f"\nGood luck adventurer. You are going to need it.\n")

    print(f"Shop_keeper: Well now, we don't see many {Plural} in Ashfern—" \
        "what brings your kind to a forgotten town like ours? "
        "(Staring intently at you and your friend as you wonder around the town)")
    
    Action = input("Would you like to react? To roll type y: ")
    if Action == "y":
        response = dice_roll()
        if response >= 6:
            print(f"You don't react and slowly walk away")
            print("Companion: The quest avavilable are just this 2. A) Find ")
            Cross_input = input("")

        else:
            print(f"{Enter_user}: Careful how you speak—we didn't crawl out of fire and ruin to take lip from a tavern rat")
            print("Narrator: The shopkeeper fumes with anger. The night sky wails with distant thunder, as if echoing his rage.")
            print(" Lanternlight flickers across his scarred face as he slams a hand on the counter.")


else:
    print(f"\nGreat combination of {Char_uX} and {Com_UX}\n")



