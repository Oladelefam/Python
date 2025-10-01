#Redo this project
from tkinter import *
import json
import random
Window = Tk()
Window.geometry("500x400")

with open("dis.json", "r") as file:
    Card = json.load(file)
    Cards = random.choice(Card)


showing = False



def filp():
    global Question
    global showing
    global Cards

    Question.grid_forget()
    
    if showing:
        
        Question.config(text=Cards['question'])

        Question.grid(row=0, column=0, columnspan=3)
        showing = False
    else:
        Question.grid_forget()

        Question.config(text=Cards['answer'])
        Question.grid(row=0, column=0, columnspan=3)
        showing = True

def next():
    global Question, showing, Cards

    Question.grid_forget()
    
    Cards = random.choice(Card)
    
    Question.config(text=Cards['question'])
    Question.grid(row=0, column=0, columnspan=3, pady=10)



Question = Button(Window, text=Cards['question'], command=filp, width=70, height=20)
Question.grid(row=0, column=0, columnspan=3, pady=10, sticky=W+E)

Cards = random.choice(Card)
Next_but = Button(Window, text=">>", command=next)
Next_but.grid(row=1, column=2, sticky=W+E)










Window.mainloop()