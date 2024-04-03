# This function is triggered on receiving an IGC file and parses the file to extract flight data.
# The flight statistics are calculated and stored in the MongoDB database, with the fixes stored in a separate timeseries collection.

import os
import json
# import base64
from pymongo import MongoClient
from dotenv import load_dotenv
import re
from datetime import datetime, timedelta



# def lambda_handler(event, context):
#     igc_content = base64.b64decode(event['content'])


def parse_latitude(lat, ns):
    """Parse the latitude from the IGC file and return as a float."""
    degrees = float(lat[:2])
    minutes = float(lat[2:7]) / 1000
    return degrees + minutes / 60 if ns == 'N' else -(degrees + minutes / 60)

def parse_longitude(lon, ew):
    """Parse the longitude from the IGC file and return as a float."""
    degrees = float(lon[:3])
    minutes = float(lon[3:8]) / 1000
    return degrees + minutes / 60 if ew == 'E' else -(degrees + minutes / 60)

def parse_igc_file(filename):
    """Parse the IGC file and extract fixes into a desired format."""
    fixes = []
    date = None
    flight = {
        'pilot': '',
        'glider_model': '',
        'site': '',
    }
    
    with open(filename, 'r') as file:
        for line in file:
            if line.startswith('HFDTE'):
                # Extract the date from the header
                date_match = re.match(r"HFDTE(\d{2})(\d{2})(\d{2})", line)
                if date_match:
                    day, month, year = date_match.groups()
                    date = datetime.strptime(f"20{year}-{month}-{day}", "%Y-%m-%d")
            elif line.startswith('H') and line[2:5] in ['PLT', 'GTY', 'SIT']:
                # Decode additional H records
                tlc = line[2:5]
                line_value = line[5:].strip()
                if tlc == 'PLT':
                    flight['pilot'] = line_value
                elif tlc == 'GTY':
                    flight['glider_model'] = line_value
                elif tlc == 'SIT':
                    flight['site'] = line_value
            elif line.startswith('B') and date:
                # Process each fix line
                time_str = line[1:7]
                time_delta = timedelta(hours=int(time_str[:2]), minutes=int(time_str[2:4]), seconds=int(time_str[4:6]))
                latitude = parse_latitude(line[7:14], line[14])
                longitude = parse_longitude(line[15:23], line[23])
                gps_alt = int(line[25:30])
                pressure_alt = int(line[30:35])
                
                fix = {
                    'timeField': (date + time_delta),
                    'latitude': latitude,
                    'longitude': longitude,
                    'gps_alt': gps_alt,
                    'pressure_alt': pressure_alt
                }
                fixes.append(fix)
    flight['fixes'] = fixes            
    return flight

# Example usage
filename = 'fixtures/2024-02-24-XFH-000-01.IGC'
flight = parse_igc_file(filename)


os.getenv('MONGODB_URI')
load_dotenv()
print(os.environ['MONGODB_URI'])
client = MongoClient(os.environ['MONGODB_URI'])


db = client['ascendable']
flights_col = db['flights']
flights_col.insert_one(flight)