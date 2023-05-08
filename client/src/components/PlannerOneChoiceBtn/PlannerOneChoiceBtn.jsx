import React from 'react'
import "./PlannerOneChoiceBtn.scss"
import { useState } from 'react'
const PlannerOneChoiceBtn = (props) => {
  const [activeButton, setActiveButton] = useState('button1');
  const [active, isActive] = useState(true)
  const handleClick = (button , values) => {
    setActiveButton(button);
    if (props.type === 'Season') {
      props.setplanner(prevplanner => (
        {...prevplanner,'Season': values}));
    }
    if (props.type === "Budget")
      // isActive(!active)
    props.setplanner((pervious_data) => {
      return { ...pervious_data, "Budget": values }
    })
    if (props.type.startsWith("Age")) {
      // isActive(!active)
      if (active) {
        if (props.planner[props.type] === 0) {
          props.setplanner((pervious_data) => {
            return { ...pervious_data, [props.type]: 1 }
          })
        }
      } else {
        props.setplanner((pervious_data) => {
          return { ...pervious_data, [props.type]: 0 }
        })
      }
    }
  };
  return (
    <div>
      <div className="plannerOneChoiceBtn">
      <button className={activeButton === 'button1' ? 'plannerOneChoiceBtnActive' : ''}onClick={() => handleClick("button1",props.names[0])}>
        {props.names[0]}
      </button>
      <button className={activeButton === 'button2' ? 'plannerOneChoiceBtnActive' : ''}onClick={() => handleClick("button2",props.names[1])}>
      {props.names[1]}     
      </button>
      <button className={activeButton === 'button3' ? 'plannerOneChoiceBtnActive' : ''}onClick={() => handleClick("button3",props.names[2])}>
          {props.names[2]}
      </button>
      <button className={activeButton === 'button4' ? 'plannerOneChoiceBtnActive' : ''}onClick={() => handleClick("button4",props.names[3])}>
          {props.names[3]}      
          </button>
              </div>
        </div>
  )
}

export default PlannerOneChoiceBtn