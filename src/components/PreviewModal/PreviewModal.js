import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import MovieCard from "../MovieCard/MovieCard";
import API from "../../API/axios";
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
  const [singleMovie, setSingleMovie] = useState({});
  const [status, setStatus] = useState("");
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

  const getMovie = async (httpRequest) => {
    try {
      setStatus("fetching");
      const res = await API.get(`type=movie&i=${movie?.imdbID}`, {
        signal: httpRequest?.signal,
      });
      setStatus("data");
      setSingleMovie(res?.data);
    } catch (err) {
      setStatus("error");
    }
  };

  useEffect(() => {
    const httpRequest = new AbortController();

    getMovie(httpRequest);

    return () => {
      httpRequest.abort();
    };
    //eslint-disable-next-line
  }, [movie]);

  const renderBasedOnStatus = () => {
    switch (status) {
      case "fetching":
        return <p className="status">Fetching...</p>;
      case "data":
        return (
          <>
            <MovieCard movie={singleMovie} preview={true} />
            <div className="modal__content">
              {index !== 0 && (
                <span onClick={() => previousMovie(movie)}>Prev</span>
              )}
              {movies?.length - 1 !== index && (
                <span onClick={() => nextMovie(movie)}>Next</span>
              )}
            </div>
          </>
        );
      case "error":
        return (
          <p className="status error" onClick={getMovie}>
            Error occurred, try again
          </p>
        );
    }
  };
  const modal = (
    <div className="modal__container" ref={parentModal}>
      <div className="modal__inner__group">
        <div className="modal__body">
          <div className="close__modal" onClick={closeModal}>
            X
          </div>
          {renderBasedOnStatus()}
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(modal, document.body);
};

export default PreviewModal;
