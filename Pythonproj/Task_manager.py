from datetime import datetime
from rich.console import Console
from rich.table import Table
import json
import os 



print(str("===== Task Manager ====\n").center(30))

print("""1.) Add Task
2.) List Tasks
3.) Mark as Complete
4.) Delete Task
5.) Quit\n""")

print("==========================")
def Table_write():

    console = Console()
    table = Table(title="Tasks")

    table.add_column("No.", style="cyan", no_wrap=True)
    table.add_column("Task", style="magenta")
    table.add_column("Priority", style="yellow")
    table.add_column("Completion", style="bright_white")
    table.add_column("Due_date", justify="right", style="green")

    file_read = read_file("Task.json")
    for i, item in enumerate(file_read):
        completion = "✅" if item.get("Completion") else "❌"
        table.add_row(str(i + 1), str(item.get("Title", "")), str(item.get("Priority", "")), completion, str(item.get("Due_date", "")))

    console.print(table)

def file_exist():
    console = Console()

    if not os.path.exists("Task.json"):
        console.print("[bold yellow]No tasks found.[/]")
        return

    try:
        with open("Task.json", "r") as file:
            file_read = json.load(file)
            if file_read is None:
                with open("Task.json", 'w') as File:
                    json.dump([])


    except (json.JSONDecodeError, ValueError):
        console.print("[bold yellow]No tasks to display (corrupt or empty file).[/]")

        with open("Task.json", 'w') as File:
            json.dump([])

def validate(Due_date):

    date_format = "%d-%m-%Y"
    valid = True

    try:
        Date = bool(datetime.strptime(Due_date, date_format))

    except ValueError as e:

        print("Incorrect date format, D-MM-YYYY")
        valid = False
    
    return valid


def write_file(filename, writing):
    with open(filename, "w") as file:
        json.dump(writing, file, indent=4)


def read_file(filename):
    with open(filename, "r") as file:
        return list(json.load(file))





def add_task(title, Prior, due_date):


    Task = {"Title": title,
            "Priority": Prior,
            "Due_date": due_date,
            "Completion": False}
     
    if os.path.exists("Task.json"):

        try:
            file_read = list(read_file("Task.json"))

        except json.JSONDecodeError:
            write_file("Task.json", [])
 
    
    file_read.append(Task) 
    write_file("Task.json", file_read) 
 
    print("Task added!!")






def complete_task():

    file_exist()

    Table_write()
    try:
        selection = int(input("Enter the number of the task you have completed: ").strip())
    except ValueError:
        print("Please enter a valid number.")
        return

    file_read = read_file("Task.json")
    idx = selection - 1
    if idx < 0 or idx >= len(file_read):
        print("Invalid task number.")
        return

    file_read[idx]["Completion"] = True
    write_file("Task.json", file_read)
    print("Congratulations! You've completed a task.")



def Del_task():
    table = Table(title="Tasks")
    console = Console()

    file_exist()

    Table_write()
    input_user = input("Would you rather delete all the task - type yes - or delete a specific task (type no): ").strip().lower()

    file_read = read_file("Task.json")

    if input_user == 'yes':
        file_read.clear()
        write_file("Task.json", file_read)
        print("All tasks deleted.")
    elif input_user == 'no':
        Del_input = input("What task do you want delete (enter number or exact title): ").strip()

        # try treating input as a number first
        try:
            num = int(Del_input)
            idx = num - 1
            if 0 <= idx < len(file_read):
                removed = file_read.pop(idx)
                write_file("Task.json", file_read)
                print(f"You've removed a task: {removed.get('Title')}")
            else:
                print("Invalid task number.")
        except ValueError:
            # treat input as title
            for item in list(file_read):
                if item.get('Title') == Del_input:
                    file_read.remove(item)
                    write_file("Task.json", file_read)
                    print("You've removed a task.")
                    break
            else:
                print("Task not found.")
    else:
        print("No changes made.")


while True:

    
        User_input = input("\nEnter the number of the choice or type quit to exit: ")

        if int(User_input) == 1:
            try:
                Title = input("\nEnter task title: ").capitalize()

                while len(Title) == 0:
                    Title = input("\nEnter task title: ").capitalize()

                priority = input("\nEnter priority level for task - Low, Mid, High: ").strip().capitalize()
                
                while priority not in ("High", "Mid", "Low"):
                    print("Make sure it's either High, Mid, or Low")
                    priority = input("\nEnter priority level for task - Low, Mid, High: ").strip().capitalize()
        
                due = True
                Due_date = input("\nEnter the due date- D-M-YYYY: ")

                while due:
                    Time = validate(Due_date)

                    if Time == True:
                        due = False
                    else:
                        Due_date = input("\nEnter the due date: ")

                add_task(Title, priority, Due_date)
            except Exception as Exe:
                print(f"The python code just discovered a {Exe}")

        elif int(User_input) == 2:
            Table_write()
        elif int(User_input) == 3:

            complete_task()
        elif int(User_input) == 4:
            Del_task()
        elif User_input == 'quit':
            exit("Bye")
        else:
            print("Invalid input")
            
    





