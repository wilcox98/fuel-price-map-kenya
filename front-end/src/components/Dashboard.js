import { Container } from 'react-bootstrap';

import React from 'react';
import axios from 'axios';
import { MapView } from './Map';
import { TopTen } from './Top10';
export class Dashboard extends React.Component {
  state = {
    towns: [],
  };
  componentDidMount() {
    axios
      .get(`http://127.0.0.1:5000/towns`)
      .then(res => {
        const towns = res.data;
        //    console.log(towns)
        this.setState({ towns });
      })
      .catch(error => console.log(error));
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
            <div className="col-md-6">Graph ya cost ya mafuta</div>
            <div className="col-md-6">cheapest scrollable</div>
          </div>
        </div>
      </Container>
    );
  }
}

export default Dashboard;
