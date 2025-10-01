import requests

from bs4 import BeautifulSoup
import crontab

Link_input = input("Enter the Link: ")

Web_page = requests.get(Link_input)

Soup = BeautifulSoup(Web_page.text, 'html.parser')

# Corrected this line to use the Soup object
title = Soup.find_all('h2', class_='post_title')
Main_text = Soup.find_all('div', id='main')

text = Soup.get_text()


print(text.strip())
print(Main_text)

for i, Tile in enumerate(title, 1):
    print(f"{i}. {Tile.text.strip()}")

    print(text.strip())
    print(Main_text)