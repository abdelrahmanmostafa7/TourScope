import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom';

import "./PlannerBtn.scss"
const PlannerBtn = (props) => {
  const [active, isActive] = useState(true)
  function handelClick() {
    if (props.type === "Season") {
      isActive(false);
      props.setplanner((pervious_data) => {
        return { ...pervious_data, [props.type]: props.name }
      })
    }
    if (props.type === "Budget")
      isActive(!active)
    props.setplanner((pervious_data) => {
      return { ...pervious_data, [props.type]: props.name }
    })
    if (props.type.startsWith("Age")) {
      isActive(!active)
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
  }
  return (
    <div>
      <button  className={active ? "clicked" : "unClicked"} onClick={handelClick}>{props.name}</button>
    </div>
  )
}

export default PlannerBtn