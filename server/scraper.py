import os
import requests
from bs4 import BeautifulSoup
import psycopg2
from psycopg2.extras import execute_values
from dotenv import load_dotenv
import re

# Load environment variables from .env file
load_dotenv()

# Retrieve database credentials from environment variables
db_params = {
    'dbname': os.getenv("DB_NAME"),
    'user': os.getenv("DB_USER"),
    'password': os.getenv("DB_PASSWORD"),
    'host': os.getenv("DB_HOST"),
    'port': os.getenv("DB_PORT")
}

# Function to scrape listings from Winnipeg Real Estate News
def scrape_listings():
    api_urls = [
"https://www.winnipegregionalrealestatenews.com/api/listings-results?nums=202420032,202420051,202417856,202420057,202419676,202420012,202419618,202419986,202419977,202419573,202419775,202420053",
"https://www.winnipegregionalrealestatenews.com/api/listings-results?nums=202419964,202420038,202419991,202419756,202419021,202419517,202420016,202419890,202419894,202419912,202419993,202418405",
"https://www.winnipegregionalrealestatenews.com/api/listings-results?nums=202420036,202420045,202419903,202420042,202420030,202419439,202419640,202419431,202419714,202419994,202420002,202419479",
"https://www.winnipegregionalrealestatenews.com/api/listings-results?nums=202420033,202419755,202419791,202419822,202420008,202420027,202420026,202419381,202420023,202419996,202419972,202419873",
"https://www.winnipegregionalrealestatenews.com/api/listings-results?nums=202419968,202419304,202419306,202419983,202419872,202419837,202419827,202419832,202420019,202420009,202419686,202418612",
"https://www.winnipegregionalrealestatenews.com/api/listings-results?nums=202419745,202420004,202419901,202419962,202419747,202419953,202419967,202419999,202419959,202419973,202419990,202416944",
"https://www.winnipegregionalrealestatenews.com/api/listings-results?nums=202419799,202419251,202419952,202419947,202419981,202416085,202419909,202419621,202419660,202419849,202419931,202419788",
"https://www.winnipegregionalrealestatenews.com/api/listings-results?nums=202419740,202419965,202419958,202419957,202419610,202419928,202419924,202419955,202416094,202419929,202419774,202419938",
"https://www.winnipegregionalrealestatenews.com/api/listings-results?nums=202419942,202419940,202419935,202419813,202419932,202419741,202400015,202419926,202419925,202419634,202419917,202419922",
"https://www.winnipegregionalrealestatenews.com/api/listings-results?nums=202419921,202419809,202419920,202419749,202419919,202419916,202419906,202419910,202419712,202419831,202419898,202419782",
"https://www.winnipegregionalrealestatenews.com/api/listings-results?nums=202419807,202419905,202418750,202419904,202419870,202419859,202418306,202419810,202419847,202419523,202419830,202419893",
"https://www.winnipegregionalrealestatenews.com/api/listings-results?nums=202419567,202419874,202419887,202419885,202419879,202419853,202419798,202419875,202419779,202419855,202419834,202419878",
"https://www.winnipegregionalrealestatenews.com/api/listings-results?nums=202419844,202419838,202419703,202419858,202419877,202419867,202419876,202419783,202419828,202409896,202419868,202419604",
"https://www.winnipegregionalrealestatenews.com/api/listings-results?nums=202419869,202419596,202419018,202419688,202419591,202418968,202419359,202419363,202419548,202419823,202419811,202419757",
"https://www.winnipegregionalrealestatenews.com/api/listings-results?nums=202419522,202419586,202419852,202419845,202419646,202419744,202419785,202418893,202419375,202419848,202419843,202419754",
"https://www.winnipegregionalrealestatenews.com/api/listings-results?nums=202417587,202415171,202419526,202419842,202419836,202418480,202419673,202419469,202419630,202419829,202419821,202419808",
"https://www.winnipegregionalrealestatenews.com/api/listings-results?nums=202419710,202419050,202419369,202419477,202419812,202419105,202419800,202419761,202419780,202419766,202419806,202419802",
"https://www.winnipegregionalrealestatenews.com/api/listings-results?nums=202419777,202416794,202419795,202419617,202419641,202419760,202419768,202419726,202419674,202419682,202419762,202419776",
"https://www.winnipegregionalrealestatenews.com/api/listings-results?nums=202419746,202418753,202419764,202419702,202419681,202419653,202419767,202418368,202419219,202419732,202419753,202419132",
"https://www.winnipegregionalrealestatenews.com/api/listings-results?nums=202419736,202417853,202419750,202419408,202418658,202419708,202419599,202419742,202419709,202411340,202419677,202419704",
"https://www.winnipegregionalrealestatenews.com/api/listings-results?nums=202419738,202419737,202419724,202419719,202419733,202419642,202418781,202419699,202419734,202419722,202419727,202419427",
"https://www.winnipegregionalrealestatenews.com/api/listings-results?nums=202418045,202419713,202419731,202419649,202418969,202419315,202419250,202419721,202419499,202419584,202419718,202419625",
"https://www.winnipegregionalrealestatenews.com/api/listings-results?nums=202419705,202419482,202419701,202419570,202419692,202419695,202419698,202419694,202419350,202419691,202419690,202419598",
"https://www.winnipegregionalrealestatenews.com/api/listings-results?nums=202417133,202419585,202417834,202419455,202419292,202419679,202419568,202419341,202419613,202419583,202413447,202419669",
"https://www.winnipegregionalrealestatenews.com/api/listings-results?nums=202419652,202419451,202419608,202419612,202419671,202419643,202419574,202419655,202419152,202419638,202419149,202419636",
"https://www.winnipegregionalrealestatenews.com/api/listings-results?nums=202419668,202419051,202412568,202419550,202419529,202419530,202419663,202419637,202419136,202419041,202419657,202419571",
"https://www.winnipegregionalrealestatenews.com/api/listings-results?nums=202419559,202419654,202418991,202419639,202419619,202419645,202419361,202419491,202419631,202419600,202419544,202419503",
"https://www.winnipegregionalrealestatenews.com/api/listings-results?nums=202419629,202419572,202419513,202419628,202419579,202419476,202414105,202419587,202419564,202419603,202419312,202419620",
"https://www.winnipegregionalrealestatenews.com/api/listings-results?nums=202419510,202419589,202419525,202419485,202419358,202419447,202419605,202419595,202419282,202419602,202419230,202419493",
"https://www.winnipegregionalrealestatenews.com/api/listings-results?nums=202419555,202419461,202419494,202419270,202419524,202419501,202415579,202419233,202418747,202419557,202419590,202419588",
"https://www.winnipegregionalrealestatenews.com/api/listings-results?nums=202419528,202419231,202418636,202419576,202419336,202419284,202419370,202419392,202419569,202419558,202419438,202419144",
"https://www.winnipegregionalrealestatenews.com/api/listings-results?nums=202419487,202418239,202412086,202418911,202419321,202419452,202419542,202419489,202419434,202419437,202419554,202419552",
"https://www.winnipegregionalrealestatenews.com/api/listings-results?nums=202419192,202418779,202419177,202419541,202419413,202419537,202419185,202419472,202419380,202419478,202419355,202419516",
"https://www.winnipegregionalrealestatenews.com/api/listings-results?nums=202419226,202419549,202419356,202419047,202418705,202419344,202419546,202419514,202419547,202419512,202419319,202419535",
"https://www.winnipegregionalrealestatenews.com/api/listings-results?nums=202419326,202419213,202418256,202419540,202419377,202419539,202419496,202419538,202417860,202418999,202419216,202418834",
"https://www.winnipegregionalrealestatenews.com/api/listings-results?nums=202418835,202419204,202419484,202419518,202419515,202419422,202419457,202419303,202418628,202419497,202419160,202419371",
"https://www.winnipegregionalrealestatenews.com/api/listings-results?nums=202419506,202406249,202419291,202419504,202419475,202419507,202418769,202419505,202419122,202419428,202419502,202419444",
"https://www.winnipegregionalrealestatenews.com/api/listings-results?nums=202418715,202419450,202419430,202419498,202419465,202419252,202419495,202419260,202419154,202418601,202419045,202419275",
"https://www.winnipegregionalrealestatenews.com/api/listings-results?nums=202418598,202419481,202419436,202419296,202419189,202419387,202419426,202419070,202419301,202419464,202419178,202418956",
"https://www.winnipegregionalrealestatenews.com/api/listings-results?nums=202419462,202419429,202419314,202419433,202419459,202418938,202417426,202415167,202418932,202419415,202419241,202419245",
"https://www.winnipegregionalrealestatenews.com/api/listings-results?nums=202419254,202419440,202419454,202419453,202419446,202419181,202419448,202418406,202419402,202419445,202419262,202419435",
"https://www.winnipegregionalrealestatenews.com/api/listings-results?nums=202419443,202419217,202419419,202419425,202417909,202418962,202419163,202419277,202419279,202419281,202419182,202419424",
"https://www.winnipegregionalrealestatenews.com/api/listings-results?nums=202419376,202419357,202419395,202419388,202418948,202419362,202418237,202419420,202419416,202419397,202419325,202419294",
"https://www.winnipegregionalrealestatenews.com/api/listings-results?nums=202419316,202419417,202419411,202419042,202419410,202419208,202419409,202418818,202419115,202417572,202419332,202419263",
"https://www.winnipegregionalrealestatenews.com/api/listings-results?nums=202419368,202419405,202419353,202419386,202417912,202419400,202419399,202419398,202418993,202419396,202419391,202419389",
"https://www.winnipegregionalrealestatenews.com/api/listings-results?nums=202401550,202419349,202419327,202419374,202419338,202419372,202419329,202419286,202413482,202419297,202419360,202419365",
"https://www.winnipegregionalrealestatenews.com/api/listings-results?nums=202419351,202419036,202419354,202419347,202418622,202419348,202419323,202418166,202418562,202418534,202419343,202419307",
"https://www.winnipegregionalrealestatenews.com/api/listings-results?nums=202419342,202419324,202419176,202419333,202419339,202419337,202419054,202419318,202419193,202419320,202419215,202419317",
"https://www.winnipegregionalrealestatenews.com/api/listings-results?nums=202419309,202418240,202419300,202419310,202419075,202419202,202419083,202418913,202419305,202419165,202413148,202418772",
"https://www.winnipegregionalrealestatenews.com/api/listings-results?nums=202419285,202419030,202419080,202410619,202419197,202418837,202400005,202419290,202419171,202419040,202419210,202419278",
    ]
    
    listing_base_url = "https://www.winnipegregionalrealestatenews.com/properties/listings/"
    listings = []
    
    for api_url in api_urls:
        response = requests.get(api_url)
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # Find all listings on the page
        for article in soup.find_all('article', class_='property'):
            try:
                # Extracting listing details with checks
                mls_num = article.get('data-mlsnum')
                address_tag = article.find('h2', class_='property-title')
                neighborhood_tag = article.find('dd', class_='detail-neighborhood')
                price_tag = article.find('dd', class_='detail-price')
                bedrooms_tag = article.find('dd', class_='detail-bed')
                bathrooms_tag = article.find('dd', class_='detail-bath')
                type_tag = article.find('dd', class_='detail-type')
                realtor_tag =  article.find('div', class_='agent')
               
                # Check for missing elements
                if not all([mls_num, address_tag, neighborhood_tag, price_tag, bedrooms_tag, bathrooms_tag, type_tag, realtor_tag]):
                    print(f"Skipping a listing due to missing data: MLS# {mls_num}")
                    continue

                print(mls_num)

                # Extract the actual text values
                id = mls_num.strip()
                address = address_tag.text.strip().replace('&nbsp;', ' ')
                neighborhood = neighborhood_tag.text.strip()
                price = int(price_tag.text.strip().replace('$', '').replace(',', ''))
                bedrooms = int(bedrooms_tag.text.strip())
                bathrooms = float(bathrooms_tag.text.strip().replace('-', '0'))
                type_ = type_tag.text.strip()
                realtor = realtor_tag.find('ul').find('li').text.strip()
               
                # Extract floor space (square_footage in my table) from the detailed listing page
                details_response = requests.get(f"{listing_base_url}{id}")
                details_soup = BeautifulSoup(details_response.text, 'html.parser')
               
                # Find the floor space value from the <b> after the <span> tag with text "Floor Space"
                floor_space_tag = details_soup.find('span', text='Floor Space').find_next_sibling('b')
        
                if floor_space_tag:
                    # removing all characters from the string that are not digits or a decimal point, leaving just the numeric part.
                    square_footage = re.sub(r'[^\d\.]', '', floor_space_tag.text)
                else:
                    square_footage = None

                # Prepare data to be inserted into the database
                listings.append((id, address, neighborhood, price, bedrooms, bathrooms, square_footage, type_, realtor, None, None))
                
            except Exception as e:
                print(f"Error processing listing MLS# {mls_num}: {e}")

    # Insert the data into PostgreSQL
    try:
        with psycopg2.connect(**db_params) as conn:
            with conn.cursor() as cur:
                execute_values(
                    cur,
                    """
                    INSERT INTO homelistings (id, address, neighborhood, price, bedrooms, bathrooms, square_footage, type, realtor, latitude, longitude)
                    VALUES %s
                    """,
                    listings
                )
                conn.commit()
                print(f"Inserted {len(listings)} listings into the database.")
    except Exception as e:
        print(f"Error inserting data: {e}")

# get_average_price function
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
    scrape_listings()
    avg_price = get_average_price()
    if avg_price:
        print(f"Successfully retrieved average price: {avg_price}")
    else:
        print("Failed to retrieve average price.")

