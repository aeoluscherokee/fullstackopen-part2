import React, { useState, useEffect } from "react";
import axios from "axios";

const Country = ({ country }) => {
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>capital {country.capital.map((el) => el)}</p>
      <p>{country.population}</p>
      <h2>language</h2>
      <ul>
        {Object.values(country.languages).map((value, index) => (
          <li key={index}>{value}</li>
        ))}
      </ul>
      <img alt="flag" src={country.flags.png}></img>
    </div>
  );
};

const ShowCountries = ({ country }) => {
  const [isShow, setIsShow] = useState(false);
  const handleOnClick = () => {
    setIsShow(!isShow);
  };
  if (isShow) {
    return (
      <div>
        <Country country={country} />
        <button onClick={handleOnClick}>show</button>
      </div>
    );
  } else {
    return (
      <p>
        {country.name.common} <button onClick={handleOnClick}>show</button>
      </p>
    );
  }
};

const Countries = ({ filteredCountries }) => {
  if (filteredCountries.length === 1) {
    return <Country country={filteredCountries[0]} />;
  } else if (filteredCountries.length === 0) {
    return null;
  } else if (filteredCountries.length <= 10) {
    return filteredCountries.map((country, id) => (
      <ShowCountries key={id} country={country} />
    ));
  } else {
    return <p>"Too many matches, specify another filter</p>;
  }
};

function App() {
  const [allCountries, setAllCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((response) => setAllCountries(response.data));
  }, []);
  const handleOnSearchChange = (event) => {
    event.preventDefault();
    setFilteredCountries(
      allCountries.filter((country) =>
        country.name.common
          .toLowerCase()
          .includes(event.target.value.toLowerCase())
      )
    );
  };

  return (
    <div>
      <div>
        find countries <input onChange={handleOnSearchChange} />
        <div>
          <Countries filteredCountries={filteredCountries} />
        </div>
      </div>
    </div>
  );
}

export default App;
