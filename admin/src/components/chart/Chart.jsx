import { useEffect, useState } from "react";
import "./chart.scss";
import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

  // switch (type) {
  //   case "AverageNight":
  //     data = {
  //       title: "Average night",
  //       isMoney: false,
  //       // link: "See all users",
  //       icon: (
  //         <EditCalendarIcon
  //           className="icon"
  //           style={{
  //             color: "rgb(0, 128, 255,0.2)",
  //             backgroundColor: "	rgb(0, 191, 255,0.2)	",
  //           }}
  //         />
  //       ),
  //     };
  //     break;
  //   }


const Chart = ({ aspect, title , input }) => {
  const [data,setdata] = useState(input.find(item => item.Year === "2023"))



  return (
    <div className="chart">
      <div className="title">{title}</div>
      <ResponsiveContainer width="100%" aspect={aspect}>
        <AreaChart
          width={830}
          height={250}
          data={data.months}
          margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
        >
          <defs>
            <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#142662" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#142662" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" stroke="gray" />
          <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="Total"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#total)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
