User_input = (input("Enter scores separated by columun: "))
Start = True

while Start:
    # accept either "45, 56" or "45,56" (split on comma)
    if "," in User_input:
       # parse into integers
       Grades = [int(x.strip()) for x in User_input.split(",")]

       Start = False
    else:
       print("Make sure they are well seperated commas.")
       
       User_input = (input("Enter scores separated by columun: "))

# The function to calculate the average

def Calculate(User):
    # handle empty list and compute average correctly
    if not User:
        print("No grades to calculate.")
        return
    Avg_Grade = sum(User) / len(User)
    print(F"The average Grade is: {Avg_Grade}")

Calculate(Grades)

