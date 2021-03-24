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

const SingleCountry = ({country}) => (
  <>
    <h1>{country.name}</h1>
    <p>capital {country.capital}</p>
    <p>pupulation {country.population}</p>
    <h2>languages</h2>
    <ul>
      {country.languages.map((language) => <li key={language.iso639_1}>{language.name}</li>)}
    </ul>
    <img src={country.flag} alt="country flag" width="150px"/>
  </>
)

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
