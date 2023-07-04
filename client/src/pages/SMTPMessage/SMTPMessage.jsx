// import React from 'react'
import React, { useState } from 'react';
const SMTPMessage = () => {
  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: '#f0f0f0' }}>
  <div style={{ width: '700px', backgroundColor: '#fff', borderRadius: '15px', padding: '20px' }}>
    <h1 style={{ marginBottom: '20px' }}>TourScope - Hotel Reservation Confirmation</h1>
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <img src="https://ci5.googleusercontent.com/proxy/vdEgS_WNFfW7Fpef0r7UYyt8cyDq5UKeUOZmzlMcqTLpWfXYqqWii1ICTjUJkEhqcGHGLgmf2dNY6yCoNWcvC1nW0GamSFrD5gT1Wu7sjF5vPhit9dmW2qwWOodztNGZgaW1RTarNOCqirSWN5tuBj4vjE-6wOZD7AfuzK-8hM1UDbJuRSpbJkO4IkS1BoKENaQujvbxNQFjSpTMnOx4IglU=s0-d-e1-ft#https://cf.bstatic.com/xdata/images/hotel/max1024x768/346064631.jpg?k=640327174b46e384db949549c08a6d4f506381ee8e71b6d12c7aa9fc069c9196&o=&hp=1" alt="Hotel Image" style={{ width: '400px', height: '250px', borderRadius: '15px' }} />
    </div>
    <h2 style={{ marginBottom: '10px', textAlign: 'center' }}>Pyramid Stars Inn</h2>
    <div style={{ marginTop: '20px' }}>
      <h2 style={{ marginBottom: '-10px' }}>Stay Date</h2>
      <ul>
        <li>
          <p style={{ marginLeft: '30px' }}>Jul 26, 2023 - Jul 28, 2023</p>
        </li>
      </ul>
    </div>
    <div style={{ marginTop: '20px' }}>
      <h2 style={{ marginBottom: '-10px' }}>Payment</h2>
      <ul>
        <li>
          <p style={{ marginLeft: '30px' }}>1x Family Studio</p>
        </li>
        <li>
          <p style={{ marginLeft: '30px' }}>Total Price: 1314 EGP</p>
        </li>
      </ul>
    </div>
  </div>
</div>

  );
};

export default SMTPMessage