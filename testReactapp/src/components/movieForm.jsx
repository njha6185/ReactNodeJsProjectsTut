import React from "react";
import { useNavigate,useParams } from "react-router-dom";

function MovieForm() {
  let { movieID } = useParams();
  let navigate = useNavigate();
  function handleClick() {
      //console.log("clicked back");
    navigate("/movies");
  }
  return (
    <div>
      <h1>MovieForm :== Movie ID: {movieID}</h1>
      <button className="btn btn-primary" onClick={() => handleClick()}>
        Back
      </button>
    </div>
  );
}

export default MovieForm;
