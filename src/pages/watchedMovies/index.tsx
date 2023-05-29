import { Container, Typography, useTheme, Grid } from "@mui/material";
import { useSelector } from "react-redux";
import MovieGrid from "../../components/MovieGrid";
import { selectWatchedMovies } from "../../state/moviesSlice";

const WatchedMovies = () => {
  const watchedListMovies = useSelector(selectWatchedMovies);
  const theme = useTheme();

  return (
    <Container fixed>
      {/* <Grid container justifyContent="center" alignItems="center">
        <Typography
          variant="h4"
          sx={{ fontWeight: "600", mt: 4, color: theme.palette.primary.main }}
        >
          Watched:
        </Typography>
      </Grid> */}
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{ height: "100%" }}
      >
        <Grid item>
          {watchedListMovies.length > 0 ? (
            <MovieGrid movies={watchedListMovies} type="watched" />
          ) : (
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
              Watched List is empty
            </Typography>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default WatchedMovies;
