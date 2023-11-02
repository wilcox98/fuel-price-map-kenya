import Plot from 'react-plotly.js';
export const PricesBarChart = ({ prices = [] }) => {
  const data1 = [];
  console.log(prices.length);
  let diesel = [];
  let kero = [];
  let supe = [];
  let period = [];
  for (let i = 0; i < prices.length; i++) {
    diesel.push(prices[i].Diesel);
    kero.push(prices[i].Kerosene);
    supe.push(prices[i].Super);
    period.push(prices[i].Price_Period);
  }
  console.log('diesel' + diesel);
  // for (let i = 0; i < prices.length; i++) {
  //   console.log(prices);
  //   var plot = {
  //     x: [prices[i].Price_Period],

  //     y: [prices[i].Diesel],
  //     // name: [prices[i].Diesel, prices[i].Super, prices[i].Kerosene],
  //     // name: ['Diesel', 'Super', 'Kerosene'],
  //     name: 'Diesel',
  //     type: 'scatter',
  //   };
  //   data1.push(plot);
  //   console.log(plot);
  // }
  var dieselPlot = {
    x: period,
    y: diesel,
    name: 'Diesel',
  };
  var superPlot = {
    x: period,
    y: supe,
    name: 'Petrol',
  };
  var keroPlot = {
    x: period,
    y: kero,
    name: 'Kerosene',
  };
  var data = [dieselPlot, superPlot, keroPlot];
  return (
    <Plot
      data={data}
      layout={{
        width: 500,
        height: 500,
        title: 'Fuel Prices from 2021',
        yaxis: { title: 'Price (KSH)' },
        xaxis: { title: 'Period' },
        barmode: 'group',
        showlegend: true,
      }}
    />
  );
};
