# This function is triggered on receiving an IGC file and parses the file to extract flight data.
# The flight statistics are calculated and stored in the MongoDB database, with the fixes stored in a separate timeseries collection.

import json
import base64
import re
from datetime import datetime, timedelta

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

def lambda_handler(event, context):
    try:
        """Parse the IGC file and extract fixes into a desired format."""
        igc_text = event['body']

        fixes = []
        date = None
        flight = {
            'pilot': '',
            'glider_model': '',
            'site': '',
        }
        max_altitude = None
        takeoff_altitude = None
        airtime_minutes = None
        start_time = None
        end_time = None
        launch_site = None
        distance_km = None


        for line in igc_text.splitlines():
            # Extract the date from the header
            if line.startswith('HFDTE'):
                date_match = re.match(r"HFDTE(\d{2})(\d{2})(\d{2})", line)
                if date_match:
                    day, month, year = date_match.groups()
                    date = datetime.strptime(f"20{year}-{month}-{day}", "%Y-%m-%d")
            # Decode additional H records
            elif line.startswith('H') and line[2:5] in ['PLT', 'GTY', 'SIT']:
                tlc = line[2:5]
                colon = line.find(":", 5)
                if colon >= 0:
                    # This is the long format
                    long_name = line[5:colon].strip()
                    if long_name == "":
                        long_name = None
                    line_value = line[colon + 1:].strip()
                else:
                    long_name = None
                    line_value = line[5:].strip()
                # line_value = line[5:].strip()
                if tlc == 'PLT':
                    flight['pilot'] = line_value
                elif tlc == 'GTY':
                    flight['glider_model'] = line_value
                elif tlc == 'SIT':
                    flight['site'] = line_value
            # Process each fix line
            elif line.startswith('B') and date:
                time_str = line[1:7]
                time_delta = timedelta(hours=int(time_str[:2]), minutes=int(time_str[2:4]), seconds=int(time_str[4:6]))
                latitude = parse_latitude(line[7:14], line[14])
                longitude = parse_longitude(line[15:23], line[23])
                gps_alt = int(line[25:30])
                pressure_alt = int(line[30:35])
                fix = {
                    'timeField': int((date + time_delta).timestamp()),
                    'latitude': latitude,
                    'longitude': longitude,
                    'gps_alt': gps_alt,
                    'pressure_alt': pressure_alt
                }
                fixes.append(fix)

                # Check for max altitude
                if max_altitude is None or gps_alt > max_altitude:
                    max_altitude = gps_alt
        # Add the fixes and flight statistics to the response            
        flight['fixes'] = fixes
        flight['max_altitude'] = max_altitude
        flight['takeoff_altitude'] = fixes[0]['gps_alt']
        flight['start_time'] = fixes[0]['timeField']
        flight['end_time'] = fixes[-1]['timeField']
        flight['airtime_minutes'] = (fixes[-1]['timeField'] - fixes[0]['timeField']) / 60
        print(flight)
        return {
            "statusCode": 200,
            "headers": {
                "Content-Type": "application/json"
            },
            "body": json.dumps({
                "flight": flight,
            }, default=str),
        }
    
    except KeyError as e:
        # Return an error response if 'content' key is missing
        return {
            "statusCode": 400,
            "headers": {
                "Content-Type": "application/json"
            },
            "body": json.dumps({"error": f"Missing key: {str(e)}"}),
            "isBase64Encoded": False
        }
    except Exception as e:
        # Catch all other exceptions and return a generic error response
        print(e)
        return {
            "statusCode": 500,
            "headers": {
                "Content-Type": "application/json"
            },
            "body": json.dumps({"error": "An error occurred processing your request."}),
            "isBase64Encoded": False
        }
