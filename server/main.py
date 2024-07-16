import sys
import os
from flask import Flask, jsonify, request
from flask_cors import CORS
from openai import OpenAI

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# Add the server directory to the Python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from models import get_price_clusters

app = Flask(__name__)
CORS(app)

@app.route('/api/query', methods=['POST'])
def process_query():
    data = request.json
    user_query = data.get('query')

    # Mock response for testing
    mock_listings = [
        {
            "id": 1,
            "address": "123 Main St, Winnipeg",
            "neighborhood": "Wolseley",
            "price": "400,000",
            "rooms": 3,
            "bathrooms": 2,
            "type": "Residential, Single Family Detached",
            "realtor": "Interlake Real Estate",
            "image": "https://via.placeholder.com/150",
            "latitude": 49.8951,
            "longitude": -97.1384
        },
        {
            "id": 2,
            "address": "555 River Avenue, Winnipeg",
            "neighborhood": "Fort Garry",
            "price": "500,000",
            "rooms": 2,
            "bathrooms": 2.5,
            "type": "Residential, Condominium",
            "realtor": "Fort Garry Real Estate",
            "image": "https://via.placeholder.com/150",
            "latitude": 49.8951,
            "longitude": -97.1384
        },
        {
            "id": 3,
            "address": "789 Elm Street, Winnipeg",
            "neighborhood": "St. James",
            "price": "350,000",
            "rooms": 4,
            "bathrooms": 3,
            "type": "Residential, Single Family Detached",
            "realtor": "St. James Real Estate",
            "image": "https://via.placeholder.com/150",
            "latitude": 49.8951,
            "longitude": -97.1384
        },
    ]

    # Construct the prompt for the OpenAI API
    listings_text = "\n".join(
        [f"Listing {i+1}:\nAddress: {listing['address']}\nNeighborhood: {listing['neighborhood']}\nPrice: {listing['price']}\nRooms: {listing['rooms']}\nBathrooms: {listing['bathrooms']}\nType: {listing['type']}\nRealtor: {listing['realtor']}\nImage: {listing['image']}\nLatitude: {listing['latitude']}\nLongitude: {listing['longitude']}\n"
         for i, listing in enumerate(mock_listings)]
    )

    # Constructing a friendly prompt
    prompt = f"""
    User query: {user_query}
    Listings data:
    {listings_text}
    Please respond in a friendly and conversational tone with the top 3 listings that match the user's query. Use friendly and engaging language. Here is an example of how you might respond: 
    "Great! Based on what you've requested, I recommend the following listings:
    1. Listing 1: This cozy home in Wolseley has 3 bedrooms, 2 bathrooms, and is priced at $400,000. It's perfect for a family!
    2. Listing 2: A beautiful condominium in Fort Garry with 2 bedrooms and 2.5 bathrooms. It's close to public transport and priced at $500,000.
    3. Listing 3: This spacious 4-bedroom house in St. James is a great choice. It has 3 bathrooms and is priced at $350,000. The neighborhood is fantastic!
    Each listing has a detailed description to help you decide."
    """

    try:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": prompt}],
            max_tokens=150
        )
        ai_response = response.choices[0].message.content.strip()
    except Exception as e:
        print(f"OpenAI API error: {e}")
        ai_response = "Sorry, there was an error processing your query."

    return jsonify({'listings': mock_listings, 'responses': [ai_response]})

if __name__ == '__main__':
    app.run(debug=True)
