import { Button, Grid } from "@mui/material";
import { Genre } from "../types/movieGenreTypes";

type GenreFilterProps = {
  genres: Genre[];
  selectedGenre: string;
  onGenreChange: (genreId: string) => void;
};

const GenreFilter = ({
  genres,
  selectedGenre,
  onGenreChange,
}: GenreFilterProps) => {
  return (
    <Grid item xs={12} sx={{ alignSelf: "center", marginX: "50px" }}>
      <Button
        variant={selectedGenre === "" ? "contained" : "outlined"}
        onClick={() => onGenreChange("")}
      >
        All Genres
      </Button>
      {genres.map((genre) => (
        <Button
          key={genre.id}
          variant={
            selectedGenre === String(genre.id) ? "contained" : "outlined"
          }
          onClick={() => onGenreChange(String(genre.id))}
        >
          {genre.name}
        </Button>
      ))}
    </Grid>
  );
};

export default GenreFilter;
