import React, { Component } from 'react';
import {Line} from 'react-chartjs-2';

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July','August','September','October','November','December'],
  datasets: [
    {
      label: 'Symbole-1',
      fill: false,
      lineTension: 0.1,
      //backgroundColor: 'rgba(75,192,192,0.4)',
      //borderColor: 'rgba(75,192,192,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [103.0, 102.5, 102,101,100, 102.3, 104.4,103,105,103.5,101.8,105.1]
    },
    {
      label: 'Demo Symbole-2',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(35,192,192,0.4)',
      borderColor: 'rgba(35,192,192,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(34,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [101.0, 101.5, 102, 97.5, 98, 102.3, 103.4,103.9,105,103.5,102.8,103.1]
    }
  ]
};

class LineChart extends Component{
  constructor(props){
    super(props);
  }
  //displayName: 'LineExample';

  render() {
    return (
      <div>
        <h2>Stock Performance</h2>
        <Line data={data} />
      </div>
    
    );
  }
}
export default LineChart;