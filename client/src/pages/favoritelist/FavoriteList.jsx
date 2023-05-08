import "./FavoriteList.scss"
import React, { useEffect, useState } from 'react'
import Footer from '../../components/footer/Footer'
import Navbar from '../../components/navBar/Navbar'
import useFetch from "../../hook/useFetch.js"
import Loading from '../../components/Loading/Loading'
import FavCard from "../../components/favCard/FavCard"

const FavoriteList = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"))
  const id = currentUser._id
  const { data: hotel, loading: hotelLoading } = useFetch(`/hotel/favHotel/${id}`);
  
  
  const [dataLoaded, setDataLoaded] = useState(false);
  useEffect(() => {
    if (hotel.favoriteList) {
      setDataLoaded(true);
    }
  }, [hotelLoading, hotel, dataLoaded]);


  return (
    <div>
      <Navbar />
      {hotelLoading ? <Loading /> :
        (<div className="favContainer">
          <div className="favWrapper">
            
            <div className='info'>
              <span className='notActive'>Home &gt; </span>
              <span>  Favorite List</span>
            </div>

            <div className="bottom">
              {hotelLoading ? (
                <Loading />
              ) : (
                <>
                  {dataLoaded ? (
                    <div className="favCardList">
                      {
                        hotel.favoriteList.map(item =>
                          <FavCard checkCard={true} item={item} key={item._id} />
                        )
                      }
                    </div>
                  ) : (
                    <p><Loading /></p>
                  )}
                </>
              )}
            </div>
          </div>
        </div>)}
      <Footer />
    </div>
  )
}

export default FavoriteList