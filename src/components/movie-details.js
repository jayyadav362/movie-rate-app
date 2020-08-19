import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

function MovieDetails(props) {
    
    const [highlighted,setHighlighted] = useState(-1)
    //const [mov,SetMovie] = useState(props.movie)
    const mov = props.movie;
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
            { mov ? (
            <div>
                <h5>{mov.title}</h5>
                <p>{mov.description}</p> 
                <p>{mov.no_of_rating}</p> 
                <FontAwesomeIcon icon={faStar} className={mov.avg_rating > 0 ? 'orange':''} />
                <FontAwesomeIcon icon={faStar} className={mov.avg_rating > 1 ? 'orange':''} />
                <FontAwesomeIcon icon={faStar} className={mov.avg_rating > 2 ? 'orange':''} />
                <FontAwesomeIcon icon={faStar} className={mov.avg_rating > 3 ? 'orange':''} />
                <FontAwesomeIcon icon={faStar} className={mov.avg_rating > 4 ? 'orange':''} />
                <div className="rating-box">
                <h4>Rate it</h4>
                {
                    [...Array(5)].map((e,i)=> {
                        return <FontAwesomeIcon key={i} icon={faStar} className={highlighted > i-1 ? 'purple':''} 
                        onMouseEnter={highLightRate(i)}
                        onMouseLeave={highLightRate(-1)}
                        onClick={rateClicked(i)}/>
                    })
                }
                </div>
            </div>
         ) : null }
        </React.Fragment>
    );
}

export default MovieDetails;