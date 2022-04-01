import Joi from "joi-browser";
import React from "react";
import { getGenres } from "../services/fakeGenreService";
import { getMovie, saveMovie } from "../services/fakeMovieService";
import Form from "./common/form";

class NewMovies extends Form {
  state={
    data:{
      title:"", genreId:"", numberInStock:"", dailyRentalRate:""
    },
    genres:[],
    errors:{}
  };

  schema = {
    _id : Joi.string(),
    title: Joi.string().required().label("Title"),
    genreId: Joi.string().required().label("Genre"),
    numberInStock: Joi.number().required().min(0).max(100).label("No in Stock"),
    dailyRentalRate: Joi.number().required().min(0).max(10).label("Daily Rental Rate"),
  };

componentDidMount(){
  const genres =getGenres();
  this.setState({genres});

  //console.log(genres);
  //const { movieId } = this.props.match.params;
   const movieId=this.props.match.params.movieID;
   if(movieId==="new") return;

  const movie=getMovie(movieId);
  if(!movie) return this.props.history.replace("/notFound");

  this.setState({data:this.mapToViewModel(movie)});
}

mapToViewModel(movie){
  return {
    _id: movie._id,
    title:movie.title,
    genreId:movie.genre._id,
    numberInStock:movie.numberInStock,
    dailyRentalRate:movie.dailyRentalRate
  }
}

doSubmit=()=>{
  //it is called in handleChange FUNCTION IN fORM
  saveMovie(this.state.data);
  this.props.history.push("/movies");
}

  render() {  
    return (
      <div className="row mt-5">
        <div className="col-3"></div>
        <div className="col-6">
          <h1 className="m-2">Movie Form</h1>
          <form onSubmit={this.handleSubmit}> {/*handleSubmit is defined in Form class*/}
            {this.renderInput("title", "Title")}
            {this.renderSelect("genreId", "Genre", this.state.genres)}
            {this.renderInput("numberInStock", "No in Stock", "number")}
            {this.renderInput("dailyRentalRate", "Daily Rental Rate")}
            {this.renderButton("Save")}
          </form>
        </div>
        <div className="col-3"></div>
      </div>
    );
  }
}

export default NewMovies;
