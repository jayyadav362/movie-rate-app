import React, {useState,useEffect} from 'react';
import './App.css';
import MovieList from './components/movie-list';
import MovieDetails from './components/movie-details';
import MovieForm from './components/movie-form';

function App() {

    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
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
  }

  const createMovie = movie => {
    const newMov = [...movies,movie]
    setMovies(newMov);
  }

  const removeClicked = movie => {
    const newMovie = movies.filter(mov => mov.id !== movie.id );
    setMovies(newMovie);
  }

  return (
    <div className="container mt-3">
      <div className="row">

        <div className="col-lg-4 mx-auto">
        <MovieList movies={movies} movieClicked={loadMovie} editClicked ={editClicked} removeClicked={removeClicked}/>
        <button type="button" className="btn btn-success btn-block mt-2" onClick={addMovie}>Add Movie</button>
        </div>

        <div className="col-lg-6 mx-auto">
        <MovieDetails movie={selectedMovie}  updateDetails={loadMovie}/>
        {editedMovie ?
        <MovieForm movie={editedMovie} updateMovie={updateMovie} createMovie={createMovie} />
        :null}
        </div>

      </div>
    </div>
  );
}

export default App;
