import React,{useState, useEffect} from 'react';
import '../App.css';
import {API} from '../api-service';

function MovieForm(props) {
    const mov = props.movie
    const [title,setTitle] = useState('')
    const [description,setDescription] = useState('')
    useEffect(() => {
      setTitle(mov.title)
      setDescription(mov.description)
    },[mov]
    )

    const UpdateClicked= () => {
      API.updateMovie(mov.id,{title,description})
      .then(resp => props.updateMovie(resp))
      .catch(resp => console.log(resp))
    }
    const CreateClicked= () => {
      API.createMovie({title,description})
      .then(resp => props.createMovie(resp))
      .catch(resp => console.log(resp))
    }

    return (
        <React.Fragment>
            {mov ? (
              <div className="card">
                { mov.id ?
                <div className="card-header text-center bg-info text-light">Movie Update</div>
                :
                <div className="card-header text-center bg-info text-light">Movie Insert</div>
                }
                <div className="card-body">
                    <label htmlFor="title">Title</label><br/>
                    <input type="text" className="form-control" onChange={evt =>setTitle(evt.target.value)} id="title" placeholder="title" value={title} /><br/>

                    <label htmlFor="description">Description</label><br/>
                    <textarea id="description" className="form-control" onChange={evt =>setDescription(evt.target.value)} placeholder="description" value={description}></textarea><br/>
                  { mov.id ? 
                    <input type="submit" className="btn btn-primary btn-block" onClick={UpdateClicked} value="Update" />
                    :
                    <input type="submit" className="btn btn-primary btn-block" onClick={CreateClicked} value="Create" />
                  }  
              </div>
                </div>

            ) : null}
        </React.Fragment>
    );
}

export default MovieForm;