import { useState, useEffect } from 'react';

const GetCity = () => {
    const [state, setstate] = useState(null);

    useEffect(() => {

        navigator.permissions.query({ name: 'geolocation' }).then(permission => {
            setstate(permission.state);
          });
        if(state === "granted"){
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords;
                fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?types=place&access_token=pk.eyJ1IjoiYW50ZXJtYW4iLCJhIjoiY2xnbjNoZ3c1MGJ3azNmb2V6cHcyZW44dyJ9.3ZVPifDWiDq0SQj2jPs85w`)
                    .then(response => response.json())
                    .then(data => {
                        localStorage.setItem("userCity",data.features[0].place_name.split(',')[0])
                    })
                    .catch(error => console.error(error));
            });
        }else{
            localStorage.setItem("userCity","london")
        }

       
    }, [state]);
}

export default GetCity