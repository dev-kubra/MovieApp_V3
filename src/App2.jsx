/* eslint-disable no-unused-vars */
/*Asil App bu, app2 diye*/

import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-icons/font/bootstrap-icons.css"
import { movie_list } from "./data";
import { useState } from "react";
import Logo from "./components/Logo";
import SearchForm from "./components/SearchForm";
import WatchListButton from "./components/WatchListButton";
import MovieList from "./components/MovieList";
import WatchList from "./components/WatchList";
import { useEffect } from "react";
import Loading from "./components/Loading";
import ErrorMessage from "./components/ErrorMessage";
import MovieDetails from "./components/MovieDetails";


const token = import.meta.env.VITE_TMDB_TOKEN;
const page = 1;
const query = "batman";
const language = "tr-TR";

export default function App2() {
  const [movies, setMovies] = useState([]);
  const [watchListMovies, setWatchListMovies] = useState([]);
  const [isWatchListOpen, setIsWatchListOpen]=useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState(query);
  const [selectedMovie, setSelectedMovie] = useState(null);


  useEffect(() => {
    async function getMovies() {
      setLoading(true);
        try {
          const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${searchQuery}&language=${language}&page=${page}`, {
          headers: {
            accept: "application/json",
            Authorization: "Bearer " + token}})

          if(response.status === 404) {
            throw new Error("Film bulunamadı");
          }else if(response.status === 401) {
            throw new Error("API anahtari hatali veya gecersiz");
          }else if(response.status === 500) {
            throw new Error("Sunucu hatasi, lutfen daha sonra yeniden deneyiniz");
          }else if(response.status === 503) {
            throw new Error ("Servis geçici olarak kullanilmiyor, lutfen daha sonra tekrar deneyin");
          }
          if(!response.ok) {
            throw new Error("Hataliysam ara kardesim")
          }

          const data = await response.json();
          console.log(data);
          if(data.results) { 
            setMovies(data.results);
          }
        setError("");
      } catch (error) {
        setError(error.message);
      }

      setLoading(false);
    }

    if(searchQuery.length < 3) {
      setMovies([]);
      setError("Arama terimi en az 3 karakter olmalıdır.");
      return;
      
    }
    getMovies();
  }, [searchQuery]);


  function handleAddToWatchList(movie) {
    const isAddedToList = watchListMovies.map((i)=>i.id).includes(movie.id)
    if(!isAddedToList) {
      setWatchListMovies((movies)=>[...movies, movie]);
    }
  }
  function handleRemoveToWatchList(movie){
    setWatchListMovies(movies=>movies.filter(i => i.id !== movie.id));
  }

  function handleSelectedMovie(movie) {
    setSelectedMovie(movie);
  }

  return (
    <>
      <Header >
        <Logo/>
        <SearchForm searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
        <WatchListButton watch_list_prop={watchListMovies} onIsWatchListOpen={setIsWatchListOpen}/>
      </Header>
      <Main>
        {
          selectedMovie && (
            <MovieDetails movieObj={selectedMovie} onClose={()=> setSelectedMovie(null)}/>
          )
        }
        <WatchList watch_list_prop={watchListMovies} isWatchListOpen={isWatchListOpen} onRemoveToWatchList={handleRemoveToWatchList}/>

        {loading &&  <Loading />}
        {!loading && !error && (
          <MovieList movies_prop={movies} 
          onAddToList={handleAddToWatchList} 
          onSelectedMovie={handleSelectedMovie}/>
        )}
        {error && (<ErrorMessage message={error} />)}
        
      </Main>
      <Footer/>
    </>
  );
}
 