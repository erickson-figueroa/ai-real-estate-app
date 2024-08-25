import sys
import os
import psycopg2
from flask import Flask, jsonify, request
from flask_cors import CORS
from openai import OpenAI
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# Add the server directory to the Python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from models import get_price_clusters  # Import the K-Means clustering function
from scraper import get_average_price  # Import the scraper

app = Flask(__name__)
CORS(app)

def get_listings_from_db():
    try:
        connection = psycopg2.connect(
            dbname=os.getenv("DB_NAME"),
            user=os.getenv("DB_USER"),
            password=os.getenv("DB_PASSWORD"),
            host=os.getenv("DB_HOST"),
            port=os.getenv("DB_PORT")
        )
        cursor = connection.cursor()
        cursor.execute("""
            SELECT id, address, neighborhood, price, bedrooms, bathrooms, square_footage, type, realtor, latitude, longitude
            FROM homelistings
        """)
        listings = cursor.fetchall()
        return [{
            "id": row[0],
            "address": row[1],
            "neighborhood": row[2],
            "price": row[3],
            "bedrooms": row[4],
            "bathrooms": row[5],
            "square_footage": row[6],
            "type": row[7],
            "realtor": row[8],
            "latitude": row[9],
            "longitude": row[10],
            "image": "https://via.placeholder.com/150"  # Placeholder image URL, replace with the real image from the database
        } for row in listings]
    except Exception as e:
        print(f"Database error: {e}")
        return []
    finally:
        if connection:
            cursor.close()
            connection.close()

def filter_listings_by_query(listings, user_query):
    filtered_listings = []
    for listing in listings:
        # Simple keyword-based filtering
        if (
            str(listing['bedrooms']) in user_query or
            str(listing['bathrooms']) in user_query or
            listing['neighborhood'].lower() in user_query.lower() or
            listing['type'].lower() in user_query.lower() or
            str(listing['price']) in user_query or
            str(listing['square_footage']) in user_query or
            listing['realtor'].lower() in user_query.lower() or
            listing['address'].lower() in user_query.lower()
        ):
            filtered_listings.append(listing)
        if len(filtered_listings) >= 10:  # Limit to 10 listings max
            break
    return filtered_listings

@app.route('/api/query', methods=['POST'])
def process_query():
    data = request.json
    user_query = data.get('query')

    # Fetch real listings from the database
    listings = get_listings_from_db()

    # Filter listings based on user query
    filtered_listings = filter_listings_by_query(listings, user_query)

    # Get average price
    average_price = get_average_price()
    if average_price is None:
        return jsonify({"error": "Failed to retrieve average price"}), 500

    # Extract prices and square footage
    prices = [listing['price'] for listing in listings]
    square_footages = [listing['square_footage'] for listing in listings]    

    # Calculate price category using K-Means with square footage
    price_clusters = get_price_clusters(prices, square_footages, average_price)

     # Map the cluster labels to 'Low', 'Medium', 'High'
    cluster_mapping = {0: 'Low', 1: 'Medium', 2: 'High'}
    for listing, cluster in zip(listings, price_clusters):
        listing['price_category'] = cluster_mapping[cluster]

    # Construct the prompt for the OpenAI API with filtered listings
    listings_text = "\n".join(
        [f"Listing {i+1}: {listing['address']} in {listing['neighborhood']}, {listing['bedrooms']} bedrooms, {listing['bathrooms']} bathrooms, priced at {listing['price']}"
         for i, listing in enumerate(filtered_listings)]
    )

    prompt = f"""
    User query: {user_query}
    Listings data:
    {listings_text}
    Please respond in a friendly and conversational tone with the top 3 listings that match the user's query. Use friendly and engaging language. Here is an example of how you might respond: 
    "Great! Based on what you've requested, I recommend the following listings:
    Listing 1: This cozy home in Wolseley has 3 bedrooms, 2 bathrooms, and is priced at $501,000. It's perfect for a family!
    Listing 2: A beautiful condominium in Fort Garry with 2 bedrooms and 2.5 bathrooms. It's close to public transport and priced at $500,000.
    Listing 3: This spacious 4-bedroom house in St. James is a great choice. It has 3 bathrooms and is priced at $350,000. The neighborhood is fantastic!
    Each listing has a detailed description to help you decide.
    Additionally, for each listing, provide a detailed description that includes not only the address, price, bedrooms, and bathrooms but also highlights 
    any unique features, neighborhood advantages, nearby amenities, and why it might be a great fit for the user.
    "
    """

    try:
        response = client.chat.completions.create(
        model="ft:gpt-3.5-turbo-0125:personal:ai-real-estate-model:9zrWhxL9",
        messages=[{"role": "user", "content": prompt}],
        temperature=1,
        max_tokens=800,
        top_p=1,
        frequency_penalty=0,
        presence_penalty=0,
        response_format={
        "type": "text"
            }
        )
        ai_response = response.choices[0].message.content.strip()
    except Exception as e:
        print(f"OpenAI API error: {e}")
        ai_response = "Sorry, there was an error processing your query."

    # Extract responses for the top 3 listings
    response_lines = ai_response.split("\n")
    final_responses = []
    for i in range(3):
        if i < len(filtered_listings):
            response_text = next((line for line in response_lines if f"Listing {i+1}:" in line), "No response available")
            final_responses.append({
                "listing": filtered_listings[i],
                "response": response_text
            })

    return jsonify(final_responses)

if __name__ == '__main__':
    app.run(debug=True)
