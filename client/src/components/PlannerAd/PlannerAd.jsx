import React from 'react'
import "./PlannerAd.scss"
import PlannerAdVideo from "../../image/PlannerAdVideo.mp4"
import { useNavigate } from "react-router-dom";

const PlannerAd = () => {
    const navigate = useNavigate()
    const ViewPlanner = () => {
        navigate("/Planner")
    }
    return (
        <div className='plannerAd'>
            <video src={PlannerAdVideo} autoPlay={true} muted loop className='PlannerAdVideo' />
            <h1 className='PlannerAdTitle'>wanna travel and don't know where to go? <br />
                give our AI Vacation planner a go!</h1>
            <p className='PlannerAdDetails'>Answer some  questions and get  suitable cities for you, <br /> Let AI design your dream vacation.</p>
            
                <button className='PlannerAdBtn' onClick={ViewPlanner}>View Now</button>
        </div>
    )
}

export default PlannerAd