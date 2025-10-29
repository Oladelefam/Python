#THis code is bugging like crazy 

from rich.console import Console# This is to make the CLi more user friendly
from rich.table import Table
import pandas as pd
import os
import csv

print("\nWhat would you like to do? ")
print("1.) Add contact")
print("2.) List contacts")
print("3.) Search contact")
print("4.) Save contact")
print("5.) Quit")

Temp_contacts = []


""" This reads the file first and make sures the file exists. """
if os.path.exists('Contact.csv'):
    
    try:
        File = pd.read_csv('Contact.csv') # Fixed 
    except (pd.errors.EmptyDataError, pd.errors.ParserError, TypeError):
        # file exists but is empty or malformed — create an empty DataFrame
        File = pd.DataFrame(columns=['Name', 'Phone', 'Email'])
        File.to_csv('Contact.csv', mode='w', index=False)
else:

        # file exists but is empty or malformed — create an empty DataFrame
    File = pd.DataFrame(columns=['Name', 'Phone', 'Email'])
    File.to_csv('Contact.csv', mode='w', index=False)





def add_contacts(name, phone, email):
    global File
    """ Adds a contact to a list of dictionaries with the name, phone and email. """

    Contact = {"Name": name, "Phone": phone, "Email": email}

    Temp_contacts.append(Contact)
    
    

def list_contacts():
    """ This list all the contact in a particular stlye.
    This is done by reading from the global variable File and the takes the data it needs."""
    global File
    print("Name             Phone               Email\n_______________________________________________")
    
    List_name = list(name for name in File.Name)
    List_email = list(email for email in File.Email)
    List_phone = list(phone for phone in File.Phone)

    #This rewrites out the the data
    for name, email, phone in zip(List_name, List_email, List_phone):
       print(f"{name}            +44{phone}      {email}")
       print("_____________________________________________________")
    

                    



def search_contacts(name):#Last one
    global File

    print(File.loc[File.Name == name])
      

    




def export_to_csv():
    "This export the data to a csv file then clears all the info from the temp list."
    global File, Temp_contacts

    if len(Temp_contacts) == 0: #
        
        print("No contacts to export.")

    else:
 
        Contact_df = pd.DataFrame(Temp_contacts)

         # Check if file already exists
        file_exists = os.path.isfile("Contact.csv")

        # Write to file — only include header if it's a new file
        Contact_df.to_csv("Contact.csv", mode="a", index=False, header=not file_exists, encoding='utf-8')
         
        Temp_contacts.clear()
        print("Saved!")
       
   

while True:

    try:
        User = int(input("\nEnter choices: "))

            
        if User == 1:
            Name = input("Name: ")

            if len(Name) == 0:

                print("Name has to be filled.\n")

                Name = input("Name: ")
            Phone = input("Number: ")
            Email = input("Email: ")
            
            add_contacts(Name, Phone, Email)
        elif User == 2:
            list_contacts()


        elif User == 3:

            Finding = input("Type in the name you are looking for: ")
            search_contacts(Finding)
        elif User == 4:
            export_to_csv()
        elif User == 5:
            exit("Goodbye")
            
        else:
            print("Invalid choice, try again")
    except Exception as e:
        print(f"You just caused a {e}. Try again")


