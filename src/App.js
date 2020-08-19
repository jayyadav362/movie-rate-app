import React, {useState,useEffect} from 'react';
import './App.css';
import MovieList from './components/movie-list';
import MovieDetails from './components/movie-details';

function App() {

    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState([null]);

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
 
  const movieClicked = movie => {
    setSelectedMovie(movie)
  }
  const loadMovie = movie => {
    setSelectedMovie(movie)
  }

  return (
    <div className="App">
      <div className="App-content">
        <MovieList movies={movies} movieClicked={movieClicked}/>
        <MovieDetails movie={selectedMovie}  updateDetails={loadMovie}/>
      </div>
    </div>
  );
}

export default App;
