from tkinter import *
from PIL import ImageTk, Image

Window = Tk()
Window.title("Images")


icon = PhotoImage(file="logo.png")
Window.iconphoto(False, icon)

#Import images 
imag = ImageTk.PhotoImage(Image.open("logo.png").resize((400, 300)))
imag1 = ImageTk.PhotoImage(Image.open("image1.jpg").resize((400, 300)))
imag2 = ImageTk.PhotoImage(Image.open("image2.jpeg").resize((400, 300)))
imag3 = ImageTk.PhotoImage(Image.open("image3.jpg").resize((400, 300)))
imag4 = ImageTk.PhotoImage(Image.open("image3.webp").resize((400, 300)))

images = [imag, imag1, imag2, imag3, imag4]

counter = 1
# Image layout
my_label = Button(Window, text="Label", image=imag)
my_label.grid(row=0, column=0, columnspan=3)

#Back button
def Rewind(value):
    global my_label
    global Forward_but
    global Rewind_but
    global counter
    global Status_label

    my_label.grid_forget()
    

    my_label = Button(Window, text="Label", image=images[value-1])
    Forward_but = Button(Window, text=">>", command=lambda:Forward(value+1))
    Rewind_but = Button(Window, text="<<", command=lambda:Rewind(value-1))
    
 
   
    if value == 1:
        Rewind_but = Button(Window, text="<<", state=DISABLED)
    
    #Updates
    Status_label = Label(Window, text=f"Image {value} of {len(images)}", bd=1, relief=SUNKEN)
    my_label.grid(row=0, column=0, columnspan=3)
    Rewind_but.grid(column=0, row=1)

    Forward_but.grid(column=2, row=1)
    Status_label.grid(column=1, row=2)



def Forward(value):
    global my_label
    global Forward_but
    global Rewind_but
    global counter
    global Status_label
    
    my_label.grid_forget()
    my_label = Button(Window, text="Label", image=images[value-1])
    Forward_but = Button(Window, text=">>", command=lambda:Forward(value+1))
    Rewind_but = Button(Window, text="<<", command=lambda:Rewind(value-1))
   
    
    if value == len(images):
        Forward_but = Button(Window, text=">>", state=DISABLED)
    
    Status_label = Label(Window, text=f"Image {value} of {len(images)}", bd=1, relief=SUNKEN)
    my_label.grid(row=0, column=0, columnspan=3)
    Rewind_but.grid(column=0, row=1)

    Forward_but.grid(column=2, row=1)
    Status_label.grid(column=1, row=2)





Status_label = Label(Window, text=f"Image {counter} of {len(images)}", bd=1, relief=SUNKEN)
Forward_but = Button(Window, text=">>", command=lambda:Forward(2))
Rewind_but = Button(Window, text="<<", command=lambda:Rewind(2))
Exit_but = Button(Window, text="Exit program", command=Window.quit)


Rewind_but.grid(column=0, row=1)
Exit_but.grid(column=1, row=1)
Forward_but.grid(column=2, row=1, pady=10)

Status_label.grid(column=1, row=2, sticky=W+E)





Window.mainloop()