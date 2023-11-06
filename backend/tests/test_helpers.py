"""Test suite for the helpers"""
import pandas as pd
from ..backend import helpers


def test_sanitize_date():
    """test all methods to sanitize the date"""
    dash_date = "15th September 2022 –14th October 2022"
    hypen_date = "15th September 2022 -14th October 2022"
    to_date = "15th September 2022 to 14th October 2022"
    clean1 = helpers.clean_dates(hypen_date)
    clean2 = helpers.clean_dates(to_date)
    clean3 = helpers.clean_dates(dash_date)
    assert clean1 == "15-Sep-2022 - 14-Oct-2022"
    assert clean2 == "15-Sep-2022 - 14-Oct-2022"
    assert clean3 == "15-Sep-2022 - 14-Oct-2022"


def test_get_lat_long():
    """test geting latitude and longitude from geopy"""
    df = helpers.get_lat_long("Nairobi")
    test_df = pd.Series({"lat": "-1.3026148499999999", "lon": "36.82884201813725"})

    assert df.equals(test_df)


def test_get_file_links():
    """Tests the file download links"""
    links = helpers.get_file_links()
    # check if the first link is similar
    link = "https://www.epra.go.ke/wp-content/uploads/2021/11/15th-November-14th-December-2021-1.csv"
    assert links[0] == link
