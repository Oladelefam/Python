import pandas as pd

messy_file = 'messy_database.csv'

Data = pd.read_csv(messy_file)
data = pd.DataFrame({"Yes": [10, 30, "pushup", "N/A"], "No" : [20, 76, "N/a", "Situp"]}, index=['ProductA', 'Productb', 'ProductC', 'ProductD'])

pd.set_option('display.max_rows', 100)

pd.Series([1, 2, 3], index=("2025 car sale", "2024 car sales", "2023 car sales"), name="Product")

#Two ways to select columun in pandas Data.salary or Data['salary'], (can add [0] for a specific data point)
print(Data)