import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PaletteMode } from "@mui/material";
import { RootState } from "../app/store";
import { Movie } from "../types/movieGenreTypes";

interface MoviesState {
  mode: PaletteMode;
  watchedMovies: Movie[];
  watchListMovies: Movie[];
}

const initialState: MoviesState = {
  mode: "dark",
  watchedMovies: [],
  watchListMovies: [],
};

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    addMovieToWatchList: (state, action: PayloadAction<Movie>) => {
      state.watchListMovies.push(action.payload);
    },
    addMovieToWatched: (state, action: PayloadAction<Movie>) => {
      const { id } = action.payload;
      state.watchListMovies = state.watchListMovies.filter(
        (movie) => movie.id !== id
      );
      state.watchedMovies.push(action.payload);
    },
    removeMovieFromWatchList: (state, action: PayloadAction<number>) => {
      state.watchListMovies = state.watchListMovies.filter(
        (movie) => movie.id !== action.payload
      );
    },
    moveToWatchList: (state, action: PayloadAction<Movie>) => {
      const { id } = action.payload;
      state.watchedMovies = state.watchedMovies.filter(
        (movie) => movie.id !== id
      );
      state.watchListMovies.push(action.payload);
    },
    removeMovieFromWatched: (state, action: PayloadAction<number>) => {
      state.watchedMovies = state.watchedMovies.filter(
        (movie) => movie.id !== action.payload
      );
    },
  },
});

export const {
  setMode,
  addMovieToWatchList,
  addMovieToWatched,
  removeMovieFromWatchList,
  moveToWatchList,
  removeMovieFromWatched,
} = moviesSlice.actions;

export default moviesSlice.reducer;

// Selectors
export const selectWatchListMovies = (state: RootState) =>
  state.movies.watchListMovies;
export const selectWatchedMovies = (state: RootState) =>
  state.movies.watchedMovies;
