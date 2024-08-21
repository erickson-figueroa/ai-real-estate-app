import os
import pandas as pd
import requests
from dotenv import load_dotenv

# Load environment variables from the .env file
load_dotenv()

# Get the API key from environment variables
api_key = os.getenv('MAPQUEST')

# Ensure the key is loaded
if not api_key:
    raise ValueError("API key not found. Make sure the MAPQUEST key is set in the .env file.")

# Define the MapQuest API endpoint
endpoint = "http://www.mapquestapi.com/geocoding/v1/address"

# Load the CSV file
file_path = '../server/data/homelisting.csv'
df = pd.read_csv(file_path, encoding='ISO-8859-1')

# Function to get latitude and longitude from an address
def get_lat_long(address):
    params = {
        'key': api_key,
        'location': address
    }
    response = requests.get(endpoint, params=params)
    if response.status_code == 200:
        data = response.json()
        if data['info']['statuscode'] == 0:
            location = data['results'][0]['locations'][0]['latLng']
            return location['lat'], location['lng']
    return None, None

# Add latitude and longitude to the dataframe
df['latitude'], df['longitude'] = zip(*df['address'].apply(get_lat_long))

# Save the updated dataframe to a new CSV file
updated_file_path = '../server/data/homelisting_with_lat_long.csv'
df.to_csv(updated_file_path, index=False)

print(f"Updated file saved to {updated_file_path}")
