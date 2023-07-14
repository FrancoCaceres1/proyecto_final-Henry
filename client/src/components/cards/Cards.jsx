import { useState, useEffect } from "react";
import axios from "axios";
import Card from "./../card/Card";

function Cards() {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/countries") 
      .then((response) => {
        setCountries(response.data); 
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      {countries.map((country) => (
        <Card key={country.id} country={country} />
      ))}
    </div>
  );
}

export default Cards;