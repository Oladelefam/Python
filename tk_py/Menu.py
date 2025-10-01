from tkinter import *
from PIL import Image, ImageTk

Window = Tk()

Menus = [
    ("Pepperoni", "Pepperoni"),
    ("Cheese", "Cheese"),
    ("Bacon", "Bacon"),
    ("Mushroom", "Mushroom"),
    ("Ham", "Ham"),
]

pizza = StringVar()
pizza.set("Pepperoni")

def select():
    Mylabel = Label(Window, text=pizza.get())
    Mylabel.pack()
for text, mode in Menus:
    Menubut = Radiobutton(Window, text=text, variable=pizza, value=mode, command=select)
    Menubut.pack(anchor=W)













Window.mainloop()