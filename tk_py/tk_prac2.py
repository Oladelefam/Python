from tkinter import *
from PIL import Image, ImageTk

Window = Tk()
Window.title("New Project")

icon = PhotoImage(file="logo.png")
Window.iconphoto(False, icon)

r = IntVar()
r.set("2")

def clicked(value):
    mylab = Label(Window, text=value)
    mylab.pack()
    
Modes = [
    ("Pepperoni", "Pepperoni"),
    ("Cheese", "cheese"),
    ("Bacon", "Bacon"),
    ("Mushroom", "Mushroom"),
]


frame = LabelFrame(Window, text="This my Frame.......", padx=56, pady=57)
frame.pack(padx=90, pady=80)

Myb = Button(frame, text="Don't click here")
Myb2 = Button(frame, text="...... or here")

Myb.grid(row=0, column=0)
Myb2.grid(row=1, column=1)


#Radiobutton(Window, text="Option one", variable=r, value=1, command=lambda:clicked(r.get())).pack()
#Radiobutton(Window, text="Option 2", variable=r, value=2, command=lambda:clicked(r.get())).pack()

mylab = Label(Window, text=r.get())
mylab.pack()

Window.mainloop()