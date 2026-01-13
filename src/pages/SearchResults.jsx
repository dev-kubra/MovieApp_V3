import { useEffect } from "react";
import { useState } from "react";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import MovieList from "../components/MovieList";
import { useSearchParams } from "react-router";
import Pagination from "../components/Pagination";


const apiUrl = "https://api.themoviedb.org/3"
const token = import.meta.env.VITE_TMDB_TOKEN;
const language = "tr-TR";

export default function SearchResults() {

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [totalPages, setTotalPages] = useState(0);

  const query = searchParams.get("q");
  const page = searchParams.get("page") || 1; //page bos ise default 1 gelsin, 1.sayfa

  useEffect(() => {
    async function getMovies() {
      setLoading(true);
        try { //popular filmleri listeledik
          const response = await fetch(`${apiUrl}/search/movie?query=${query}&language=${language}&page=${page}`, {
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
            setTotalPages(data.total_pages);
          }
        setError("");
      } catch (error) {
        setError(error.message);
      }

      setLoading(false);
    }

    getMovies();
  }, [searchParams]);

  if(loading) {
    return <Loading />
  }
  if(error) {
    return <ErrorMessage message={error} />
  }


  return(
    <>
      <MovieList movies={movies} title={`Arama Sonuçları: ${query}`}/>


      <Pagination page={page} totalPages={totalPages} setSearchParams={setSearchParams} query={query}/>
      
      
      
    </>
    
  )
}  