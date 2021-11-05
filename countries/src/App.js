import React, { useState, useEffect } from "react";
import axios from "axios";

const Countries = ({ filteredCountries }) => {
  if (filteredCountries.length <= 10) {
    return filteredCountries.map((country, id) => (
      <p key={id}>{country.name.common}</p>
    ));
  } else if (filteredCountries === 1) {
    return filteredCountries.map((country, id) => (
      <p key={id}>{country.name.common}</p>
    ));
  } else if (filteredCountries.length === 0) {
    return null;
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
