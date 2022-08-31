import React, { useMemo } from "react";
import { debounce } from "lodash";
import API from "../../API/axios";
import { statusEnum } from "../../enums/status";
import "./Search.css";

const { TOO__MANY__RESULTS, MOVIE__NOT__FOUND } = statusEnum;

const Search = ({ movies, setMovies, setStatus }) => {
  const searchMovies = async (searchKey) => {
    try {
      movies?.length === 0 && setStatus("searching");

      const res = await API.get(`type=movie&s=${searchKey}&page=1`);

      if (res?.data?.Response === "True") {
        setStatus("data");
        setMovies(res?.data?.Search);
      } else {
        switch (res?.data?.Error) {
          case TOO__MANY__RESULTS:
            setStatus("too-many-results");
            break;
          case MOVIE__NOT__FOUND:
            setStatus("movie-not-found");
            break;
        }
      }
    } catch (err) {
      setStatus("error");
      setMovies([]);
    }
  };

  const debouncedSearch = useMemo(
    () => debounce((value) => searchMovies(value), 500),
    //eslint-disable-next-line
    []
  );

  const handleSearch = (value) => {
    if (value) debouncedSearch(value);
    else {
      setStatus("");
      setMovies([]);
      debouncedSearch.cancel();
    }
  };

  return (
    <div className="search__container">
      <input
        type="search"
        className="search"
        onChange={(e) => handleSearch(e.target.value)}
      />
    </div>
  );
};

export default Search;
