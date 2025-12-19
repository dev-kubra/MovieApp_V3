/* eslint-disable react-refresh/only-export-components */
import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";

export const UserContext = createContext();

export default function UserContextProvider ({children}) {
  const storedWatchList = JSON.parse(localStorage.getItem("watchList")) || [];
  const [watchList, setWatchList] = useState(storedWatchList);

  useEffect(() => {
    localStorage.setItem("watchList", JSON.stringify(watchList));
  }, [watchList]);

  function addToWatchList(movie) {
    const isAddedToList = watchList.map((i)=>i.id).includes(movie.id)
    if(!isAddedToList) {
      setWatchList((movies)=>[...movies, movie]);
    }
  }
  function removeToWatchList(movie){
    setWatchList(movies=>movies.filter(i => i.id !== movie.id));
  }

  return(
    <UserContext.Provider value={{watchList, addToWatchList, removeToWatchList}}>
      {children}
    </UserContext.Provider>
  );
}