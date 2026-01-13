import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Loading from "../components/Loading"; 
import ErrorMessage from "../components/ErrorMessage";
import MovieList from "../components/MovieList";


const apiUrl = "https://api.themoviedb.org/3"
const token = import.meta.env.VITE_TMDB_TOKEN;
const page = 1;
const language = "tr-TR";


export default function SimilarMovies({movieId}) {

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getMovies() {
      setLoading(true);
        try { //benzer filmleri almak icin API buna özel bir servis sagliyor ve URL'de ---> /similar/  seklinde arayabiliyor/yazabiliyoruz
          const response = await fetch(`${apiUrl}/movie/${movieId}/similar?language=${language}&page=${page}`, {
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

    getMovies();
  }, [movieId]);

  if(loading) {
    return <Loading />
  }
  if(error) {
    return <ErrorMessage message={error} />
  }


  return(
    <MovieList movies={movies} title="Benzer Filmler"/>
  )
} 