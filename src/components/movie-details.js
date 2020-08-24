import React, { useState } from 'react';
import '../App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

function MovieDetails(props) {
    
    const [highlighted,setHighlighted] = useState(-1)
    //const [mov,SetMovie] = useState(props.movie)
    const mov = props.movie
    const highLightRate = high => evt => {
        setHighlighted(high)
    }

    const rateClicked = rate => evt => {
        fetch(`http://127.0.0.1:8000/api/movie/${mov.id}/rate_movie/` ,{
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Token 43b65cf72f727f44867acc504a733cfee1692f94'
        },
        body: JSON.stringify({stars:rate+1})
    })
    .then(resp => getdetails(resp))
    .catch(error => console.log())
    }

    const getdetails = () => {
        fetch(`http://127.0.0.1:8000/api/movie/${mov.id}/` ,{
        method: "Get",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Token 43b65cf72f727f44867acc504a733cfee1692f94'
        },
    })
    .then(resp => resp.json())
    .then(resp => props.updateDetails(resp))
    .catch(error => console.log())
    }
    return (
        <React.Fragment>
            {mov ? (
            <div className="card">
                <div className="card-header text-center bg-info text-light">Movie Detils</div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-lg-6">
                            <h5 className="text-muted">{mov.title}</h5>
                            <p className="text-muted">{mov.description}</p> 
                            <p className="text-muted">{mov.no_of_rating}</p> 
                            <FontAwesomeIcon icon={faStar} className={mov.avg_rating > 0 ? 'orange':'empty'} />
                            <FontAwesomeIcon icon={faStar} className={mov.avg_rating > 1 ? 'orange':'empty'} />
                            <FontAwesomeIcon icon={faStar} className={mov.avg_rating > 2 ? 'orange':'empty'} />
                            <FontAwesomeIcon icon={faStar} className={mov.avg_rating > 3 ? 'orange':'empty'} />
                            <FontAwesomeIcon icon={faStar} className={mov.avg_rating > 4 ? 'orange':'empty'} />
                        </div>
                        <div className="col-lg-6">
                            <h5 className="text-muted">Rate it</h5>
                            {
                                [...Array(5)].map((e,i)=> {
                                    return <FontAwesomeIcon key={i} icon={faStar} className={highlighted > i-1 ? 'purple':'empty'} 
                                    onMouseEnter={highLightRate(i)}
                                    onMouseLeave={highLightRate(-1)}
                                    onClick={rateClicked(i)}/>
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
            ) : null}
        </React.Fragment>
    );
}

export default MovieDetails;