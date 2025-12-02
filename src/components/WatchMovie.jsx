export default function WatchMovie({ movieObj, onRemoveToWatchList}) {
  return (
    <div className="col">
      {
        <div className="card movie position-relative">
          <img src={"https://image.tmdb.org/t/p/original/" + movieObj.poster_path} alt="" className="card-img-top" 
          />
          <div>
            <button 
            className="btn btn-link fs-5 text-danger position-absolute top-0 start-0" 
            onClick={()=>onRemoveToWatchList(movieObj)}>
              <i  className="bi bi-dash-circle-fill "></i>
            </button>
          </div>
        </div>
      }
    </div>
  );
}
