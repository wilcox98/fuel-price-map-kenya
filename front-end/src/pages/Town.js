import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { MapView } from "../components/Map";

// import { useNavigate } from "react-router-dom";
import { TownPrices } from "../components/TownPrices";
import { PricesBarChart } from "../components/PricesPlot";
export const Town = () => {
  const { town } = useParams();
  const [location, setLocation] = useState();
  const [prices, setPrices] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setloading] = useState(true);
  // const navigate = useNavigate();
  let map;
  let title;
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:5000/town/${town}`)
      .then((res) => {
        setLocation(res.data);
        // setloading(false);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally((e) => {
        // setloading(false)
      });
    axios
      .get(`http://127.0.0.1:5000/prices/${town}`)
      .then((res) => {
        setPrices(res.data);
        setloading(false);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally((e) => {
        // setloading(false)
      });
  }, [town]);
  if (location !== undefined) {
    title = (
      <div>
        <h1>
          <strong>{location.Town}</strong>
        </h1>
      </div>
    );
    map = (
      <MapView
        center={[location.lat, location.lon]}
        towns={[location]}
        zoom={8}
      ></MapView>
    );
  } else {
    map = (
      <div className="spinner-border" role="status">
        <span className="sr-only"></span>
      </div>
    );
  }
  let pricesTable;
  if (!isLoading) {
    pricesTable = <TownPrices prices={prices}></TownPrices>;
  } else {
    pricesTable = (
      <div className="container spinner-border" role="status">
        <span className="sr-only"></span>
      </div>
    );
  }
  return (
    <>
      {title}
      <Container>
        {error && <p className="text-danger">{error}</p>}
        <div className="container">
          <div className="row">
            <div className="col-md-6">{map}</div>
            <div className="col-md-6">{pricesTable}</div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <PricesBarChart prices={prices}></PricesBarChart>
            </div>
            <div className="col-md-6">cheapest scrollable</div>
          </div>
        </div>
      </Container>
    </>
  );
};

// export  Town;
export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
