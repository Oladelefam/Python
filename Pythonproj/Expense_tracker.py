import pandas as pd
import os
#opening texts
print("\nWhat would you like to do?")
print("1. Add Expenses")
print("2. List Expenses")
print("3. Total Expenses")
print("4. Save")
print("5. Quit")

Expenses = {}


if os.path.exists('Expense.csv'):
    File = pd.read_csv('Expense.csv')
else:
    # Creates an empty DataFrame with appropriate columns if file doesn't exist
    df = pd.DataFrame(columns=['Descripition', 'Amount'])
    df.to_csv('Expense.csv', index=False)


def add_expenses(description, amount):

    """ This adds the descripition 
    and amount to a dictionary and when the user selects
     Quit saves to a csv file. """
    
    global Expenses
    Expenses.update({description : amount})
    
      

def list_expenses():
    global Expenses


    try:
        File = pd.read_csv('Expense.csv')

        print(File.set_index("Descripition"))
        print(f"{len(File.columns) - 1} item in your list.")

     

    except FileNotFoundError:

        print("The file cannot be found. ")

    except Exception as e:
        print(e)


def total_expenses():
    global Expenses
    File = pd.read_csv('Expense.csv')
    Total = [item.replace("£", "") for item in File['Amount']]
    for num in Total:
        amt = [float(num)]
        
    print(f"\n£{sum(amt)} in total")

 
        


def export_to_csv(filename):
    global Expenses

    File = pd.DataFrame(list((Expenses.items())), columns=["Descripition", "Amount"])

    File.to_csv(filename, index=False, mode='w')



while True:

    Exported = False
    try:
        User_choice = int(input("Enter choice: "))

        if User_choice == 1:
            Description = input("Description: ").capitalize()
            Amount = float(input("Amount: "))
            
            add_expenses(Description, f"£{Amount:.2f}")
            print(Expenses)
            print("Added!")
            


        elif User_choice == 2:
            print("Expenses: ")
            
            list_expenses()
            


        elif User_choice == 3:
            total_expenses()
            


        elif User_choice == 4:
            export_to_csv("Expense.csv")
            print("Exported to expenses.csv")
            Exported = True
            

        elif User_choice == 5:
            if Exported:
                print("Goodbye!")
                break
            else:
                print("Make sure that you have save your expense")
        else:
            print("Invalid input. It has to be a number from 1-5")

    except Exception as e:
        print(e)
