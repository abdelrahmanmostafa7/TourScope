import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import './FavCard.scss'
import newRequest from '../../utils/newRequest';
import { Checkbox } from '@mui/material';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import useFetch from '../../hook/useFetch';

const FavCard = ({ item, checkCard}) => {
  const navigate = useNavigate()
  const hotelDetails = () => {
    navigate(`/hotels/${item._id}`)
  }
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

  const currentUser = JSON.parse(localStorage.getItem("currentUser"))
  const id = currentUser ? currentUser._id : null;
  const hotelId = item._id
  const { data: hotel, loading: hotelLoading } = useFetch(`/hotel/favHotel/${id}`);

  const [active, setActive] = useState(checkCard)
  const handleButton = async () => {
    try {
      await newRequest.put(`/user/addOrRemove/${id}`, { hotelId })
      setActive(!active)
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className='favC'>
      <div className="ratingAndCheckboxContainer">
        <span className='favCardRating'> {item.rating}⭐</span>
        <Checkbox
          {...label}
          icon={<BookmarkBorderIcon />}
          checkedIcon={<BookmarkIcon />}
          sx={{
            color: "#142662",
            '&.Mui-checked': {
              color: "#142662",
            },
          }}
          checked={active}
          onClick={handleButton}
        />
      </div>
      <img src={item.images} alt="" className='favCardImg' />
      <p className='favHotelDetails'>{item.country} - {item.city} || {item.distanceFromCityCenter}Km from center</p>
      <h3 className='favHotelName'>{item.name}</h3>
      <button className='btn' onClick={hotelDetails}>View Hotel</button>
    </div>
  )
}

export default FavCard