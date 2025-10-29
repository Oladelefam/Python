import datetime
import json

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
       return True
    else:
        False

 


def add_task(title, time, prior):


    Task= {"Title": title,
             "DUE": time,
             "Proirity": prior,
             "Completion": False}

def List_task():
    pass

def Comp_task():
    pass
def del_task():
    pass

while True:
    
    try:
        User = int(input("\nEnter choices: "))

        # Add choice
        if User == 1:
            Title = input("\nTitle of the task: ")
            
            if len(Title) == 0:
                print("Title can't be empty")
                Title = input("\nTitle of the task: ")


            Priority = input("\nTask status(Low, Mid, High): ")
            
            print("________Due date in YYYY-MM-DD__________")
            for item in Time_que:
                Date = int(input(f"{item}"))

                Time.append(Date)

            valid = validate(Time[0], Time[1], Time[2]) # validate(f"{x,} for x in Time")

            if valid == True:
                add_task(Title, valid, Priority)
            else:
                print("Make sure the date is in the correct format - YYYY-MM-DD")
                Time.clear()

                for item in Time_que:
                    Date = int(input(f"{item}"))

                    Time.append(Date)

            
                

            


    except Exception as e:
        print(e)