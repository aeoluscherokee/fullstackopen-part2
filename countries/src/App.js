import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [allCountries, setAllCountries] = useState([]);
  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((response) => setAllCountries(response.data));
  }, []);
  console.log(allCountries);
  return (
    <div>
      <div>
        find countries <input />
        <div>
          {allCountries.map((country) => (
            <p>{country.name.common}</p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
