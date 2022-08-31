import React, { useRef } from "react";
import ReactDOM from "react-dom";
import MovieCard from "../MovieCard/MovieCard";
import "./PreviewModal.css";

const PreviewModal = ({
  toggle,
  setSelectedMovie,
  data,
  previousMovie,
  nextMovie,
  movies,
}) => {
  const { movie, index } = data;
  const parentModal = useRef();

  window.onclick = function (event) {
    if (event.target === parentModal?.current) {
      closeModal();
    }
  };

  const closeModal = () => {
    setSelectedMovie((prev) => ({ ...prev, index: 0 }));
    toggle(false);
  };

  const modal = (
    <div className="modal__container" ref={parentModal}>
      <div className="modal__inner__group">
        <div className="modal__body">
          <div className="close__modal" onClick={closeModal}>
            X
          </div>
          <MovieCard movie={movie} preview={true} />
          <div className="modal__content">
            {index !== 0 && (
              <span onClick={() => previousMovie(movie)}>Prev</span>
            )}
            {movies?.length - 1 !== index && (
              <span onClick={() => nextMovie(movie)}>Next</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(modal, document.body);
};

export default PreviewModal;
