import React, {useState, useEffect} from 'react';
import axios from 'axios';

const Finder = ({inputValue, handler}) => {
  const handleInput = (event) =>{
    handler(event.target.value.toLowerCase());
  }
  return (
    <div>
      find countries: <input type="text" value={inputValue} onChange={handleInput}/>
    </div>
  )
}

const SingleCountry = ({country}) => {
  const [weather, setWeather] = useState({});

  useEffect(() => {
    const api_key = process.env.REACT_APP_API_KEY;
    async function fetchMyAPI() {
      try {
        const URL = `https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${api_key}`;
        const response = await axios.get(URL);
        setWeather(response.data);
      } catch (e) {
        console.log(e)
      }
    }

    fetchMyAPI();
  }, [country.capital]);

  const temperatureInC = `${(weather?.main?.temp - 273.15).toFixed(1)}C`;

  return (
  <>
    <h1>{country.name}</h1>
    <p>capital {country.capital}</p>
    <p>pupulation {country.population}</p>
    <h2>languages</h2>
    <ul>
      {country.languages.map((language) => <li key={language.iso639_1}>{language.name}</li>)}
    </ul>
    <img src={country.flag} alt="country flag" width="150px"/>
    <h2>Weather in {country.capital}</h2>
    <p>temperature: {temperatureInC}</p>
    <p>wind: {weather?.wind?.speed}m/s</p>
  </>
  )
}

const SingleCountryInList = ({ country }) => {
  const [showDetails, setShowDetails] = useState(false);

  const handler = () => setShowDetails(!showDetails);
  return (
    <>
    {country.name} <button onClick={handler}>{showDetails ? 'Hide' : 'Show'}</button>
    {showDetails && <SingleCountry country={country} />}
    </>
  )

}

const CountriesList = ({countries}) => {
  const list = countries.map((country) => (
    <li key={country.alpha2Code}>
      <SingleCountryInList country={country} />
    </li>
  ))

  return (
    <ul>
      {list} 
    </ul>
  )
}

const Countries = ({ countries }) => {
  if (countries.length === 1) {
    return <SingleCountry country={countries[0]} />
  }

  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>
  } else if (countries.length > 1) {
    return <CountriesList countries={countries} />
  }
}

function App() {
  const [initialData, setInitialData] = useState([]);
  const [inputValue, setInputValue] = useState([]);

  useEffect(() => {
    async function fetchMyAPI() {
      try {
        const response = await axios.get('https://restcountries.eu/rest/v2/all');
        setInitialData(response.data);
      } catch (e) {
        console.log(e)
      }
    }

    fetchMyAPI();
  }, []);

  const countries = initialData.filter((country) => country.name.toLowerCase().includes(inputValue));
  return (
    <>
      <Finder inputValue={inputValue} handler={setInputValue}/>
      {
      countries.length 
      ? <Countries countries={countries} />
      : <p>Waiting for response or there is no such country</p>
      }
    </>
    
  );
}

export default App;
