from flask import Flask
import json
import pandas as pd
from flask_cors import CORS

app = Flask(__name__)

data = pd.read_csv("../data/combined.csv")

CORS(app)


@app.route("/towns")
def get_towns():
    """Endpoint to get all the towns with its data"""
    z = data.loc[data["Price_Period"] == "15-Mar-2022 - 15-Apr-2022"]
    towns = z[["Town", "Diesel", "Kerosene", "Super", "lat", "lon"]]

    res = json.loads(towns.to_json(orient="records"))
    return res


@app.route("/towns/average")
def get_towns_average():
    """Endpoint to get all the towns with its data"""
    # z = data.loc[data["Price_Period"] == "15-Mar-2022 - 15-Apr-2022"]
    # towns = z[["Town", "Diesel", "Kerosene", "Super", "lat", "lon"]]
    grouped = data.groupby(["Price_Period"])[["Super", "Diesel", "Kerosene"]].mean()
    res = json.loads(grouped.to_json(orient="index"))
    my_list = [{k: v} for (k, v) in res.items()]
    return my_list


@app.route("/town/<town>")
def get_town_details(town):
    """Get town details"""
    clean_town = town.replace("%20", " ")
    # print(clean_town.capitalize())
    # clean_town.capitalize()

    row = data.loc[data["Town"] == clean_town]
    prices = row[["Town", "Diesel", "Kerosene", "Super", "lat", "lon", "Price_Period"]]
    # print(prices.values)
    res = json.loads(prices.to_json(orient="index"))
    print(row)
    return list(res.values())[0]


@app.route("/prices/<town>")
def get_prices_town(town):
    """Get prices for a specific town"""
    clean_town = town.replace("%20", " ")
    row = data.loc[data["Town"] == clean_town]
    prices = row[["Price_Period", "Diesel", "Kerosene", "Super"]]
    # print(prices.values)
    res = json.loads(prices.to_json(orient="index"))
    return list(res.values())


if __name__ == "__main__":
    app.run(debug=True)
