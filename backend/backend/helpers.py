from datetime import datetime


def clean_dates(date):

    try:
        cleaned_date = date.replace('th', '')
        # print(f'zz:{cleaned_date}:zz')
        s = "U+2013"
        dash = chr(int(s[2:], 16))
        if cleaned_date.find('-') != -1:
            # print(f'before hypen - {cleaned_date}')
            start, end = cleaned_date.split('-')
            # print(f'after hypen - {start} - {end}')
            start = try_parsing_date(start.strip())
            end = try_parsing_date(end.strip())
            return f'{start} - {end}'

        elif cleaned_date.find(dash) != -1:
            # print(f'dash - {cleaned_date}')
            start, end = cleaned_date.split(dash)
            start = try_parsing_date(start.strip())
            end = try_parsing_date(end.strip())
            # print(f'{start} - {end}')
            return f'{start} - {end}'
        elif cleaned_date.find('to') != -1:
            # print(f'before to - {cleaned_date}')
            start, end = cleaned_date.split('to', 1)
            # print(f'after to - {start} - {end}')
            start = try_parsing_date(start.strip())
            end = try_parsing_date(end.strip())

            return f'{start} - {end}'
        else:
            return
    except:
        print(f'Could not sanitize the date: {cleaned_date}')


def sanitize_date(df, column):
    return df[column].apply(lambda s: clean_dates(s))


def remove_column_whitespace(df):
    df.rename(columns={"Period": "Price_Period",
              "TOWN": "Town", "Super Petrol": "Super"}, inplace=True)
    df.rename(columns=lambda x: x.replace(' ', '_'), inplace=True)
    return df


def rename_towns(df):
    '''Refactor this to be dynamic'''
    df = df.replace('Likoni Mainland', 'Likoni')
    df = df.replace('Lowdar', 'Lodwar')
    df = df.replace('Endebes', 'Endebess')
    df = df.replace('Tindiret', 'Tinderet')
    df = df.replace('Keumbu', 'Kiambu')
    return df


def get_lat_long(town):

    try:
        location = geolocator.geocode(town, country_codes='KE')
        # print(location.raw['name'])
        return pd.Series({'lat': location.raw['lat'], 'lon': location.raw['lon']})
    except:
        print(f'No lat long: {town} ')
        return pd.Series({'lat': np.nan, 'lon': np.nan})


def get_town_coordinates(df, column):
    df = df.merge(df[column].apply(lambda s: get_lat_long(s)),
                  left_index=True, right_index=True)
    return df


def try_parsing_date(text):

    for fmt in ('%d %B %Y', '%B %d %Y', '%B %Y'):
        try:
            if fmt == '%B %Y':
                d = datetime.strptime(text, fmt)
                return d.replace(day=15).strftime('%d-%b-%Y')
            else:
                return datetime.strptime(text, fmt).strftime('%d-%b-%Y')
        except ValueError as e:
            print(f'value error: {e}')
            pass
    raise ValueError('no valid date format found')
