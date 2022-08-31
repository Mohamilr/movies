import React, { useState } from "react";
import MovieCard from "../MovieCard/MovieCard";
import Search from "../Search/Search";
import PreviewModal from "../PreviewModal/PreviewModal";
import "./Movies.css";

const Movies = () => {
  const [previewMovie, togglePreview] = useState(false);
  const [movies, setMovies] = useState([]);
  const [status, setStatus] = useState("");
  const [selectedMovie, setSelectedMovie] = useState({ movie: {}, index: 0 });

  const openPreviewModal = (selectedMovie) => {
    const index = movies.findIndex((movie) => movie === selectedMovie);
    setSelectedMovie({ movie: selectedMovie, index });
    togglePreview(true);
  };

  const handleNextMovie = (currentMovie) => {
    const index = movies.findIndex((movie) => movie === currentMovie);

    setSelectedMovie((prev) => ({
      movie: movies[index + 1],
      index: prev?.index + 1,
    }));
  };

  const handlePreviousMovie = (currentMovie) => {
    const index = movies.findIndex((movie) => movie === currentMovie);

    setSelectedMovie((prev) => ({
      movie: movies[index - 1],
      index: prev?.index - 1,
    }));
  };

  const renderBasedOnStatus = () => {
    switch (status) {
      case "searching":
        return <p className="status">Searching...</p>;
      case "data":
        return (
          <div className="movies">
            {movies?.map((movie, index) => (
              <MovieCard
                movie={movie}
                key={index}
                openPreviewModal={openPreviewModal}
              />
            ))}
          </div>
        );
      case "error":
        return <p className="status">An error occurred, kindly retry.</p>;
      case "too-many-results":
        return <p className="status">Be more specific on the movie name</p>;
      case "movie-not-found":
        return <p className="status">Oops.., couldn't find your movie</p>;
      default:
        return <p className="status">Search your favorite movies...</p>;
    }
  };

  return (
    <>
      <div className="movies__container">
        <Search movies={movies} setMovies={setMovies} setStatus={setStatus} />
        {renderBasedOnStatus()}
      </div>
      {previewMovie && (
        <PreviewModal
          toggle={togglePreview}
          setSelectedMovie={setSelectedMovie}
          data={selectedMovie}
          previousMovie={handlePreviousMovie}
          nextMovie={handleNextMovie}
          movies={movies}
        />
      )}
    </>
  );
};

export default Movies;
