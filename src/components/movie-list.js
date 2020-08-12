import React from 'react';

function MovieList(props) {
    const movieClicked = movie => evt=> {
        props.movieClicked(movie)
    }
    return (
        <div>
            <p>Movie List</p>
          {props.movies && props.movies.map(movie => {
            return (
              <div key={movie.id}>
                <h4 onClick={movieClicked(movie)}>{movie.title} </h4>
              </div>
            ) 
           })
          }
        </div>
        
    );
}

export default MovieList;