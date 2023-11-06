import os
from datetime import datetime
from geopy.geocoders import Nominatim
import pandas as pd
import numpy as np
from dotenv import load_dotenv
from selenium import webdriver
from selenium.webdriver.common.by import By

# from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.options import Options


load_dotenv()
geolocator = Nominatim(user_agent="epra")
BASE_URL_RAW = os.environ.get("BASE_URL_RAW")


def clean_dates(date):
    """Clean the dates and unify them"""
    try:
        cleaned_date = date.replace("th", "")
        # print(f'zz:{cleaned_date}:zz')
        s = "U+2013"
        dash = chr(int(s[2:], 16))
        if cleaned_date.find("-") != -1:
            # print(f'before hypen - {cleaned_date}')
            start, end = cleaned_date.split("-")
            # print(f'after hypen - {start} - {end}')
            start = try_parsing_date(start.strip())
            end = try_parsing_date(end.strip())
            return f"{start} - {end}"

        elif cleaned_date.find(dash) != -1:
            # print(f'dash - {cleaned_date}')
            start, end = cleaned_date.split(dash)
            start = try_parsing_date(start.strip())
            end = try_parsing_date(end.strip())
            # print(f'{start} - {end}')
            return f"{start} - {end}"
        elif cleaned_date.find("to") != -1:
            # print(f'before to - {cleaned_date}')
            start, end = cleaned_date.split("to", 1)
            # print(f'after to - {start} - {end}')
            start = try_parsing_date(start.strip())
            end = try_parsing_date(end.strip())

            return f"{start} - {end}"
        else:
            return
    except:
        print(f"Could not sanitize the date: {cleaned_date}")
        return


def sanitize_date(df, column):
    """Helper function to santize dates in the dataframe"""
    return df[column].apply(lambda s: clean_dates(s))


def remove_column_whitespace(df):
    """Remove whitespace from the column names"""

    df.rename(
        columns={"Period": "Price_Period", "TOWN": "Town", "Super Petrol": "Super"},
        inplace=True,
    )
    df.rename(columns=lambda x: x.replace(" ", "_"), inplace=True)
    return df


def rename_towns(df):
    """Rename towns with spelling errors"""
    # Refactor this to be dynamic
    df = df.replace("Likoni Mainland", "Likoni")
    df = df.replace("Lowdar", "Lodwar")
    df = df.replace("Endebes", "Endebess")
    df = df.replace("Tindiret", "Tinderet")
    df = df.replace("Keumbu", "Kiambu")
    return df


def get_lat_long(town):
    """Gets the latitude and longitude for towns from OpenMaps API"""
    try:
        location = geolocator.geocode(town, country_codes="KE")
        # print(location.raw['name'])
        return pd.Series({"lat": location.raw["lat"], "lon": location.raw["lon"]})
    except:
        print(f"No lat long: {town} ")
        return pd.Series({"lat": np.nan, "lon": np.nan})


def get_town_coordinates(df, column):
    """Helper function to set coordinates in the dataframe"""
    df = df.merge(
        df[column].apply(lambda s: get_lat_long(s)), left_index=True, right_index=True
    )
    return df


def try_parsing_date(text):
    """Parse difftenrt forms of date"""
    for fmt in ("%d %B %Y", "%B %d %Y", "%B %Y"):
        try:
            if fmt == "%B %Y":
                d = datetime.strptime(text, fmt)
                return d.replace(day=15).strftime("%d-%b-%Y")
            else:
                return datetime.strptime(text, fmt).strftime("%d-%b-%Y")
        except ValueError:
            # print(f'value error: {e}')
            pass
    raise ValueError("no valid date format found")


def get_file_links():
    """Get fuel prices file links from the website"""
    years = ["21", "22", "23"]
    links = []
    options = Options()
    # Set the download directory
    prefs = {
        "download.default_directory": BASE_URL_RAW,
    }

    options.add_experimental_option("prefs", prefs)
    driver = webdriver.Chrome(options=options)
    driver.get("https://www.epra.go.ke/services/petroleum/petroleum-prices/")
    for year in years:
        elements = driver.find_elements(By.PARTIAL_LINK_TEXT, year)

        for i in elements:
            links.append(i.get_attribute("href"))
            # print(f'link: {i.get_attribute("href")} date: {i.text}')
    driver.quit()
    return links


# FINAL-ACTUAL-PUMP-PRICES_15th-MARCH-14th-APRIL-2023.xlsx
def download_files(links):
    """Download the files given the links"""
    # df = pd.DataFrame()
    # go thro the list
    ignore_file = "https://www.epra.go.ke/wp-content/uploads/2020/07/FINAL-ACTUAL-PUMP-PRICES_15th-MARCH-14th-APRIL-2023.xlsx"
    # Create the folder to store the data
    if not os.path.exists(BASE_URL_RAW):
        os.makedirs(BASE_URL_RAW)
    for link in links:
        file = link.split("/")[-1].split(".")[0]
        print(f"Downloading {file}")

        if link != ignore_file:
            extension = link.split(".")[-1]
            if extension == "csv":
                df_a = pd.read_csv(link)

                df_a.to_csv(f"{BASE_URL_RAW}/{file}.csv", index=False)
            elif extension == "xlsx":
                df_b = pd.read_excel(link)
                df_b.to_csv(f"{BASE_URL_RAW}/{file}.csv", index=False)

        else:
            pass
        print(f"Downloading finished {file}")
