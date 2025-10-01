import random
import tkinter

print("_________________Welcome to the number guessing___________________")


Counter = 0
try:
  while Counter < 6:
    Level = 1
    NUMS = random.randint(1, 100)

    
    
    Guess_input = int(input("Guess: "))
    if NUMS < Guess_input:
          print("That's too high. 📈")
          Counter += 1

    elif NUMS > Guess_input:
          print("That's too little. 📉")
          Counter += 1


    elif NUMS == Guess_input:
          print(f"You're correct its {NUMS}")
          Counter += 1
   

  print(f"You have used up your guesses the answer is {NUMS}.")
        
except Exception as e:
   print(f"Exeception: {e}")

    