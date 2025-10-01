import tkinter as tk

root = tk.Tk()



root.geometry("600x600")


#Username
Username_Label = tk.Label(root, text="Username",
                          justify="left")
Username_Label.grid(column=1, row=1)

Username = tk.Entry(root, width=40, borderwidth=1,
                     cursor="arrow")

Username.grid(column=2, row=1)

#Password
Password_Label = tk.Label(root, text="Password",
                          justify="left")
Password_Label.grid(column=1, row=2)

Password = tk.Entry(root, width=40, borderwidth=1,
                     cursor="arrow", show="*")

Password.grid(column=2, row=2)

Password.insert(0, "Password",)
Username.insert(1, "Username")

def myClick():
    User_var = Username.get()
    Pass_var = Password.get()

    if len(Pass_var) == 0: 
        Error_label = tk.Label(root, fg="red", text="You are missing your Password.")
        Error_label.grid(column=2, row=6)
    elif len( User_var) == 0: 
        Error_label = tk.Label(root, fg="red", text="You are missing your Username.")
        Error_label.grid(column=2, row=6)

    else:
        with open("Password.txt", 'w') as file:

            file.write(f"{User_var} and your pasword is {Pass_var} \n")
    Saved_label = tk.Label(root, text="Saved", font=("Comic sans", 10))
    Saved_label.grid(row=6, column=2)
    

   


Submit_but = tk.Button(root, command=myClick ,
                     text="Submit", justify="center")
Submit_but.grid(row=5, column=2)




root.mainloop()