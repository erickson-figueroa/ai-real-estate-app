import pandas as pd
from sqlalchemy import create_engine, MetaData, Table, Column, Integer, String, Numeric

# Replace with your database credentials
db_string = "postgresql://dbadmin:1234@localhost:5432/homelistings"

# Create an engine
engine = create_engine(db_string)

# Create a metadata instance
metadata = MetaData()

# Define the table structure
homelistings_table = Table('homelistings', metadata,
    Column('id', Integer, primary_key=True, nullable=False),
    Column('address', String(255), nullable=False),
    Column('neighborhood', String(100)),
    Column('price', Integer, nullable=False),
    Column('bedrooms', Integer),
    Column('bathrooms', Numeric(2, 1)),
    Column('square_footage', Integer),
    Column('type', String(100)),
    Column('realtor', String(100)),
    Column('latitude', Numeric(9, 6)),
    Column('longitude', Numeric(9, 6))
)

# Create the table if it doesn't exist
metadata.create_all(engine)

# Read the CSV file into a Pandas DataFrame
df = pd.read_csv('../server/data/homelistings.csv')

# Rename DataFrame columns to match the PostgreSQL table column names
df.columns = [
    'id', 'address', 'neighborhood', 'price',
    'bedrooms', 'bathrooms', 'square_footage', 'type', 'realtor','latitude','longitude'
]

# Insert the DataFrame into the PostgreSQL table
df.to_sql('homelistings', engine, if_exists='append', index=False)
