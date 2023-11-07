import Plot from "react-plotly.js";
import React from "react";
export const AveragePlot = ({ avg_prices }) => {
  let diesel = [];
  let kero = [];
  let supe = [];
  let period = [];
  for (let i = 0; i < avg_prices.length; i++) {
    for (const [key, value] of Object.entries(avg_prices[i])) {
      diesel.push(value.Diesel);
      kero.push(value.Kerosene);
      supe.push(value.Super);
      period.push(key);
    }
  }
  var dieselPlot = {
    x: period,
    y: diesel,
    name: "Diesel",
  };
  var superPlot = {
    x: period,
    y: supe,
    name: "Petrol",
  };
  var keroPlot = {
    x: period,
    y: kero,
    name: "Kerosene",
  };
  var data = [dieselPlot, superPlot, keroPlot];
  return (
    <Plot
      data={data}
      layout={{
        width: 500,
        height: 500,
        title: "Average Fuel Prices",
        yaxis: { title: "Price (KSH)" },
        xaxis: { title: "Period" },
        barmode: "group",
        showlegend: true,
      }}
    />
  );
};
