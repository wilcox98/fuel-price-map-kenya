import { Container } from "react-bootstrap";

import React from "react";
import axios from "axios";
import { MapView } from "./Map";
import { TopTen } from "./Top10";
import { AveragePlot } from "./AvgPlot";
export class Dashboard extends React.Component {
  state = {
    towns: [],
    avg: [],
  };
  componentDidMount() {
    axios
      .get(`http://127.0.0.1:5000/towns`)
      .then((res) => {
        const towns = res.data;
        //    console.log(towns)
        this.setState({ towns });
      })
      .catch((error) => console.log(error));
    axios
      .get(`http://localhost:5000/towns/average`)
      .then((res) => {
        const avg = res.data;
        //    console.log(towns)
        this.setState({ avg });
      })
      .catch((error) => console.log(error));
  }
  render() {
    return (
      <Container>
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <MapView towns={this.state.towns}></MapView>
            </div>
            <div className="col-md-6">
              <TopTen towns={this.state.towns}></TopTen>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <AveragePlot avg_prices={this.state.avg}></AveragePlot>
            </div>
            <div className="col-md-6">cheapest scrollable</div>
          </div>
        </div>
      </Container>
    );
  }
}

export default Dashboard;
