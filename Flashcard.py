import json
import random

with open('Flashcard.json', 'r') as card:
    Flash = json.load(card)

Counter = 0

while Counter < 7:
    card = random.choice(Flash)
    User_input = input(f"{card['question']}: ")

    # Normalize both inputs for comparison
    correct_answer = str(card['answer']).lower()
    user_answer = str(User_input).lower()

    if user_answer == correct_answer:
        print('Correct')
    else:
        print("Wrong")
    Counter += 1

print("Bye.")