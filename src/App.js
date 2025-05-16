import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {

  const [city, setCity] = useState('Delhi');
  const [weatherData, setweatherData] = useState(null);

  const currentDate = new Date();    //get the current date
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const month = months[currentDate.getMonth()];
  const day = currentDate.getDate();
  const year = currentDate.getFullYear();

  const formattedDate = `${month} ${day} , ${year}`   //template literal as in backtick

  const API_KEY = 'ee52587c2fc34b5fc7a0f49a57708cc2';
  const fetchWeatherData = async () => {
    try {

      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
      const data = await response.json();
      console.log(data);
      setweatherData(data);
    }
    catch (error) {
      console.log(error);

    }
  }

  useEffect(() => {
    fetchWeatherData();
  }, [])

  const handleInputChange = (event) => {
    console.log(event.target.value);
    setCity(event.target.value);

  }

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchWeatherData();
  }

  const getWeatherIconUrl =(main)=>{
    switch(main){
      case "Clouds":
        return "/thunder.png";
      case "Rain":
        return "/rain_with_cloud.png";
      case "Mist":
        return "/Tornado.png";
      case "Haze":
        return "/sun.png";
      default:
        return "/partly-cloud.png";
    }
  };

  return (
    <div className="App">
      <div className="container">
        {weatherData && (
          <>
            <h1 className='container_date'>
              {formattedDate}
            </h1>
            <div className='weather_data'>
              <h2 className='container_city'>{weatherData.name}</h2>
              <img className='container_img' src={getWeatherIconUrl(weatherData.weather[0].main)} width="180px" alt="Weather Icon" onError={(e) => {
    e.target.onerror = null; // prevents looping
    e.target.src = "/partly-cloud.png"; // fallback image
  }}></img>
              <h2 className='container_degree'>{weatherData.main.temp}°C</h2>
              <h2 className='country_per'>{weatherData.weather[0].main}</h2>
              <form className='form' onSubmit={handleSubmit}>
                <input type="text" className='input' placeholder='Enter city name' onChange={handleInputChange}>
                </input>

                <button type='submit'>GET</button>
              </form>
            </div>
          </>
        )}

      </div>
    </div>
  );
}

export default App;
