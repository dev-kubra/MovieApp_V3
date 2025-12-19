
import { useNavigate } from "react-router";
import MovieDetails from "../pages/MovieDetails";

export default function WatchMovie({ movieObj, removeToWatchList}) {

  const navigate = useNavigate();

  return (
    <div className="col">
      {
        <div className="card movie position-relative" >
          <img src={"https://image.tmdb.org/t/p/original/" + movieObj.poster_path} alt="" className="img-fluid rounded" onClick={() => navigate(`movies/${movieObj.id}`)
          }
          />
          <div>
            <button 
            className="btn btn-link fs-5 text-danger position-absolute top-0 start-0" 
            onClick={()=>removeToWatchList(movieObj)}>
              <i  className="bi bi-dash-circle-fill "></i>
            </button>
          </div>
        </div>
      }
    </div> 
  );
}
