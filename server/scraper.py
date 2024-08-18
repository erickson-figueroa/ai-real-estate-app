import requests
from bs4 import BeautifulSoup

def get_average_price():
    url = "https://wowa.ca/winnipeg-housing-market"  # Updated URL
    response = requests.get(url)
    if response.status_code != 200:
        print(f"Failed to retrieve data: {response.status_code}")
        return None

    soup = BeautifulSoup(response.content, 'html.parser')
    # Updated logic to find the new sentence structure
    text = soup.find(text=lambda t: "The average sale price in Winnipeg for" in t)

    if not text:
        print("Failed to find the average price text.")
        return None

    # Extract the price from the text based on Winnipeg Housing Market 
    try:
        # Splitting and cleaning up to extract the price
        price_str = text.split("was $")[1].split(" ")[0].replace(",", "")
        average_price = int(price_str)
        return average_price
    except (IndexError, ValueError) as e:
        print(f"Failed to extract or convert the price: {e}")
        return None

if __name__ == "__main__":
    avg_price = get_average_price()
    if avg_price:
        print(f"Successfully retrieved average price: {avg_price}")
    else:
        print("Failed to retrieve average price.")
