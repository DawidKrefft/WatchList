import { Box, Card, CardMedia, Typography } from "@mui/material";
import React, { useState } from "react";
import { Movie } from "../types/movieGenreTypes";
import MovieButtons from "./MovieButtons";

type MovieCardProps = {
  movie: Movie;
  type: string;
};

const MovieCard = ({ movie, type }: MovieCardProps) => {
  const [display, setDisplay] = useState("hidden");

  const showIcon = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDisplay("visible");
  };

  const hideIcon = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDisplay("hidden");
  };

  return (
    <div onMouseEnter={(e) => showIcon(e)} onMouseLeave={(e) => hideIcon(e)}>
      <Box sx={{ position: "relative" }}>
        <Typography sx={{ textAlign: "center" }}>
          {movie.title.substring(0, 25)}
        </Typography>
        <Card sx={{ display: "flex", m: 1, height: 300 }}>
          <CardMedia
            component="img"
            sx={{ width: 200 }}
            image={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
            alt={movie.title}
          />
          <MovieButtons type={type} movie={movie} display={display} />
        </Card>
      </Box>
    </div>
  );
};

export default MovieCard;
