import React from 'react';
import '../App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit,faTrash } from '@fortawesome/free-solid-svg-icons';
import {API} from '../api-service';
function MovieList(props) {
    const movieClicked = movie => evt=> {
        props.movieClicked(movie)
    }
    const editClicked = movie => {
      props.editClicked(movie)
    }

    const removeClicked = movie => {
      API.deleteMovie(movie.id)
      props.removeClicked(movie)
    }
    return (
        <div className="card">
          <div className="card-header text-center bg-info text-light">Movie List</div>
            <div className="list-group">
          {props.movies && props.movies.map(movie => {
            return (
              <div className="text-muted  list-group-item " key={movie.id}>
                <div className="form-inline">
                <h6 onClick={movieClicked(movie)}>{movie.title} </h6>
                <span className="ml-auto">
                <FontAwesomeIcon className="ml-2 text-primary " icon={faEdit} onClick={() => editClicked(movie)}/>
                <FontAwesomeIcon className="ml-2 text-danger " icon={faTrash} onClick={() => removeClicked(movie)} />
                </span>
                </div>
              </div>
            ) 
           })
          }
          </div>
        </div>
    );
}

export default MovieList;