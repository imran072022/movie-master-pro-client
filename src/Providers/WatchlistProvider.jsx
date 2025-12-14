import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthProvider";
import { toast } from "react-hot-toast";

export const WatchlistContext = createContext(null);

export const WatchlistProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    let mounted = true;
    if (!user?.email) {
      setEntries([]);
      return;
    }

    fetch(
      `https://movie-master-pro-server-p31s3i7uw.vercel.app/movies/watchlist?email=${user.email}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (mounted) setEntries(data || []);
      })
      .catch((err) => console.error("WatchlistProvider load error", err));

    return () => {
      mounted = false;
    };
  }, [user?.email]);

  const isIn = (movieId) =>
    entries.some((e) => String(e.movieId) === String(movieId));

  const add = (movieId) => {
    if (!user?.email) {
      toast.error("Login required");
      return Promise.reject(new Error("No user logged in"));
    }

    const payload = { movieId, email: user.email, addedAt: new Date() };
    return fetch(
      "https://movie-master-pro-server-p31s3i7uw.vercel.app/movies/watchlist",
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      }
    )
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        // normalize returned entry: some servers return { insertedId } instead of full doc
        let entry = data;
        if (!entry || !entry._id) {
          const insertedId =
            data &&
            (data.insertedId || data.inserted_id || data.insertedId?._id);
          if (insertedId) {
            entry = {
              _id: insertedId,
              movieId: String(movieId),
              email: user.email,
              addedAt: new Date(),
            };
          } else {
            // fallback: construct a minimal entry
            entry = {
              _id: String(Date.now()),
              movieId: String(movieId),
              email: user.email,
              addedAt: new Date(),
            };
          }
        }
        setEntries((prev) => [...prev, entry]);
        toast.success("Added to watchlist");
        return data;
      })
      .catch((err) => {
        console.error("WatchlistProvider add error", err);
        toast.error("Failed to add to watchlist");
        throw err;
      });
  };

  const remove = (movieId) => {
    const entry = entries.find((e) => String(e.movieId) === String(movieId));
    if (!entry) return Promise.resolve();
    const id = entry._id;
    return fetch(
      `https://movie-master-pro-server-p31s3i7uw.vercel.app/movies/watchlist/${id}`,
      {
        method: "DELETE",
      }
    )
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setEntries((prev) => prev.filter((e) => e._id !== id));
        toast.success("Removed from watchlist");
        return data;
      })
      .catch((err) => {
        console.error("WatchlistProvider remove error", err);
        toast.error("Failed to remove from watchlist");
        throw err;
      });
  };

  const toggle = (movieId) => {
    return isIn(movieId) ? remove(movieId) : add(movieId);
  };

  // Backwards-compatible alias used by some pages/components
  const handleWatchList = (movieId) => toggle(movieId);

  return (
    <WatchlistContext.Provider
      value={{ entries, isIn, add, remove, toggle, handleWatchList }}
    >
      {children}
    </WatchlistContext.Provider>
  );
};

export default WatchlistProvider;
