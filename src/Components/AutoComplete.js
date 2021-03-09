import React, { useState, useEffect } from "react";
import Button from "./Button";
import Movie from "./Movie";
import Debauncing from "./Debauncing";
import loader from "../Images/loader.gif";
import "../style.css";

const API_KEY = "9ab6cff51272cfe76cec277c70548d49";

function AutoComplete() {
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const debauncedSearch = Debauncing(keyword, 300);

  const getMovies = (keyword) => {
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${keyword}`
    )
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        setIsSearching(false);
        setResults(response.results.slice(0, 8));
      });
  };

  const handleCardClick = (movieData) => {
    setInputValue(movieData.original_title);
    setResults([]);
  };

  useEffect(() => {
    if (debauncedSearch && debauncedSearch.length >= 3) {
      setIsSearching(true);
      getMovies(debauncedSearch);
    } else {
      setResults([]);
    }
  }, [debauncedSearch]);

  return (
    <div className="wrapperDiv">
      <div className="searchBar">
        <input
          value={inputValue}
          type="text"
          name="query"
          placeholder="Enter movie name"
          onChange={(e) => {
            setInputValue(e.target.value);
            setKeyword(e.target.value);
          }}
        />
        <Button />
      </div>

      <div className="movies">
        {isSearching && (
          <img className="loaderStyle" src={loader} alt="loading.." />
        )}
        {results.map((item) => (
          <Movie key={item.id} handleCardClick={handleCardClick} item={item} />
        ))}
      </div>
    </div>
  );
}

export default AutoComplete;
