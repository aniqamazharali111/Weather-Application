import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWater } from '@fortawesome/free-solid-svg-icons';
import { faWind } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react'

const Weather = () => {
    const[data, setData] = useState({
        celcius : 10,
        name: "London",
        humidity : 10,
        speed : 2,
        image : "https://png.pngtree.com/png-clipart/20220810/ourmid/pngtree-cloud-and-sun-type-of-weather-png-image_6105935.png"
    })
    const[name, setName] = useState('');
const[error, setError] = useState('');

function handleClick(){
        if(name !== ""){
            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=16bfa98849718de13b6e8978b87d47b8`;
             axios.get(apiUrl)
            .then(res => {
                let imagePath = "";
if(res.data.weather[0].main == "Clouds"){
    imagePath = "https://png.pngtree.com/png-clipart/20220810/ourmid/pngtree-cloud-and-sun-type-of-weather-png-image_6105935.png"
}else if(res.data.weather[0].main == "Clear"){
    imagePath = "https://www.freeiconspng.com/thumbs/weather-icon-png/weather-icon-png-22.png"
}else if(res.data.weather[0].main == "Rain"){
    imagePath = "https://www.freeiconspng.com/thumbs/weather-icon-png/weather-icon-png-25.png"
}else if(res.data.weather[0].main == "snow"){
    imagePath = "https://static.vecteezy.com/system/resources/previews/019/061/863/original/snow-cloud-day-png.png"
}else if(res.data.weather[0].main == "Mist"){
    imagePath = "https://i.pinimg.com/originals/78/9a/f2/789af2bbcf3f3bf85bba9064c1ea2dac.jpg"
}else{
    imagePath = "https://png.pngtree.com/png-clipart/20220810/ourmid/pngtree-cloud-and-sun-type-of-weather-png-image_6105935.png"
}
                setData({
                    ...data, 
                    celcius: res.data.main.temp, 
                    name : res.data.name, 
                humidity : res.data.main.humidity, 
                speed : res.data.wind.speed,
                image : imagePath
               
                });
                setError('');
            })
                .catch(err => {
                    if(err.response.status == 404){
                        setError("Invalid city name")
                    }else{
                        setError('');
                    }
                    console.log(err)})
        }
    }
  return (
    <div className='container'>
        <div className='weather'>
            <div className='search'>
                <input type='text' placeholder='Enter City Name' onChange={e => setName(e.target.value)}></input>
                <button>
                    <img src = "https://cdn3.iconfinder.com/data/icons/feather-5/24/search-512.png" onClick={handleClick}></img>
                </button>
            </div>
            <div className='error'>
                <p>{error}</p>
            </div>
            <div className='winfo'>
                <img id = "cloud" src = {data.image}></img>
                <h1>{Math.round(data.celcius)}°c</h1>
                <h2>{data.name}</h2>
                <div className='details'>
                    <div className='col'>
                    <FontAwesomeIcon id = "hum" icon={faWater} />
                        <div className='humidity'>
                            <p>{Math.round(data.humidity)}%</p>
                            <p>Humidity</p>
                        </div>
                    </div>
                    <div className='col'>
                    <FontAwesomeIcon id = "wind" icon={faWind} />
                        <div className='windo'>
                            <p>{Math.round(data.speed)}km /h</p>
                            <p>wind</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      
    </div>
  )
}

export default Weather
