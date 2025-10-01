from tkinter import *
from PIL import Image, ImageTk
from tkinter import messagebox

Window = Tk()

# showinfo, showwarning, showerror, askquestion, askyesno, askokcancel

def popup():
    response = messagebox.showinfo("This my pop", "Dance monkey")
    Label(Window, text=response).pack()
    #if response == 1:
       # Label(Window, text="Great").pack()
    #else:
     #   Label(Window, text="😒😒😒😒😒").pack()

Button(Window, text="Popup", command=popup).pack()






Window.mainloop()