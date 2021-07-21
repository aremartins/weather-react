import React, { useState, useEffect } from 'react'
import './App.css'
import { api } from "./services/weather-api"
import { FaTemperatureHigh, FaWind } from 'react-icons/fa'

function App() {
  
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("");
  const [search, setSearch] = useState(undefined);
  useEffect(() => {
    if(search === undefined){
      setSearch(localStorage.getItem('search') || "");
      } else {
      localStorage.setItem('search', search);
      console.log('search')
      }
    }, [search]);


    async function handleGetWeather(event) {
      event.preventDefault()
      const response = await api.get(search);
      setCity(search)

      console.log(response.data);
      setWeather(response.data);
      useEffect(() => {
        if(response.data === undefined){
          setWeather(localStorage.getItem(response.data) || "");
          } else {
          localStorage.setWeather(response.data);
          console.log(response.data)
          }
        }, [response.data]);
    }  

    useEffect(() => {
      //handleGetWeather();
    }, [])

  return (
    <div className="App">  

      {/* <h1>{"hello word".toUpperCase()}</h1> */}

       <header>
       <form onSubmit={handleGetWeather}>
         <label htmlFor="city">Vamos ver como está o tempo hoje?</label>
          {/* <input type="text" value={search} 
          onChange={(event) => setSearch(event.target.value)}/> */}
          <input className='search-city' type='text' onChange={(event) => setSearch(event.target.value)} value={search} />

          <button>Pesquisar</button>
        </form>
      </header> 

    {weather &&
      <main>
      {/* <p>{JSON.stringify(weather)}</p> */}

      <h1>{city}</h1>

      <section className="current-weather">

        <h2>Current weather</h2>

        <p>{weather.temperature}</p>
        <p>{weather.description}</p>

      </section>

      <section className="forecast">
        <h2>Forecast</h2>

        <ol>
        {
          weather.forecast.map(day =>
            <li>
              <div>
                <FaTemperatureHigh />
                <p>{day.temperature}</p>
              </div>

              <div>
                <FaWind />
                <p>{day.wind}</p>
              </div>
            </li>
            )
        }
        </ol>
      </section>
      </main>
}
    </div>
  )
}

export default App
