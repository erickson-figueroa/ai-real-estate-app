# AI Real Estate Application (In process !)

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
    - GPT-3.5-turbo LLM model
    - Python
    - Flask-CORS
    - Poetry for dependency management

- Database
    - Local housing listing database using PostgreSQL

- Others:
    - Open Street Map with leafletjs javascript library to show the location of the properties

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

Create an .env file if it does not exist in the server directory with the following content:

    OPENAI_API_KEY=your_openai_api_key

If the .env already exists, just add your OPENAI_API_KEY to it.

### 4. Database Setup

1. Download and Install PostgreSQL: 

    - https://www.postgresql.org/download/linux/ubuntu/

2. Install a pgAdmin (optional):

    - https://www.pgadmin.org/download/pgadmin-4-apt/
 
 3. Connect to the server:
    -  psql -h localhost -d postgres 
 
 4. Create the User:
    - create user dbadmin with password '1234';
       
 5. Create the database:   
    - create database homelistings;
 
 6. All privilegies to a user on the database:
    - grant all on database homelistings to dbadmin;

 7. Connect to the instance using the user previously created:
    - psql -h localhost -d homelistings -U dbadmin;
 
 7. Create the listings table:
    - Navigate to the server folder: cd server, then run the <b>datasets_import.py</b>. e.g. python datasets_import.py, and it will create the table and insert the data.
    - If you receive any errors, you can create the table manually as follows:
      
            CREATE TABLE IF NOT EXISTS homelistings (
            id BIGINT PRIMARY KEY NOT NULL,
            address VARCHAR(255) NOT NULL,
            neighborhood VARCHAR(100),
            price INTEGER NOT NULL,
            bedrooms INTEGER,
            bathrooms NUMERIC(2, 1),
            square_footage INTEGER,
            type VARCHAR(100),
            realtor VARCHAR(100),
            latitude NUMERIC(9, 6),
            longitude NUMERIC(9, 6)
            );  

### 6.  Run the Flask Backend Server
Navigate to the server directory and start the Flask server.

    cd server
    poetry run flask run

### 7.  Start the React Frontend Application
Navigate to the src directory and start the React development server.

    cd ../src
    npm run dev

### 8. Interact with the Application

Open your browser and navigate to http://localhost:3000 to interact with the application.

## Access and Usage

Once the application is up and running, you can start using the AI Real Estate Application by entering natural language queries into the search bar. The application will process your queries and return the top property recommendations based on your criteria.

## Future Implementation

Currently, the project is in development and runs only locally. However, you can deploy it in the cloud by following the previous steps with some variations. Ensure you have enough knowledge to work with the cloud provider you choose. This will allow for better scalability and accessibility of the application.

## Contributing
 
 At the moment code contributions are not enabled.

## License

This project is licensed under the MIT License.

    Feel free to customize any sections further to better fit your specific project details and requirements.

## Conclusion

The AI Real Estate Application aims to revolutionize the way people search for homes by providing a smarter, faster, and more personalized experience. With the power of AI and natural language processing, users can effortlessly find the perfect home that meets all their needs.
