import WatchMovie from "./WatchMovie";

export default function WatchList({movies, title, removeToWatchList}) {

  return(
  <>
      <div className="container py-3">

        <h1 className="title h4 mb-3">{title}</h1>
        {movies.length == 0 ? (
          <div>Film bulunamadı</div>
         ) : (
          <div id="movie-list" className="row row-cols-3 row-cols-md-4 row-cols-lg-6 g-1 g-lg-3">
            {movies.map((m, index) => (
              <WatchMovie key={index} movieObj={m} removeToWatchList={removeToWatchList} />
             ))
            }
          </div>
         )    
        }    
      </div>
      
  </> 
  );
}