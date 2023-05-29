import { Box, Grid, Pagination } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useGetGenresQuery } from "../services/movieApi";
import { Genre, Movie } from "../types/movieGenreTypes";
import GenreFilter from "./GenreFilter";
import MovieCard from "./MovieCard";

type MovieGridProps = {
  movies: Movie[];
  type: string;
};

const MovieGrid = ({ movies, type }: MovieGridProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [genres, setGenres] = useState<Genre[]>([]);
  const moviesPerPage = 10;

  // Fetch genres from the API
  const { data: genresData, error: genresError } = useGetGenresQuery({});

  useEffect(() => {
    if (genresData) {
      setGenres(genresData.genres);
    }
    if (genresError) {
      console.error("Error fetching genres:", genresError);
    }
  }, [genresData, genresError]);

  // Filter movies by selected genre
  const filteredMovies = selectedGenre
    ? movies.filter((movie) => movie.genre_ids?.includes(Number(selectedGenre)))
    : movies;

  const totalPages = Math.ceil(filteredMovies.length / moviesPerPage);

  // Calculate the index range for the current page
  const startIndex = (currentPage - 1) * moviesPerPage;
  const endIndex = startIndex + moviesPerPage;

  // Get the movies to display on the current page
  const displayedMovies = filteredMovies.slice(startIndex, endIndex);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
  };

  const handleGenreChange = (genreId: string) => {
    setSelectedGenre(genreId);
    setCurrentPage(1); // Reset current page when changing genre
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "92vh" }}>
      <Grid container spacing={2} mt={3}>
        <Grid item xs={12}>
          <Grid container justifyContent="center" spacing={2}>
            {displayedMovies.map((movie) => (
              <Grid key={movie.id} item>
                <MovieCard movie={movie} type={type} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
      <Box sx={{ alignSelf: "flex-end", mt: "auto" }}>
        <GenreFilter
          genres={genres}
          selectedGenre={selectedGenre}
          onGenreChange={handleGenreChange}
        />
      </Box>
      <Grid item xs={12} sx={{ alignSelf: "center", mt: 2 }}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
        />
      </Grid>
    </Box>
  );
};

export default MovieGrid;
