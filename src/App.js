import React, {useState,useEffect} from 'react';
import './App.css';
import MovieList from './components/movie-list';
import MovieDetails from './components/movie-details';
import MovieForm from './components/movie-form';

function App() {

    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState([null]);
    const [editedMovie , setEditedMovie] = useState(null)

    useEffect(() => {
      fetch("http://127.0.0.1:8000/api/movie/" ,{
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Token 43b65cf72f727f44867acc504a733cfee1692f94'
        }
    })
    .then(resp => resp.json())
    .then(resp => setMovies(resp))
    .catch(error => console.log())
    },[])
 
  const loadMovie = movie => {
    setSelectedMovie(movie)
    updateMovie(movie)
    setEditedMovie(null)
  }

  const editClicked= movie => {
    setEditedMovie(movie)
    setSelectedMovie(null)
  }

  const updateMovie = movie => {
    const newMovie = movies.map(mov => {
      if(mov.id === movie.id) {
        return movie;
      }
      return mov;
    })
    setMovies(newMovie);
  }

  const addMovie = movie => {
    setEditedMovie({title: '',description: ''})
    setSelectedMovie(null)
    console.log('click')

  }

  const createMovie = movie => {
    const newMov = [...movies,movie]
    setMovies(newMov);
  }

  return (
    <div className="App">
      <div className="App-content">
        <div>
        <MovieList movies={movies} movieClicked={loadMovie} editClicked ={editClicked}/>
        <br/>
        <button type="button" onClick={addMovie}>Add Movie</button>
        </div>
        <MovieDetails movie={selectedMovie}  updateDetails={loadMovie}/>
        
        {editedMovie ?
        <MovieForm movie={editedMovie} updateMovie={updateMovie} createMovie={createMovie} />
        :null}
      </div>
    </div>
  );
}

export default App;
