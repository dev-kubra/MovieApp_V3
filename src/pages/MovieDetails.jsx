import { useEffect, useState } from "react";
import { useParams } from "react-router";
import ErrorMessage from "../components/ErrorMessage";
import Loading from "../components/Loading";
import SimilarMovies from "./SimilarMovies";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContextProvider";


const apiUrl = "https://api.themoviedb.org/3"
const token = import.meta.env.VITE_TMDB_TOKEN;
const language = "tr-TR";


export default function MovieDetails() {

  const {id} = useParams();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { addToWatchList, watchList, removeToWatchList } = useContext(UserContext);

  const isAdded = watchList?.find((i) => ((i.id) == movie?.id));


  useEffect(() => {
    async function getMovie() {
        try { //Movie'nin Details'ini almak için tekrar bir sorguya ihtiyac duyuyoruz
          const response = await fetch(`${apiUrl}/movie/${id}?language=${language}&append_to_response=credits`, {
          headers: {
            accept: "application/json",
            Authorization: "Bearer " + token}});

          if(!response.ok) {
            throw new Error("Hataliysam ara kardesim")
          }
          const data = await response.json();
          setMovie(data);
          setError("");
        } catch (error) {
          setError(error.message);
        }

        setLoading(false);
      }

      getMovie();
  }, [id]);

  if(loading) {
    return <Loading />
  }
  if(error) {
    return <ErrorMessage message={error} />
  }


  return(
    <>
      <div className="text-white position-relative"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
      }}>
        <div className="img-overlay">
          <div className="container d-flex align-items-center justify-content-center min-vh-100">
            <div className="row">
              <div className="col-md-3 d-none d-lg-block">
                <img 
                src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} 
                alt={movie.title} 
                className="img-fluid rounded shadow img-thumbnail"/>
              </div>
              <div className="col-md-9">
                <h1 className="display-4">{movie.title}</h1>
                <p>
                  {movie.release_date}  <i className="bi bi-dot text-white"></i>
                  <span className="text-white">
                    {movie.genres.map((genre)=> genre.name).join(", ")}
                  </span>
                  <i className="bi bi-dot text-white"></i>
                    {movie.runtime} dk
                </p>
                <p>
                  <span className="bagde p-1 bg-warning rounded">
                    {Math.round(movie.vote_average*10)}%
                  </span>
                  <span className="badge bg-danger fs-6 ms-2 pointer">
                  <>
                    {
                      isAdded ? (
                        <i className="bi bi-heart-fill" onClick={()=>(removeToWatchList(movie))}></i>
                      ):(
                        <i className="bi bi-heart" onClick={()=>(addToWatchList(movie))}></i>
                      )
                    }
                  </>
                  </span>
                </p>
                
                {movie.overview && (
                  <p className="lead">
                    <strong>Özet: </strong> {movie.overview}
                  </p>
                )}

                <div className="d-flex flex-column flex-md-row justify-content-between">
                  <p className="d-flex flex-column text-center">
                    <span>Yapımcı:</span> <span>{movie.production_companies[0]?.name || "Bilgi Yok"}</span></p>
                  <p className="d-flex flex-column text-center">
                    <span>Yönetmen:</span> <span>{movie.credits.crew[0]?.name || "Bilgi Yok"}</span></p>
                  <p className="d-flex flex-column text-center">
                    <span>Senarist:</span> <span>{movie.credits.crew[1]?.name || "Bilgi Yok"}</span></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container my-3">
        <h1 className="mb-3 h4">Kadro</h1>
            <div className="row">
              {movie.credits.cast.slice(0, 12).map((actor)=>(
                <div className="col-md-2 col-sm-2" key={actor.id}>
                  <img src={"https://image.tmdb.org/t/p/original/" + actor.profile_path} alt={actor.name} className="img-fluid img-thumbnail rounded shadow" />
                  <p>{actor.name}</p>
                </div>
              ))}
            
        </div>
      </div>
      <SimilarMovies movieId={id}/>
    </>

    // <div className="my-3">
    //     <div className="card">
    //       <div className="card-header d-flex justify-content-between align-items-center">
    //         <h2 className="title h5 mb-0">Movie Details</h2>
    //       </div>
    //       <div className="card-body">
    //         <div className="row">
    //           <div className="col-md-3">
    //             <img src={"https://image.tmdb.org/t/p/original/" + movie.poster_path} className="img-fluid"/>
    //           </div>
    //           <div className="col-md-9">
    //             <h3>{movie.title}</h3>
    //             <p>{movie.overview}</p>
    //             <p>Release Date: {movie.release_date}</p>
    //             <p>Rating: {movie.vote_average}</p>
    //             <p>Süre: {movie.runtime}</p>
    //             <p>Ülke: {movie.production_countries[0].name}</p>
    //             <p>Yapımcı: {movie.production_companies[0].name}</p>
    //             <p>Yönetmen: {movie.credits.crew[0].name}</p>
    //             <p>Senarist: {movie.credits.crew[1].name}</p>
    //             <p>Türler:</p>
    //             <ul className="list-unstyled d-flex flex-wrap">
    //               {movie.genres.map((genre)=>(
    //                 <li className="badge bg-primary me-2 mb-2" key={genre.id}>
    //                   {genre.name}
    //                 </li>
    //                 ))
    //               }
    //             </ul>
    //             <div className="card card-body">
    //               <p>Oyuncular:</p>
    //               <div className="row">
    //                 {movie.credits.cast.slice(0, 12).map((actor)=>(
    //                   <div className="col-md-2 col-sm-2" key={actor.id}>
    //                     <img src={"https://image.tmdb.org/t/p/original/" + actor.profile_path} alt={actor.name} className="img-fluid" />
    //                     <p>{actor.name}</p>
    //                   </div>
    //                 ))}
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
  );    
} 