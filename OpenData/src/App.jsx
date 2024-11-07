import React, { useState, useEffect } from 'react';
import axios from 'axios'; 

const Cocktail = () => {
  const [cocktail, setCocktail] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResult, setSearchResult] = useState(null);


  useEffect(() => {
    axios.get('https://www.thecocktaildb.com/api/json/v1/1/random.php')
      .then(response => {
        setCocktail(response.data.drinks[0]);
      })
      .catch(error => {
        console.error('Error fetching the cocktail:', error);
      });
  }, []);


  const handleSearch = () => {
    axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchTerm}`)
      .then(response => {
        setSearchResult(response.data.drinks);
      })
      .catch(error => {
        console.error('Error fetching the search result:', error);
      });
  };

  return (
    <div>
      <h1>Cocktail of the Day</h1>
      {cocktail && (
        <div>
          <h2>{cocktail.strDrink}</h2>
          <p><strong>Glass:</strong> {cocktail.strGlass}</p>
          <p><strong>Instructions:</strong> {cocktail.strInstructions}</p>
          <ul>
            {Object.keys(cocktail)
              .filter(key => key.startsWith('strIngredient') && cocktail[key])
              .map((key, index) => (
                <li key={index}>{cocktail[key]}</li>
              ))}
          </ul>
        </div>
      )}

      <div>
        <h2>Search for a Drink</h2>
        <input
          type="text"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          placeholder="Search by name"
        />
        <button onClick={handleSearch}>Search</button>

        {searchResult && (
          <div>
            {searchResult.map((drink, index) => (
              <div key={index}>
                <h3>{drink.strDrink}</h3>
                <p><strong>Glass:</strong> {drink.strGlass}</p>
                <p><strong>Instructions:</strong> {drink.strInstructions}</p>
                <ul>
                  {Object.keys(drink)
                    .filter(key => key.startsWith('strIngredient') && drink[key])
                    .map((key, idx) => (
                      <li key={idx}>{drink[key]}</li>
                    ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Cocktail;