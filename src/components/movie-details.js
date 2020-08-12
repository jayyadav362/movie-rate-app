import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

function MovieDetails(props) {
    
    return (
        <div>
            <p>Movie Details</p>
            { props.movie ? (
                <div>
            <h5>{props.movie.title}</h5>
            <p>{props.movie.description}</p> 
            <p>{props.movie.no_of_rating}</p> 
            <FontAwesomeIcon icon={faStar} className={props.movie.avg_rating > 0 ? 'orange':''} />
            <FontAwesomeIcon icon={faStar} className={props.movie.avg_rating > 1 ? 'orange':''} />
            <FontAwesomeIcon icon={faStar} className={props.movie.avg_rating > 2 ? 'orange':''} />
            <FontAwesomeIcon icon={faStar} className={props.movie.avg_rating > 3 ? 'orange':''} />
            <FontAwesomeIcon icon={faStar} className={props.movie.avg_rating > 4 ? 'orange':''} />
            </div>
            ) : null }
        </div>
    );
}

export default MovieDetails;