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


def validate(Due_date):

    date_format = "%d-%m-%Y"
    valid = True

    try:
        Date = bool(datetime.strptime(Due_date, date_format))

    except ValueError as e:

        print("Incorrect date format")
        valid = False
    
    return valid


def write_file(filename, writing):
    with open("Task.json", "w") as file:
        json.dump(writing, file, indent=4)


def read_file(filename):
    with open("Task.json", "r") as file:
        json.load(file)





def add_task(title, Prior, due_date):

    Task = {"Title": title,
            "Priority": Prior,
            "Due_date": due_date,
            "Completion": False}
     
    if os.path.exists("Task.json"):

        try:
            read_file("Task.json")

        except json.JSONDecodeError:
            write_file("Task.json", [])
    else:
        write_file("Task.json", [])
    
    with open("Task.json", "r") as file:
        file_read = list(json.load(file))                                    
 
    file_read.append(Task) 
    write_file("Task.json", file_read) 
 

    file_read.clear()
    print("Task added!!")



def List_task():
    global completion
    console = Console()
    table = Table(title="Tasks")

    if not os.path.exists("Task.json"):
        console.print("[bold yellow]No tasks found.[/]")
        return

    try:
        with open("Task.json", "r") as file:
            file_read = json.load(file)
            if file_read is None:
                file_read = []
    except (json.JSONDecodeError, ValueError):
        console.print("[bold yellow]No tasks to display (corrupt or empty file).[/]")
        return

    table.add_column("No.", style="cyan", no_wrap=True)
    table.add_column("Task", style="magenta")
    table.add_column("Priority", style="yellow")
    table.add_column("Completion", style="bright_white")
    table.add_column("Due_date", justify="right", style="green")

    for i, item in enumerate(file_read):
        completion = "✅" if item.get("Completion") else "❌"
        table.add_row(str(i + 1), str(item.get("Title", "")), str(item.get("Priority", "")), completion, str(item.get("Due_date", "")))

    console.print(table)



def complete_task():
    global completion

    print(completion)

while True:

    try:
        User_input = int(input("\nEnter choices: "))

        if User_input == 1:

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

        elif User_input == 2:
            List_task()
        elif User_input == 3:
             
            complete_task()
            
    

    except Exception as e:
        print(f"{e}")




