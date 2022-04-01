import React from "react";
import { Link } from "react-router-dom";
import Like from "./like";
import Table from "./table";

class MoviesTable extends React.Component {
  columns = [
    { path: "title", label: "Title" ,
    content: movie=><Link to={`/movies/${movie._id}`}>{movie.title}</Link>},
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Price" },
    {
      key: "like",
      content: (movie) => (
        <Like onClick={() => this.props.onLike(movie)} liked={movie.liked} />
      ),
    },
    {
      key: "delete",
      content: (movie) => (
        <button
          onClick={() => this.props.onDelete(movie)}
          className="btn btn-danger sm-2"
        >
          Delete
        </button>
      ),
    },
  ];

  render() {
    const { movies, onSort, sortColumn } = this.props;
    return (
      <div>
        <Table
          columns={this.columns}
          sortColumn={sortColumn}
          onSort={onSort}
          data={movies}
        />
      </div>
    );
  }
}

export default MoviesTable;
