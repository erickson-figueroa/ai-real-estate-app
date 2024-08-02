import requests
from bs4 import BeautifulSoup

def get_average_price():
    url = "https://stats.crea.ca/board/mrea"
    response = requests.get(url)
    if response.status_code != 200:
        print(f"Failed to retrieve data: {response.status_code}")
        return None

    soup = BeautifulSoup(response.content, 'html.parser')
    text = soup.find(text=lambda t: "The average price of homes sold in" in t)

    if not text:
        print("Failed to find the average price text.")
        return None

    # Extract the price from the text
    price_str = text.split("The average price of homes sold in")[1].split("was $")[1].split(",")[0]
    full_price_str = text.split("The average price of homes sold in")[1].split("was $")[1].split(" ")[0].replace(",", "")
    
    try:
        average_price = int(full_price_str.replace(",", ""))
        return average_price
    except ValueError:
        print("Failed to convert the extracted price to an integer.")
        return None

if __name__ == "__main__":
    avg_price = get_average_price()
    if avg_price:
        print(f"Successfully retrieved average price: {avg_price}")
    else:
        print("Failed to retrieve average price.")
