import WatchMovie from "./WatchMovie";

export default function WatchList({watch_list_prop, isWatchListOpen, onRemoveToWatchList}) {

  return(
  <>
  {/* Burada koşullu render (conditional rendering) var, yani {isWatchListOpen &&(<div>....</div>)}  "isWatchListOpen TRUE ise sagdaki ifadeyi render et/calistir, FALSE ise calistirma" demek*/}
    {isWatchListOpen && (<div className="container my-3">
            <div className="card">
              <div className="card-header">
                <h2 className="title h5 mb-0">Watch List</h2>
              </div>
              <div className="card-body">
                {watch_list_prop.length == 0 ? (
              <div>Film bulunamadı</div>
            ) : (
              <div
                id="movie-list"
                className="row row-cols-3 row-cols-md-4 row-cols-lg-6 g-1 g-lg-3"
              >
                {watch_list_prop.map((m, index) => (
                  <WatchMovie key={index} movieObj={m} onRemoveToWatchList={onRemoveToWatchList} />
                ))}
              </div>
            )}
              </div>
            </div>
            
      
            
      </div>)}
      
      
       
  </>
    
  )
}