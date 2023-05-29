import SearchIcon from "@mui/icons-material/Search";
import { Box, IconButton, InputBase, Paper } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import MovieSearchResult from "../../components/MovieSearchResult";
import { useGetMoviesMutation } from "../../services/movieApi";
import { Movie } from "../../types/movieGenreTypes";

const SearchMovie = () => {
  const [query, setQuery] = useState("");
  const [isEmptyQuery, setIsEmptyQuery] = useState(false);
  const [getMovies, { data: movies }] = useGetMoviesMutation();
  // const [autocompleteOptions, setAutocompleteOptions] = useState<string[]>([]);

  const fetchMovie = async () => {
    await getMovies({ query });
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;

    const handleSearch = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        if (query) {
          setIsEmptyQuery(false);
          fetchMovie();
        } else {
          setIsEmptyQuery(true);
        }
      }, 500); // debounce delay
    };

    handleSearch();

    return () => {
      clearTimeout(timer);
    };
  }, [query]);

  // useEffect(() => {
  //   const movieTitles =
  //     movies?.results.map((movie: Movie) => movie.title) || [];
  //   setAutocompleteOptions(movieTitles);
  // }, [movies]);

  const movieResults = movies?.results || [];

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <Box
      sx={{
        margin: "auto",
        padding: "15px",
        alignContent: "center",
        maxWidth: "570px",

        marginTop: "24px",
      }}
    >
      <Paper
        component="form"
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          maxWidth: "570px",
          m: "auto",
        }}
        noValidate
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search Your Movie"
          value={query}
          onChange={handleInputChange}
        />
        {/* <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={autocompleteOptions}
          sx={{ ml: 1, flex: 1 }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search Your Movie"
              value={query}
              onChange={handleInputChange}
            />
          )}
        /> */}
        <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>
      <Box sx={{ padding: 0, margin: 0, marginTop: "20px" }}>
        {!isEmptyQuery &&
          movieResults.length > 0 &&
          movieResults.map((movie: Movie) =>
            isNaN(movie.id) ? null : (
              <MovieSearchResult movie={movie} key={movie.id} />
            )
          )}
      </Box>
      {/* <Box sx={{ padding: 0, margin: 0, marginTop: "20px" }}>
        {!isEmptyQuery &&
          movieResults.length > 0 &&
          movieResults.map((movie: Movie) => (
            <MovieSearchResult movie={movie} key={movie.id} />
          ))}
      </Box> */}
    </Box>
  );
};

export default SearchMovie;
