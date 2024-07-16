# AI Real Estate Application

The AI Real Estate Application is designed to streamline the process of finding the perfect home by leveraging the power of artificial intelligence. By utilizing state-of-the-art AI models, the application aims to provide users with personalized and accurate recommendations based on their specific needs and preferences.

## Project Purpose

The AI Real Estate Application is designed to streamline the process of finding the perfect home by leveraging the power of artificial intelligence. By utilizing state-of-the-art AI models, the application aims to provide users with personalized and accurate recommendations based on their specific needs and preferences.

## Project Description

This project is an AI-powered real estate search assistant that helps users find apartments, houses, and condos for rent or sale in the US and Canada. The application allows users to input natural language queries about their housing requirements, such as desired location, price range, number of bedrooms and bathrooms, and specific amenities. The AI then processes these queries, matches them against a database of listings, and returns the top recommendations that best fit the user's criteria.

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

## Benefits

- **Personalized Recommendations:** Users receive tailored housing options based on their specific queries.
- **Ease of Use:** Natural language input allows users to describe their ideal home without needing to use traditional search filters.
- **Efficiency:** Quickly processes and returns the best matching properties, saving users time and effort in their home search.

## Principal Objective

The main objective of this project is to enhance the real estate search experience by utilizing AI to understand and process user queries in natural language. This allows users to receive more accurate and relevant property recommendations, ultimately helping them find their ideal home more efficiently.

## Features

- **Natural Language Processing:** Understands and processes user queries in everyday language.
- **AI-Powered Search:** Utilizes OpenAI's GPT-3.5-turbo model to provide personalized property recommendations. 
- **Detailed Listings:** Provides comprehensive information about each property, including price, location, number of rooms, type, and amenities.
- **Interactive Maps:** Displays property locations on an interactive map using the Google Maps API.
- **Cluster Algorithm:** Divides housing prices into three categories: low, medium, and high price.

## How It Works

1. **User Query:** The user inputs a natural language query describing their ideal home.
2. **AI Processing:** The query is sent to the backend, where the AI model processes it and matches it against a database of listings.
3. **Recommendation:** The top matching listings are returned to the user with detailed descriptions and locations displayed on a map.

## Getting Started
To get started with the project, follow these steps:

1. ###  Clone the Repository

    git clone https://github.com/yourusername/ai-real-estate-app.git
    cd ai-real-estate-app

2. ### Install Dependencies
Install the necessary dependencies for both the frontend and backend.

**Backend**

    cd server
    poetry install

**Frontend**

    cd ../src
    npm install

3. ### Set Up Environment Variables
Create a .env file in the server directory with the following content:

    OPENAI_API_KEY=your_openai_api_key

4. ### Run the Flask Backend Server

    cd server
    poetry run flask run

5. Start the React Frontend Application

    cd ../src
    npm run dev

6. Access the Application

Open your browser and navigate to http://localhost:3000 to access the application.

## Conclusion

The AI Real Estate Application aims to revolutionize the way people search for homes by providing a smarter, faster, and more personalized experience. With the power of AI and natural language processing, users can effortlessly find the perfect home that meets all their needs.