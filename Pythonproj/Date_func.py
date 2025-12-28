from datetime import datetime


def validate(Due_date):

    date_format = "%D"
    valid = True

    try:
        Date = bool(datetime.strptime(Due_date, date_format))
        print(Date)
    except ValueError as e:
        print("Incorrect date format")