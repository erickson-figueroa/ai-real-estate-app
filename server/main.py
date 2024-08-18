import sys
import os
from flask import Flask, jsonify, request
from flask_cors import CORS
from openai import OpenAI

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# Add the server directory to the Python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from models import get_price_clusters  # Import the K-Means clustering function
from scraper import get_average_price  # Import the scraper

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
            "price": 400000,
            "square_footage": 1800,
            "rooms": 3,
            "bathrooms": 2,
            "type": "Residential, Single Family Detached",
            "realtor": "Interlake Real Estate",
            "image": "https://via.placeholder.com/150",
            "latitude": 49.88896,
            "longitude": -97.13425
        },
        {
            "id": 2,
            "address": "555 River Avenue, Winnipeg",
            "neighborhood": "Fort Garry",
            "price": 500000,
            "square_footage": 2000,
            "rooms": 2,
            "bathrooms": 2.5,
            "type": "Residential, Condominium",
            "realtor": "Fort Garry Real Estate",
            "image": "https://via.placeholder.com/150",
            "latitude": 49.87823,
            "longitude": -97.15018
        },
        {
            "id": 3,
            "address": "789 Elm Street, Winnipeg",
            "neighborhood": "St. James",
            "price": 280000,
            "square_footage": 1500,
            "rooms": 4,
            "bathrooms": 3,
            "type": "Residential, Single Family Detached",
            "realtor": "St. James Real Estate",
            "image": "https://via.placeholder.com/150",
            "latitude": 49.85435,
            "longitude": -97.18130
        },
    ]

    # Get average price
    average_price = get_average_price()
    if average_price is None:
        return jsonify({"error": "Failed to retrieve average price"}), 500

   # Extract prices and square footage
    prices = [listing['price'] for listing in mock_listings]
    square_footages = [listing['square_footage'] for listing in mock_listings]

    # Calculate price category using K-Means with square footage
    price_clusters = get_price_clusters(prices, square_footages, average_price)

    # Map the cluster labels to 'Low', 'Medium', 'High'
    cluster_mapping = {0: 'Low', 1: 'Medium', 2: 'High'}
    for listing, cluster in zip(mock_listings, price_clusters):
        listing['price_category'] = cluster_mapping[cluster]
        
  # Construct the prompt for the OpenAI API
    listings_text = "\n".join(
        [f"Listing {i+1}:\nAddress: {listing['address']}\nNeighborhood: {listing['neighborhood']}\nPrice: {listing['price']}\nRooms: {listing['rooms']}\nBathrooms: {listing['bathrooms']}\nType: {listing['type']}\nRealtor: {listing['realtor']}\nImage: {listing['image']}\nLatitude: {listing['latitude']}\nLongitude: {listing['longitude']}\nPrice Category: {listing['price_category']}\n"
         for i, listing in enumerate(mock_listings)]
    )

    # Constructing a friendly prompt
    prompt = f"""
    User query: {user_query}
    Listings data:
    {listings_text}
    Please respond in a friendly and conversational tone with the top 3 listings that match the user's query. Use friendly and engaging language. Here is an example of how you might respond: 
    "Great! Based on what you've requested, I recommend the following listings:
    Listing 1: This cozy home in Wolseley has 3 bedrooms, 2 bathrooms, and is priced at $501,000. It's perfect for a family!
    Listing 2: A beautiful condominium in Fort Garry with 2 bedrooms and 2.5 bathrooms. It's close to public transport and priced at $500,000.
    Listing 3: This spacious 4-bedroom house in St. James is a great choice. It has 3 bathrooms and is priced at $350,000. The neighborhood is fantastic!
    Each listing has a detailed description to help you decide."
    """

    try:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": prompt}],
            max_tokens=500,
            temperature=0.7
        )
        ai_response = response.choices[0].message.content.strip()
    except Exception as e:
        print(f"OpenAI API error: {e}")
        ai_response = "Sorry, there was an error processing your query."

    # Split the response by listing number
    responses = ai_response.split("Listing")[1:]
    response_dict = {}
    for resp in responses:
        number = resp.split(":")[0].strip()
        content = resp.split(":", 1)[1].strip()
        response_dict[number] = content

    final_responses = []
    for i, listing in enumerate(mock_listings):
        listing_number = str(i + 1)
        response_text = response_dict.get(listing_number, "No response available")
        final_responses.append({
            "listing": listing,
            "response": response_text
        })

    return jsonify(final_responses)

if __name__ == '__main__':
    app.run(debug=True)
