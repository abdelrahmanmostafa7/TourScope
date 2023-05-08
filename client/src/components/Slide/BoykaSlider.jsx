import React from 'react'
import "./BoykaSlide.scss"
import Slider from 'infinite-react-carousel';

const BoykaSlider = ({ children, slidesToShow, slidesToScroll, autoplay, autoplaySpeed, swipe ,duration }) => {
    return (
        <div className='boykaSlider'>
            <div className="boykaSliderContainer">
                <Slider  slidesToShow={slidesToShow} duration={duration} slidesToScroll={slidesToScroll} autoplay={autoplay} autoplaySpeed={autoplaySpeed} swipe={swipe}>
                    {children}
                </Slider>
            </div>
        </div>
    )
}

export default BoykaSlider