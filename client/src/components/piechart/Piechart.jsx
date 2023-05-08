import React from 'react'
import { PieChart } from 'react-minimal-pie-chart';
import { useState } from 'react';
import './Piechart.scss'

const data = [
    { title: 'data A', value: 25, color: '#b8e0d2' },
    { title: 'data B', value: 25, color: '#023047' },
    { title: 'data C', value: 50, color: '#809bce' },
  ];
  const Piechart = () => {
    const [activeIndex, setActiveIndex] = useState(null);
    
   
  
    const onMouseOver = (event, index) => {
        setActiveIndex(index);
    };
    const onMouseOut = () => {
        setTimeout(() => {

        setActiveIndex(null);
        }, 500);
    }
  
    return (
      <PieChart
      data={data}
      totalValue={100}
      radius={45}
      lineWidth={70}
      label={({ dataEntry }) => `${dataEntry.title}: ${dataEntry.value}%`}
      segmentsShift={(index) => (index === activeIndex ? 6 : 1)}
      segmentsStyle={{ transition: 'stroke .3s', cursor: 'pointer' }}
      labelStyle = {{ fill: '#fff', fontSize: '5px', fontWeight: 'bolder' , fontFamily: 'sans-serif' , cursor: 'pointer', onMouseOver: onMouseOver}}
      labelPosition={70}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
      animate={true}
      animationDuration={1000}
      paddingAngle={1}
      />
    );
  };

export default Piechart