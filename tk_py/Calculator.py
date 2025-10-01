from tkinter import *

root = Tk()
root.title("Calculator")

root.configure(background="light blue")

Enter_Scr = Entry(root, width=35, borderwidth=5,)

Enter_Scr.grid(row=0, column=0, columnspan=3, padx=10, pady=10)

#Buttons
def button_click(number): 
    current = Enter_Scr.get()
    Enter_Scr.delete(0, END)
    Enter_Scr.insert(0, str(current) + str(number))

def button_clear():
    Enter_Scr.delete(0, END)

def button_add():
    first_number = Enter_Scr.get()
    global f_num
    global math
    math = "addition"
    f_num = int(first_number)
    Enter_Scr.delete(0, END)


def button_divide():
    
    first_number = Enter_Scr.get()
    global f_num
    global math
    math = "Division"
    f_num = int(first_number)
    Enter_Scr.delete(0, END)


def button_subtract():
    first_number = Enter_Scr.get()
    global f_num
    global math
    math = "Subtraction"
    f_num = int(first_number)
    Enter_Scr.delete(0, END)

def button_muti():
    first_number = Enter_Scr.get()
    global f_num
    global math
    math = "Multiplication"
    f_num = int(first_number)
    Enter_Scr.delete(0, END)

def button_ans():
    second_num = Enter_Scr.get()
    
    Enter_Scr.delete(0, END)
    if math == "addition":

        Enter_Scr.insert(0, f_num + int(second_num))
        
    if math == "Subtraction":

        Enter_Scr.insert(0, f_num -  int(second_num))

    if math == "Multiplication":

        Enter_Scr.insert(0, f_num * int(second_num))

    if math == "Division":

        Enter_Scr.insert(0, f_num / int(second_num))
button_1 = Button(root, text="1", padx=40, pady=20, command=lambda: button_click(1))
button_2 = Button(root, text="2", padx=40, pady=20, command=lambda:button_click(2))
button_3 = Button(root, text="3", padx=40, pady=20, command=lambda: button_click(3))
button_4 = Button(root, text="4", padx=40, pady=20, command=lambda:button_click(4))
button_5 = Button(root, text="5", padx=40, pady=20, command=lambda:button_click(5))
button_6 = Button(root, text="6", padx=40, pady=20, command=lambda:button_click(6))
button_7 = Button(root, text="7", padx=40, pady=20, command=lambda:button_click(7))
button_8 = Button(root, text="8", padx=40, pady=20, command=lambda:button_click(8))
button_9 = Button(root, text="9", padx=40, pady=20, command=lambda:button_click(9))
button_0 = Button(root, text="0", padx=40, pady=20, command=lambda:button_click(0))
button_plus = Button(root, text="+", padx=40, pady=20, command=button_add)
button_sub = Button(root, text="-", padx=40, pady=20, command=button_subtract)
button_multi = Button(root, text="x", padx=40, pady=20, command=button_muti)
button_div = Button(root, text="÷", padx=40, pady=20, command=button_divide)
button_equal = Button(root, text="=", padx=40, pady=50, command=button_ans)
button_Clear = Button(root, text="Clear", padx=79, pady=20, command=button_clear)
#Button Positions

button_1.grid(row=3, column=0)
button_2.grid(row=3, column=1)
button_3.grid(row=3, column=2)

button_4.grid(row=2, column=0)
button_5.grid(row=2, column=1)
button_6.grid(row=2, column=2)

button_7.grid(row=1, column=0)
button_8.grid(row=1, column=1)
button_9.grid(row=1, column=2)

button_0.grid(row=4, column=0)
button_plus.grid(row=4, column=1)
button_sub.grid(row=4, column=2)

button_multi.grid(row=5, column=0)
button_div.grid(row=5, column=1)
button_equal.grid(rowspan=2, row=5, column=2)
button_Clear.grid(row=6, columnspan=2, column=0)









root.mainloop()