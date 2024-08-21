import pandas as pd
from sqlalchemy import create_engine

# Replace with your database credentials
db_string = "postgresql://dbadmin:1234@localhost:5432/homelistings"

# Create an engine
engine = create_engine(db_string)

# Read the CSV file into a Pandas DataFrame
df = pd.read_csv('../server/data/homelistings.csv')

# Rename DataFrame columns to match the PostgreSQL table column names
df.columns = [
    'id', 'address', 'neighborhood', 'price',
    'bedrooms', 'bathrooms', 'square_footage', 'type', 'realtor','latitude','longitude'
]

# Insert the DataFrame into the PostgreSQL table
df.to_sql('homelistings', engine, if_exists='append', index=False)
