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

Task = []
Time = []

def validate(dat, mon, year):
    
    valid = datetime.datetime(year, mon, dat)
    print(valid)
 


def add_task(title, time, stat, Comp):


    Task = {"Title": title,
             "DUE": time,
             "Status": stat,
             "Completion": Comp}

def List_task():
    pass

def Comp_task():
    pass
def del_task():
    pass

while True:
    
    try:
        User = int(input("\nEnter choices: "))
        if User == 1:
            Title = input("\nTitle of the task: ")
            Status = input("\nTask status(Low, Mid, High): ")
            Comp = input("\nCompletion status: ")# I might actually remove this since when a task is added the it not completed yet so it is always false so Comp is always

            print("________Due date in YYYY-MM-DD__________")
            for item in Time_que:
                Date = int(input(f"{item}"))

                Time.append(Date)



            
                

            


    except Exception as e:
        print(e)