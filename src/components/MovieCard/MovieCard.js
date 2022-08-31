import React from "react";
import "./MovieCard.css";

const fallbackImg =
  "https://res.cloudinary.com/project-s/image/upload/v1661973297/movie_wgn4f8.jpg";

const MovieCard = ({ movie, openPreviewModal, preview }) => {
  const { Title, Poster, Type, Year } = movie || {};

  return (
    <div
      className={`movie__card ${preview ? `disabled` : ``}`}
      onClick={() => openPreviewModal(movie)}
    >
      <img src={Poster !== "N/A" ? Poster : fallbackImg} alt="movie poster" />
      <h2>{Title}</h2>
      <div className="movie--meta__data">
        <span>{Type}</span>
        <span>{Year}</span>
      </div>
    </div>
  );
};

export default MovieCard;
