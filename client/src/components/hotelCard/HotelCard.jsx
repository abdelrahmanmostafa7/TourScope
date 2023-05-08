import { useNavigate } from "react-router-dom";
import './HotelCard.scss'
import { Checkbox } from '@mui/material';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
// import newRequest from '../../utils/newRequest';

const HotelCard = ({ item}) => {
  const navigate = useNavigate()
  const hotelDetails = () => {
    navigate(`/hotels/${item._id}`)
    window.location.reload();
  }
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

  // const handleButton = async () => {
  //   try {
  //     await newRequest.put(`/user/addOrRemove/${id}`, { hotelId })
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  return (
    <div className='hotelCard'>
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
        />
      </div>
      <img src={item.images} alt="" className='hotelCardImg' />
      <p className='hotelCardDetails'>{item.country} - {item.city} || {item.distanceFromCityCenter}Km from center</p>
      <h3 className='hotelCardName'>{item.name}</h3>
      <button className='btn' onClick={hotelDetails}>View Hotel</button>
    </div>
  )
}

export default HotelCard