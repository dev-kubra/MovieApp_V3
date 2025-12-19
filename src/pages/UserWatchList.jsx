import { useContext } from "react";
import { UserContext } from "../contexts/UserContextProvider";
import WatchList from "../components/WatchList";

export default function UserWatchList () {
  const { watchList, removeToWatchList } = useContext(UserContext);

  return(
    <WatchList movies={watchList} title="Watch List" removeToWatchList={removeToWatchList}/>

  )
}