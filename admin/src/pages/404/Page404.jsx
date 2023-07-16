import React, { useEffect } from 'react'
import "./Page404.scss"
import { useNavigate } from 'react-router';

const Page404 = () => {
  const navigate = useNavigate()
  const home = () => {
    navigate("/")
  }
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/Login");
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigate]);
  return (
    <div>
      <div className='page404Main'>
        <h1>4<span><i class="fas fa-ghost"></i></span>03</h1>
        <h2>Error: 403 page Forbidden</h2>
        <p>Sorry, the page you're looking for cannot be accessed</p>
        <button className='btn404' onClick={home}>Back To Home</button>
      </div>
    </div>
  )
}

export default Page404