import pandas as pd
import os

print("\nWhat would you like to do? ")
print("1.) Add contact")
print("2.) List contacts")
print("3.) Search contact")
print("4.) Save contact")
print("5.) Quit")

Temp_contacts = []

""" This reads the file first and make sures the file exists. """
if os.path.exists('Contacts.csv'):
    try:
        File = pd.read_csv('Contacts.csv')# Fixed 
    except (pd.errors.EmptyDataError, pd.errors.ParserError, TypeError):
        # file exists but is empty or malformed — create an empty DataFrame
        File = pd.DataFrame(columns=['Name', 'Phone', 'Email'])
        File.to_csv('Contact.csv', index=False)
else:
    File = pd.DataFrame(columns=['Name', 'Phone', 'Email'])
    File.to_csv('Contact.csv', index=False)


 


def add_contacts(name, phone, email):
    """ Adds a contact to a list of dictionaries with the name, phone and email. """

    Contact = {"Name": name, "Phone": phone, "Email": email}

    Temp_contacts.append(Contact)
    print(Temp_contacts)
    

def list_contacts():
    print("Name             Phone               Email\n_______________________________________________")

def search_contacts(name):
    pass



def export_to_csv():
    global File, Temp_contacts

    if len(Temp_contacts) == 0: #
        
        print("No contacts to export.")

    else:
 
        Contact_df = pd.DataFrame(item for item in Temp_contacts)

        Contact_df.to_csv('Contact.csv', mode="a", index=False)

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
        

        else:
            print("Invalid choice, try again")
    except Exception as e:
        print(f"You just caused a {e}. Try again")


