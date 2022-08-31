import React, { useEffect, useState } from "react";
import Movies from "../components/Movies/Movies";
import { startCounting } from "../utils/helper";
import "./MoviePage.css";

const MoviePage = ({}) => {
  const [timeSpent, setTimeSpent] = useState(0);

  useEffect(() => {
    startCounting(setTimeSpent);
  }, []);

  return (
    <main>
      <span className="time__spent">Time spent: {timeSpent} mins</span>
      <Movies />
    </main>
  );
};

export default MoviePage;
