import datetime
import json
import os 



print(str("===== Task Manager ====\n").center(30))

print("""1.) Add Task
2.) List Tasks
3.) Mark as Complete
4.) Delete Task
5.) Quit\n""")

print("==========================")

Time_que = ["Enter due year: ", "\nEnter due month: ", "\nEnter due day: "]


Time = []

def validate(year, mon, dat):
    
    valid = datetime.datetime(year, mon, dat)
    if valid:
        print(valid)
        return valid.strftime("%D")
    else:
        False

 


def add_task(title, time, prior):
    """ This function takes 3 parameter title, time, prior. """

    if os.path.exists("Tasks.json"):

        Task = {"Title": title,
                "DUE": time,
                "Proirity": prior,
                "Completion": False}
    
        

        with open("Tasks.json", 'a') as file:
            Save = json.dump(Task, file, indent=4)
    else:
        with open("Tasks.json", 'w') as file:
            Save = json.dump([])       
    




def List_task():
    pass

def Comp_task():
    pass
def del_task():
    pass

while True:

    User = int(input("\nEnter choices: "))
    try:

        # Add choice
        if User == 1:
            Title = input("\nTitle of the task: ")

            while len(Title) == 0:
                print("Title can't be empty")
                Title = input("\nTitle of the task: ")


            Priority = input("\nTask status(Low, Mid, High): ")
            
            print("________Due date in YYYY-MM-DD__________")
            for item in Time_que:
                Date = int(input(f"{item}"))

                Time.append(Date)

            valid = validate(Time[0], Time[1], Time[2]) # validate(f"{x,} for x in Time")

            add_task(Title, valid, Priority)
        
        elif User == 2:
            List_task()

        elif User == 3:
            Comp_task()

        elif User == 4:
            del_task()

        elif User == 5:

            print("Goodbye.")
            break

        else:
            print("Choice has to be between 1-5")

    except Exception as e:
        print(e)