import React, { useState } from 'react';
import "./areachart.scss";
import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";



const data = [
  { name: "January", Total: 1200 },
  { name: "February", Total: 2100 },
  { name: "March", Total: 800 },
  { name: "April", Total: 1600 },
  { name: "May", Total: 900 },
  { name: "June", Total: 1700 },
];

const Areachart = () => {

  const [datatype, setDatatype] = useState("Revenues");
  const [Chartcolour, setChartcolour] = useState("#8cb560");
  const data_toggle = (e) => {
    setDatatype(e.target.value);

    if (e.target.value === "Revenues") {
      setChartcolour("#8cb560");
    } else if (e.target.value === "Guests") {
      setChartcolour("#bde0fe");
    }
    else if (e.target.value === "Bookings") {
      setChartcolour("#264653");
    }
    else if (e.target.value === "Reserved Rooms") {
      setChartcolour("#2a9d8f");
    }


  };



  return (
    <div className="chart">
      <div className="chart_top">
        
        <h3 className='chart_title'>
          {datatype}
        </h3>

      <div className='select-box'>
      <select  onChange={data_toggle}>
        <option value='' disabled>Select an option</option>
        <option  value='Revenues'>Revenues</option>
        <option value='Guests'>Guests</option>
        <option value='Bookings'> Bookings </option>
        <option value="Reserved Rooms">Reserved Rooms</option>
      </select>
      <span className='select-arrow'></span>
    </div>



     
      </div>
      <ResponsiveContainer width="100%" height={259} >
        <AreaChart
          width={790}
          height={250}
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={Chartcolour} stopOpacity={0.8} />
              <stop offset="95%" stopColor={Chartcolour} stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" stroke="gray" />
          <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="Total"
            stroke="#88544"
            fillOpacity={1}
            fill="url(#total)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Areachart;
