import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import notFound from "../assets/notFound.png";
import {
  addMovieToWatchList,
  addMovieToWatched,
  selectWatchListMovies,
  selectWatchedMovies,
} from "../state/moviesSlice";
import { Movie } from "../types/movieGenreTypes";

export type MovieSearchResultProps = {
  movie: Movie;
};

const MovieSearchResult = ({ movie }: MovieSearchResultProps) => {
  const dispatch = useDispatch();
  const watchListMovies = useSelector(selectWatchListMoviesMemoized);
  const watchedMovies = useSelector(selectWatchedMoviesMemoized);

  const isMovieInWatchList = watchListMovies.some(
    (item) => item.id === movie.id
  );
  const isMovieWatched = watchedMovies.some((item) => item.id === movie.id);

  const releaseYear = new Date(movie.release_date).getFullYear();
  const isBigScreen = useMediaQuery("(min-width:600px)");
  const theme = useTheme();
  const posterPath = movie.poster_path
    ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
    : notFound;

  const handleAddToWatchList = () => {
    dispatch(addMovieToWatchList(movie));
  };

  const handleAddToWatched = () => {
    dispatch(addMovieToWatched(movie));
  };

  return (
    <Card sx={{ display: "flex", height: 170, m: 1 }}>
      {isBigScreen && (
        <CardMedia
          component="img"
          sx={{ width: 150, minWidth: 150 }}
          title=""
          image={posterPath}
          alt={movie.title}
        />
      )}
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          {movie.title && (
            <Box sx={{ height: "60px" }}>
              <Typography
                component="div"
                variant="h5"
                sx={{ fontSize: isBigScreen ? "20px" : "18px" }}
              >
                {movie.title}
              </Typography>
            </Box>
          )}
          <Typography color="text.secondary" component="div">
            <Typography
              sx={{ fontSize: isBigScreen ? "14px" : "12px", pt: "10px" }}
            >
              {isNaN(releaseYear) ? "No info" : releaseYear}
            </Typography>
          </Typography>
          <Stack spacing={2} direction="row" sx={{ mt: 1 }}>
            <Button
              variant="contained"
              disabled={isMovieInWatchList}
              onClick={handleAddToWatchList}
              sx={{
                fontSize: isBigScreen ? "12px" : "10px",
                background: theme.palette.secondary.main,
                ":hover": {
                  background: theme.palette.secondary.dark,
                },
              }}
            >
              Add to WatchList
            </Button>
            <Button
              variant="contained"
              disabled={isMovieWatched}
              onClick={handleAddToWatched}
              sx={{
                fontSize: isBigScreen ? "12px" : "10px",
                background: theme.palette.secondary.main,
                ":hover": {
                  background: theme.palette.secondary.dark,
                },
              }}
            >
              Add to Watched
            </Button>
          </Stack>
        </CardContent>
      </Box>
      {!isBigScreen && (
        <CardMedia
          component="img"
          sx={{ width: 120, minWidth: 100 }}
          title=""
          image={posterPath}
          alt={movie.title}
        />
      )}
    </Card>
  );
};

// Create memoized selectors
const selectWatchListMoviesMemoized = createSelector(
  selectWatchListMovies,
  (watchListMovies) => watchListMovies
);

const selectWatchedMoviesMemoized = createSelector(
  selectWatchedMovies,
  (watchedMovies) => watchedMovies
);

export default MovieSearchResult;
