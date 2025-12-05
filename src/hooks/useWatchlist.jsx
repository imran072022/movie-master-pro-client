import { useContext } from "react";
import { WatchlistContext } from "../Providers/WatchlistProvider";

export default function useWatchlist() {
  return useContext(WatchlistContext);
}
