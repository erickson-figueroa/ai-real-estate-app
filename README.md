# AI Real Estate Application

The AI Real Estate Application leverages state-of-the-art artificial intelligence to streamline the home-finding process. By providing personalized and accurate recommendations, the application helps users find their ideal home based on specific needs and preferences.

This project serves as an AI-powered real estate search assistant for Winnipeg, Canada. Users can input natural language queries detailing their housing requirements, such as location, price range, number of bedrooms and bathrooms, and specific amenities. The AI processes these queries, matches them against a database of listings, and returns the top recommendations that best fit the user's criteria.

## Project Purpose

The AI Real Estate Application aims to streamline the home-finding process using advanced artificial intelligence. It provides personalized and accurate recommendations based on users' specific needs and preferences.

## Principal Objective

The main objective of this project is to enhance the real estate search experience using AI to understand and process user queries in natural language. This enables users to receive more accurate and relevant property recommendations, helping them find their ideal home more efficiently.


## Benefits

- **Personalized Recommendations:** Users receive tailored housing options based on their specific queries.
- **Ease of Use:** Natural language input allows users to describe their ideal home without needing to use traditional search filters.
- **Efficiency:** Quickly processes and returns the best matching properties, saving users time and effort in their home search.

## How It Works

1. **User Query:** The user inputs a natural language query describing their ideal home.
2. **AI Processing:** The query is sent to the backend, where the AI model processes it and matches it against a database of listings.
3. **Recommendation:** The top matching listings are returned to the user with detailed descriptions and locations displayed on a map.

## Features

- **Natural Language Processing:** Understands and processes user queries in everyday language.
- **AI-Powered Search:** Utilizes OpenAI's GPT-3.5-turbo model to provide personalized property recommendations. 
- **Detailed Listings:** Provides comprehensive information about each property, including price, location, number of rooms, type, and amenities.
- **Interactive Maps:** Displays property locations on an interactive map using the Google Maps API.
- **Cluster Algorithm:** Divides housing prices into three categories: low, medium, and high price.
- **Model already fine-tuned:** Optimized for high accuracy and performance with custom training data (see example below). 
    
         {"messages": [{"role": "system", "content": "Instructions"}, {"role": "user", "content": "User query"}, {"role": "assistant", "content": "Ideal response"}]}


            [
        {
            "messages": [
            {"role": "system", "content": "You are a helpful real estate assistant."},
            {"role": "user", "content": "I'm looking for a 3-bedroom house in a quiet neighborhood with a big yard."},
            {"role": "assistant", "content": "Great choice! Here's a perfect match: A beautiful 3-bedroom house in Wolseley with a spacious yard, priced at $400,000. The neighborhood is quiet and family-friendly."}
            ]
        },
        {
            "messages": [
            {"role": "system", "content": "You are a helpful real estate assistant."},
            {"role": "user", "content": "Find me a 2-bedroom apartment close to public transport."},
            {"role": "assistant", "content": "Sure! I recommend this 2-bedroom apartment in Fort Garry, near public transport, priced at $500,000. It also features a gym and covered parking."}
            ]
           }
        ]

        User Query: "I'm looking for a 3-bedroom house in a quiet neighborhood with a big yard."
        Ideal Response: "Great choice! Here's a perfect match: A beautiful 3-bedroom house in Wolseley with a spacious yard, priced at $400,000. The neighborhood is quiet and family-friendly."

         User Query: "Find me a 2-bedroom apartment close to public transport."
        Ideal Response: "Sure! I recommend this 2-bedroom apartment in Fort Garry, near public transport, priced at $500,000. It also features a gym and covered parking."

### Collect example user queries and ideal responses:

    Query 1: "I need a condo with 1 bedroom, a swimming pool, and covered parking."
    Response: "This condo in St. James with 1 bedroom, a swimming pool, and covered parking is perfect for you. It's priced at $350,000."

    Query 2: "Show me houses with at least 4 bedrooms and 3 bathrooms in a good school district."
    Response: "This 4-bedroom, 3-bathroom house in River Heights, priced at $600,000, is located in an excellent school district."


## Technologies Used

- Frontend:
    - React
    - Axios
    - HTML5
    - CSS

- Backend:
    - Flask
    - OpenAI GPT-3.5-turbo LLM model
    - Python
    - Flask-CORS
    - Poetry for dependency management

- Database
    - Local housing listing database

- Others:
    - Google Maps API for displaying property locations


## Getting Started
To get started with the project, follow these steps:

### 1.   Clone the Repository

    git clone https://github.com/yourusername/ai-real-estate-app.git
    cd ai-real-estate-app

### 2.  Install Dependencies
Install the necessary dependencies for both the frontend and backend.

**Backend**

    cd server
    poetry install

**Frontend**

    cd ../src
    npm install

### 3.  Set Up Environment Variables
Create a .env file in the server directory with the following content:

    OPENAI_API_KEY=your_openai_api_key

### 4.  Run the Flask Backend Server

    cd server
    poetry run flask run

### 5.  Start the React Frontend Application

    cd ../src
    npm run dev

### 6. Access the Application

Open your browser and navigate to http://localhost:3000 to access the application.

## Conclusion

The AI Real Estate Application aims to revolutionize the way people search for homes by providing a smarter, faster, and more personalized experience. With the power of AI and natural language processing, users can effortlessly find the perfect home that meets all their needs.