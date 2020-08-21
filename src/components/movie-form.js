import React,{useState} from 'react';
import {API} from '../api-service';

function MovieForm(props) {
    const mov = props.movie
    const [title,setTitle] = useState(mov.title)
    const [description,setDescription] = useState(mov.description)
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
              <div>
                    <label htmlFor="title">Title</label><br/>
                    <input type="text" onChange={evt =>setTitle(evt.target.value)} id="title" placeholder="title" value={title} /><br/>

                    <label htmlFor="description">Description</label><br/>
                    <textarea id="description" onChange={evt =>setDescription(evt.target.value)} placeholder="description" value={description}></textarea><br/>
                  { mov.id ? 
                    <input type="submit" onClick={UpdateClicked} value="Update" />
                    :
                    <input type="submit" onClick={CreateClicked} value="Create" />
                  }  
              </div>
            ) : null}
        </React.Fragment>
    );
}

export default MovieForm;