import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import "./planner.scss"
import Navbar from "../../components/navBar/Navbar";
import Footer from "../../components/footer/Footer";
import PlannerBtn from '../../components/PlannerBtn/PlannerBtn';
import axios from 'axios';
import PlannerOneChoiceBtn from './../../components/PlannerOneChoiceBtn/PlannerOneChoiceBtn';
import ScrollTop from '../../components/scrolltop/ScrollTop';

const Planner = () => {
  const season = ["Summer", "Winter", "Fall", "Spring"];
  const budget = ["0-49", "50-99", "100-249", "300+"];
  const [currentSlide, setCurrentSlide] = useState(0);
  const [submit, setsubmit] = useState(false);
  const [previos, setprivous] = useState(true);
  const [results, settesults] = useState(null);
  const [btnsections, setsections] = useState(false);
  const [planner, setplanner] = useState({
    "Budget": "0-49",
    "Season": "Summer",
    "Age_0": 0,
    "Age_20": 0,
    "Age_40": 0,
    "Age_60": 0,
    "Beach": 0,
    "Adventure": 0,
    "History": 0,
    "Culture": 0,
    "Nightlife": 0,
    "Shopping": 0,
    "Cuisine": 0,
    "Nature": 0,
    "Urban": 0,
    "Rural": 0,
    "Sea": 0,
    "Mountain": 0,
    "Lake": 0,
    "Desert": 0,
    "Plains": 0,
    "Jungle": 0
  })

  const handel_submit = async () => {
    await axios.post('http://localhost:5000/planner', planner, {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    ).then((res) => { settesults(res.data) })
    setCurrentSlide(currentSlide + 1)
    setsections(true)

  }
  const handelSelection = (evt) => {

    const inputClassName = evt.currentTarget.querySelector('input').name;

    evt.currentTarget.querySelector('input').checked = !evt.currentTarget.querySelector('input').checked
    addoption(inputClassName)
  };

  const nextSlide = () => {
    setCurrentSlide(currentSlide + 1);
    if (currentSlide <= 0) {
      setprivous(false)
    }
    if (currentSlide === 1) {
      setsubmit(true)
    }
  }


  const prevSlide = () => {
    if (currentSlide <= 1) {
      setprivous(true)
    }
    setCurrentSlide(currentSlide - 1);

    if (currentSlide == 2) {
      setsubmit(!submit)
    }
  }

  const navigate = useNavigate()

  const viewhotels = (res) => {
    navigate(`/hotels`, { state: { destination: res.City } })

  }
  const addoption = (e) => {
    if (isFinite(planner[e])) {
      if (planner[e] === 0) {
        setplanner((pervious_data) => {
          return { ...pervious_data, [e]: 1 }
        })
      } else {
        setplanner((pervious_data) => {
          return { ...pervious_data, [e]: 0 }
        })
      }
    }
  }
  //progress bar
  // const [isOpen, setIsOpen] = useState(false);
  // if (currentSlide === 2)
  //   setIsOpen(false)
  const totalSteps = 3;
  return (
    <>
      <div className='page'>
        <ScrollTop />
        <div>
          <Navbar />
        </div>

        <div className="plannerContainer">
          <div className="plannerWrapper">
            <div className={`steps ${currentSlide >= totalSteps ? 'hidden' : ''}`}>
              <div className="numbers">
                <div className={currentSlide >= 0 ? 'active' : ''}>1</div>
                <span className={currentSlide >= 1 ? 'active' : ''}></span>
                <div className={currentSlide >= 1 ? 'active' : ''}>2</div>
                <span className={currentSlide >= 2 ? 'active' : ''}></span>
                <div className={currentSlide >= 2 ? 'active' : ''}>3</div>
              </div>
            </div>
            <div className={`slide ${currentSlide === 0 ? 'slide_active' : ''}`}>
              <div className="scenery">
                <h1>What scenery are you seeking?</h1>
                <div className="sceneryOptions">
                  <div className="option" onClick={(evt) => handelSelection(evt)} >
                    <img src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8dXJiYW58ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60" alt="" className='sceneryImg' />
                    <h3>Urban</h3>
                    <div className="checkbox-wrapper-31">
                      <input className='chooce' name="Urban" type="checkbox" />
                      <svg viewBox="0 0 35.6 35.6" >
                        <circle className="background" cx="17.8" cy="17.8" r="17.8"></circle>
                        <circle className="stroke" cx="17.8" cy="17.8" r="14.37"></circle>
                        <polyline className="check" points="11.78 18.12 15.55 22.23 25.17 12.87"></polyline>
                      </svg>
                    </div>
                  </div>
                  <div className="option" onClick={(evt) => handelSelection(evt)}>
                    <img src="https://images.unsplash.com/photo-1530844230930-8168b52d2d88?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80" alt="" className='sceneryImg' />
                    <h3>Rural</h3>
                    <div class="checkbox-wrapper-31">
                      <input name="Rural" type="checkbox" />
                      <svg viewBox="0 0 35.6 35.6" >
                        <circle class="background" cx="17.8" cy="17.8" r="17.8"></circle>
                        <circle class="stroke" cx="17.8" cy="17.8" r="14.37"></circle>
                        <polyline class="check" points="11.78 18.12 15.55 22.23 25.17 12.87"></polyline>
                      </svg>
                    </div>
                  </div>
                  <div className="option" onClick={(evt) => handelSelection(evt)}>
                    <img src="https://images.unsplash.com/photo-1468581264429-2548ef9eb732?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8U2VhfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60" alt="" className='sceneryImg' />
                    <h3>Sea</h3>
                    <div class="checkbox-wrapper-31">
                      <input name="Sea" type="checkbox" />
                      <svg viewBox="0 0 35.6 35.6">
                        <circle class="background" cx="17.8" cy="17.8" r="17.8"></circle>
                        <circle class="stroke" cx="17.8" cy="17.8" r="14.37"></circle>
                        <polyline class="check" points="11.78 18.12 15.55 22.23 25.17 12.87"></polyline>
                      </svg>
                    </div>
                  </div>
                  <div className="option" onClick={(evt) => handelSelection(evt)}>
                    <img src="https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8TW91bnRhaW58ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60" alt="" className='sceneryImg' />
                    <h3>Mountain</h3>
                    <div class="checkbox-wrapper-31">
                      <input name="Mountain" type="checkbox" />

                      <svg viewBox="0 0 35.6 35.6">
                        <circle class="background" cx="17.8" cy="17.8" r="17.8"></circle>
                        <circle class="stroke" cx="17.8" cy="17.8" r="14.37"></circle>
                        <polyline class="check" points="11.78 18.12 15.55 22.23 25.17 12.87"></polyline>
                      </svg>

                    </div>
                  </div>
                  <div className="option" onClick={(evt) => handelSelection(evt)}>
                    <img src="https://images.unsplash.com/photo-1583244685026-d8519b5e3d21?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8TGFrZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60" alt="" className='sceneryImg' />
                    <h3>Lake</h3>
                    <div class="checkbox-wrapper-31">
                      <input name="Lake" type="checkbox" />
                      <svg viewBox="0 0 35.6 35.6">
                        <circle class="background" cx="17.8" cy="17.8" r="17.8"></circle>
                        <circle class="stroke" cx="17.8" cy="17.8" r="14.37"></circle>
                        <polyline class="check" points="11.78 18.12 15.55 22.23 25.17 12.87"></polyline>
                      </svg>
                    </div>
                  </div>
                  <div className="option" onClick={(evt) => handelSelection(evt)}>
                    <img src="https://images.unsplash.com/photo-1488197047962-b48492212cda?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8RGVzZXJ0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60" alt="" className='sceneryImg' />
                    <h3>Desert</h3>
                    <div class="checkbox-wrapper-31">
                      <input name="Desert" type="checkbox" />
                      <svg viewBox="0 0 35.6 35.6">
                        <circle class="background" cx="17.8" cy="17.8" r="17.8"></circle>
                        <circle class="stroke" cx="17.8" cy="17.8" r="14.37"></circle>
                        <polyline class="check" points="11.78 18.12 15.55 22.23 25.17 12.87"></polyline>
                      </svg>
                    </div>
                  </div>
                  <div className="option" onClick={(evt) => handelSelection(evt)}>
                    <img src="https://images.unsplash.com/photo-1422466654108-5e533f591881?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8UGxhaW5zfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60" alt="" className='sceneryImg' />
                    <h3>Plains</h3>
                    <div class="checkbox-wrapper-31">
                      <input name="Plains" type="checkbox" />
                      <svg viewBox="0 0 35.6 35.6">
                        <circle class="background" cx="17.8" cy="17.8" r="17.8"></circle>
                        <circle class="stroke" cx="17.8" cy="17.8" r="14.37"></circle>
                        <polyline class="check" points="11.78 18.12 15.55 22.23 25.17 12.87"></polyline>
                      </svg>
                    </div>
                  </div>
                  <div className="option" onClick={(evt) => handelSelection(evt)} >
                    <img src="https://plus.unsplash.com/premium_photo-1673288456151-4f7b871863c9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8SnVuZ2xlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60" alt="" className='sceneryImg' />
                    <h3>Jungle</h3>
                    <div class="checkbox-wrapper-31">
                      <input name="Jungle" type="checkbox" />
                      <svg viewBox="0 0 35.6 35.6">
                        <circle class="background" cx="17.8" cy="17.8" r="17.8"></circle>
                        <circle class="stroke" cx="17.8" cy="17.8" r="14.37"></circle>
                        <polyline class="check" points="11.78 18.12 15.55 22.23 25.17 12.87"></polyline>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={`slide ${currentSlide === 1 ? 'slide_active' : ''}`}>
              <div className="experience">
                <h1>What are you looking to experience?</h1>
                <div className="experienceOptions">
                  <div className="option" onClick={(evt) => handelSelection(evt)}>
                    <img src="https://images.pexels.com/photos/1078981/pexels-photo-1078981.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" className='experienceImg' />
                    <h3>Beach</h3>
                    <div class="checkbox-wrapper-31">
                      <input name='Beach' type="checkbox" />
                      <svg viewBox="0 0 35.6 35.6">
                        <circle class="background" cx="17.8" cy="17.8" r="17.8"></circle>
                        <circle class="stroke" cx="17.8" cy="17.8" r="14.37"></circle>
                        <polyline class="check" points="11.78 18.12 15.55 22.23 25.17 12.87"></polyline>
                      </svg>
                    </div>
                  </div>
                  <div className="option" onClick={(evt) => handelSelection(evt)}>
                    <img src="https://images.pexels.com/photos/2397414/pexels-photo-2397414.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" className='experienceImg' />
                    <h3>Adventure</h3>
                    <div class="checkbox-wrapper-31">
                      <input name='Adventure' type="checkbox" />
                      <svg viewBox="0 0 35.6 35.6">
                        <circle class="background" cx="17.8" cy="17.8" r="17.8"></circle>
                        <circle class="stroke" cx="17.8" cy="17.8" r="14.37"></circle>
                        <polyline class="check" points="11.78 18.12 15.55 22.23 25.17 12.87"></polyline>
                      </svg>
                    </div>
                  </div>
                  <div className="option" onClick={(evt) => handelSelection(evt)}>
                    <img src="https://images.pexels.com/photos/3185480/pexels-photo-3185480.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" className='experienceImg' />
                    <h3>History</h3>
                    <div class="checkbox-wrapper-31">
                      <input name='History' type="checkbox" />
                      <svg viewBox="0 0 35.6 35.6">
                        <circle class="background" cx="17.8" cy="17.8" r="17.8"></circle>
                        <circle class="stroke" cx="17.8" cy="17.8" r="14.37"></circle>
                        <polyline class="check" points="11.78 18.12 15.55 22.23 25.17 12.87"></polyline>
                      </svg>
                    </div>
                  </div>
                  <div className="option" onClick={(evt) => handelSelection(evt)}>
                    <img src="https://images.pexels.com/photos/2406731/pexels-photo-2406731.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" className='experienceImg' />
                    <h3>Culture</h3>
                    <div class="checkbox-wrapper-31">
                      <input name='Culture' type="checkbox" />
                      <svg viewBox="0 0 35.6 35.6">
                        <circle class="background" cx="17.8" cy="17.8" r="17.8"></circle>
                        <circle class="stroke" cx="17.8" cy="17.8" r="14.37"></circle>
                        <polyline class="check" points="11.78 18.12 15.55 22.23 25.17 12.87"></polyline>
                      </svg>
                    </div>
                  </div>
                  <div className="option" onClick={(evt) => handelSelection(evt)}>
                    <img src="https://images.unsplash.com/photo-1618176581836-9dcf475e2b4a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OTZ8fG5pZ2h0bGlmZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60" alt="" className='experienceImg' />
                    <h3>Nightlife</h3>
                    <div class="checkbox-wrapper-31">
                      <input name='Nightlife' type="checkbox" />
                      <svg viewBox="0 0 35.6 35.6">
                        <circle class="background" cx="17.8" cy="17.8" r="17.8"></circle>
                        <circle class="stroke" cx="17.8" cy="17.8" r="14.37"></circle>
                        <polyline class="check" points="11.78 18.12 15.55 22.23 25.17 12.87"></polyline>
                      </svg>
                    </div>
                  </div>
                  <div className="option" onClick={(evt) => handelSelection(evt)}>
                    <img src="https://images.pexels.com/photos/2622170/pexels-photo-2622170.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" className='experienceImg' />
                    <h3>Shopping</h3>
                    <div class="checkbox-wrapper-31">
                      <input name='Shopping' type="checkbox" />
                      <svg viewBox="0 0 35.6 35.6">
                        <circle class="background" cx="17.8" cy="17.8" r="17.8"></circle>
                        <circle class="stroke" cx="17.8" cy="17.8" r="14.37"></circle>
                        <polyline class="check" points="11.78 18.12 15.55 22.23 25.17 12.87"></polyline>
                      </svg>
                    </div>
                  </div>
                  <div className="option" onClick={(evt) => handelSelection(evt)}>
                    <img src="https://images.pexels.com/photos/1109197/pexels-photo-1109197.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" className='experienceImg' />
                    <h3>Cuisine</h3>
                    <div class="checkbox-wrapper-31">
                      <input name='Cuisine' type="checkbox" />
                      <svg viewBox="0 0 35.6 35.6">
                        <circle class="background" cx="17.8" cy="17.8" r="17.8"></circle>
                        <circle class="stroke" cx="17.8" cy="17.8" r="14.37"></circle>
                        <polyline class="check" points="11.78 18.12 15.55 22.23 25.17 12.87"></polyline>
                      </svg>
                    </div>
                  </div>
                  <div className="option" onClick={(evt) => handelSelection(evt)}>
                    <img src="https://images.pexels.com/photos/3244513/pexels-photo-3244513.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" className='experienceImg' />
                    <h3>Nature </h3>
                    <div class="checkbox-wrapper-31">
                      <input name='Nature' type="checkbox" />
                      <svg viewBox="0 0 35.6 35.6">
                        <circle class="background" cx="17.8" cy="17.8" r="17.8"></circle>
                        <circle class="stroke" cx="17.8" cy="17.8" r="14.37"></circle>
                        <polyline class="check" points="11.78 18.12 15.55 22.23 25.17 12.87"></polyline>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={`slide ${currentSlide === 2 ? 'slide_active' : ''}`}>
              <div className='questions'>

                <div className="season"  >
                  <h1> What season are you planning to travel?</h1>
                  <div className="seasonOptions">
                    <PlannerOneChoiceBtn names={season} type="Season" planner={planner} setplanner={setplanner} />
                  </div>
                </div>
                <div className="age">
                  <h1>What is the age range of your group?</h1>
                  <div className="ageOptions">
                    <PlannerBtn name="6-19" type="Age_0" planner={planner} setplanner={setplanner} />
                    <PlannerBtn name="20-39" type="Age_20" planner={planner} setplanner={setplanner} />
                    <PlannerBtn name="40-59" type="Age_40" planner={planner} setplanner={setplanner} />
                    <PlannerBtn name="60+" type="Age_60" planner={planner} setplanner={setplanner} />
                  </div>
                </div>
                <div className="budget">
                  <h1>What's your budget (per day):</h1>
                  <div className="budgetOptions">
                    <PlannerOneChoiceBtn names={budget} type="Budget" planner={planner} setplanner={setplanner} />
                  </div>
                </div>
              </div>
            </div>

            <span className='slider_controller' {...btnsections && { style: { display: 'none' } }}>
              <button className='slider_btn' {...previos && {
                disabled: true, style: {
                  opacity: 0.5
                }
              }} onClick={prevSlide}>Previous</button>
              {submit && (<button onClick={handel_submit} className='slider_btn'>Submit</button>) ||
                (<button className='slider_btn' onClick={nextSlide}>Next</button>)}
            </span>


            {typeof results !== 'undefined' && results !== null && <>
              <div className={`slide ${currentSlide === 3 ? 'slide_active' : ''}`}>
                <div className="result">
                  <h1>Our results</h1>
                  <div className="result_options">
                    {results.cities.map(res => (
                      <div className="result_option" onClick={() => viewhotels(res)} >
                        <img src={res.Photo} alt="" className='resultimage' />
                        <h3>{res.City}</h3>
                      </div>
                    ))}
                  </div>
                </div>
              </div></>}
          </div>
        </div>

        <div>
          <Footer />
        </div>
      </div>
    </>
  )
}

export default Planner