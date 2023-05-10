import "./home.scss"
import Featured from "../../components/feature/Featured"
import Footer from "../../components/footer/Footer"
import Header from "../../components/header/Header"
import Mapbox from "../../components/MapBox/Mapbox"
import HotelCard from "../../components/hotelCard/HotelCard"
import BoykaSlider from "../../components/Slide/BoykaSlider";
import useFetch from "../../hook/useFetch.js"
import { useEffect, useState } from "react"
import Loading from "../../components/Loading/Loading"
import ScrollTop from "../../components/scrolltop/ScrollTop"
import axios from 'axios';
import PlannerAd from "../../components/PlannerAd/PlannerAd"


const Home = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const userId = currentUser ? currentUser._id : null;
  const [responseData, setResponseData] = useState([]);
  const { data, loading } = useFetch(`/hotel?limit=${9}`);
  const [sliderLoaded, setSliderLoaded] = useState(false);

  async function fetchData() {
    const response = await axios.post('http://localhost:5000/recommender', { userId });
    const responseData = response.data;
    setResponseData(responseData);
  }

  useEffect(() => {
    if (userId) {
      fetchData();
    }
  }, [userId]);

  useEffect(() => {
    if (!loading && data.length > 0 && !sliderLoaded) {
      setSliderLoaded(true);
    }
  }, [loading, data, sliderLoaded]);

  useEffect(() => {
    if (!loading && responseData.length > 0 && !sliderLoaded) {
      setSliderLoaded(true);
    }
  }, [loading, responseData, sliderLoaded]);

  const settings = {
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    duration: 500,
    swipe: true,
  };

  return (
    <div>
      <ScrollTop />
      <Header />
      {loading ? <Loading /> : (
        <div className="homeContainer">
          <h2 className="homeTitle">Explore Hotels On Map </h2>
          <Mapbox />
          <h2 className="homeTitle">Explore Some City</h2>
          <Featured />
          <h2 className="homeTitle">Explore More City By Planner </h2>
          <PlannerAd />
          <h2 className="homeTitle">Recommended Hotel For You</h2>
          {loading ? (
            <Loading />
          ) : (
            <>
              {sliderLoaded ? (
                responseData.length > 0 ? (
                  <BoykaSlider {...settings}>
                    {responseData.map((item) => (
                      <HotelCard  item={item} key={item._id} />
                    ))}
                  </BoykaSlider>
                ) : (
                  <BoykaSlider {...settings}>
                    {data.map((item) => (
                      <HotelCard  item={item} key={item._id} />
                    ))}
                  </BoykaSlider>
                )
              ) : (
                <Loading />
              )}
            </>
          )}
        </div>)}
      <Footer />
    </div>
  )
}
export default Home

