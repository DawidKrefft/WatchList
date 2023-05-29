import React from "react";
import { Typography, Container, Grid, useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import { selectWatchListMovies } from "../../state/moviesSlice";
import MovieGrid from "../../components/MovieGrid";
import SearchIcon from "@mui/icons-material/Search";

const WatchListMovies = () => {
  const theme = useTheme();
  const watchListMovies = useSelector(selectWatchListMovies);

  const renderMovieGrid = () => {
    if (watchListMovies.length > 0) {
      return <MovieGrid movies={watchListMovies} type="watchlist" />;
    } else {
      return (
        <Typography
          variant="h2"
          sx={{
            mt: 2,
            pt: "30px",
            borderBottom: "1px solid",
            "@media (max-width: 460px)": {
              fontSize: "30px",
            },
          }}
        >
          Press{" "}
          <SearchIcon
            sx={{
              fontSize: "40px",
              "@media (max-width: 460px)": {
                fontSize: "20px",
              },
            }}
          />{" "}
          and add movies
        </Typography>
      );
    }
  };

  return (
    <Container fixed>
      <Grid container justifyContent="center" alignItems="center">
        {/* <Typography
          variant="h4"
          sx={{ fontWeight: "600", mt: 4, color: theme.palette.secondary.main }}
        >
          Watch list:
        </Typography> */}
      </Grid>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{ height: "100%" }}
      >
        {renderMovieGrid()}
      </Grid>
    </Container>
  );
};

export default WatchListMovies;
