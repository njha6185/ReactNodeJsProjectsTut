import React from "react";
import { getGenres } from "../services/fakeGenreService";
import { getMovies } from "../services/fakeMovieService";
import Paginate from "../utils/paginate";
import ListGroup from "./common/listGroup";
import MoviesTable from "./common/movieTable";
import Pagination from "./common/pagination";
import _ from "lodash";
import { Link } from 'react-router-dom';
import SearchBox from './common/searchBox';

class Movies extends React.Component {
  state = {
    movies: [],
    pageSize: 3,
    currentPage: 1,
    generes: [],
    sortColumn: { path: "title", order: "asc" },
    searchQuery:"",
    selectedGenre:null
  };

  componentDidMount() {
    const generes = [{ _id: "", name: "All Movies" }, ...getGenres()];
    this.setState({ movies: getMovies(), generes });
  }
  handleDelete = (movie) => {
    //console.log(movie);
    // const movies = [...this.state.movies];
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    //console.log(movies);
    this.setState({ movies });
  };
  handleLiked = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };
  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleNext = (page) => {
    //console.log("Next Clicked",page);
    this.setState({ currentPage: page + 1 });
  };

  handlePrev = (page) => {
    //console.log("Prev Clicked",page);
    this.setState({ currentPage: page - 1 });
  };

  handleGenereSelect = (genere) => {
    this.setState({searchQuery:"", selectedGenre: genere, currentPage: 1 });
  };

  handleSort = (sortColumn) => {
    //console.log(path);
    this.setState({ sortColumn });
  };

  // handleNewMovieClick=()=>{    
  //   console.log("handle New Movie clicked");
  //   <Link to="/movies/new" />
  //   console.log("handle New Movie clicked2");
  // }

  handleSearch=query=>{
    this.setState({searchQuery:query, selectedGenre: null, currentPage: 1 });
  }


  getPageData = () => {
    const {
      currentPage,
      pageSize,
      searchQuery,
      movies: allMovies,
      selectedGenre,
      sortColumn,
    } = this.state;

    let filteredMovies =allMovies;
    if(searchQuery){
      filteredMovies=allMovies.filter(m=>
        m.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }
    else if(selectedGenre && selectedGenre._id){
      filteredMovies =
      selectedGenre && selectedGenre._id
        ? allMovies.filter((m) => {
            return m.genre._id === selectedGenre._id;
          })
        : allMovies;
    }

    const sortedMovies = _.orderBy(
      filteredMovies,
      [sortColumn.path],
      [sortColumn.order]
    );

    const movies = Paginate(sortedMovies, currentPage, pageSize);

    return { totalCount: filteredMovies.length, data: movies };
  };

  render() {
    const { length: count } = this.state.movies;
    const { generes, selectedGenre, sortColumn } = this.state;
    if (count === 0)
      return <p className="m-3">There are No Movies in Database</p>;

    const { totalCount, data } = this.getPageData();

    return (
      <div className="row">
        <div className="col-2 ms-5 mt-5">
          <ListGroup
            items={generes}
            onItemSelect={this.handleGenereSelect}
            selectedItem={selectedGenre}
          />
        </div>       

        <div className="col m-5">
          <Link to="/movies/new"
          className="btn btn-primary">New Movie</Link>
          
          <p className="m-1">There are {totalCount} Movies in Database</p>

          <SearchBox value={this.state.searchQuery} onChange={this.handleSearch} />

          <MoviesTable
            movies={data}
            onLike={this.handleLiked}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
            sortColumn={sortColumn}
          />

          <Pagination
            itemsCount={totalCount}
            pageSize={this.state.pageSize}
            currentPage={this.state.currentPage}
            onPageChange={this.handlePageChange}
            onPrevClick={this.handlePrev}
            onNextClick={this.handleNext}
          />
        </div>
        
      </div>
    );
  }
}

export default Movies;
