from ..backend import helpers


def test_sanitize_date():
    dash_date = '15th September 2022 –14th October 2022'
    hypen_date = '15th September 2022 -14th October 2022'
    to_date = '15th September 2022 to 14th October 2022'
    clean1 = helpers.clean_dates(hypen_date)
    clean2 = helpers.clean_dates(to_date)
    clean3 = helpers.clean_dates(dash_date)
    assert clean1 == '15-Sep-2022 - 14-Oct-2022'
    assert clean2 == '15-Sep-2022 - 14-Oct-2022'
    assert clean3 == '15-Sep-2022 - 14-Oct-2022'
