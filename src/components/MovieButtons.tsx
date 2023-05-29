import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Box, Button, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import {
  addMovieToWatched,
  moveToWatchList,
  removeMovieFromWatchList,
  removeMovieFromWatched,
} from "../state/moviesSlice";
import { Movie } from "../types/movieGenreTypes";

type MovieButtonsProps = {
  movie: Movie;
  type: string;
  display: string;
};

const ControlButton = styled(Button)({
  color: "#fefefe",
  backgroundColor: "transparent",
  border: "none",
  fontSize: "1.25rem",
  padding: "5px",
  margin: 0,
  minWidth: "0 !important",
});

// Tagged Template Literal
// const ControlButton = styled(Button)`
//   background-color: transparent;
//   color: #fefefe;
//   border: none;
//   transition: all 0.3s ease;
//   font-size: 1.25rem;
//   margin: 0;
//   min-width: 0 !important ;
//   padding: 5px;
// `;

const MovieButtons = ({ type, movie, display }: MovieButtonsProps) => {
  const dispatch = useDispatch();

  return (
    <Box
      sx={{
        background: "rgba(0, 0, 0, 0.7)",
        position: "absolute",
        bottom: "-15px",
        left: "50%",
        transform: "translateX(-50%)",
        borderRadius: "5px",
        padding: "3px",
        visibility: `${display}`,
      }}
    >
      {type === "watchlist" ? (
        <Stack direction="row">
          <ControlButton onClick={() => dispatch(addMovieToWatched(movie))}>
            <VisibilityIcon />
          </ControlButton>
          <ControlButton
            onClick={() => dispatch(removeMovieFromWatchList(movie.id))}
          >
            <DeleteIcon />
          </ControlButton>
        </Stack>
      ) : (
        <div></div>
      )}
      {type === "watched" ? (
        <Stack direction="row">
          <ControlButton onClick={() => dispatch(moveToWatchList(movie))}>
            <VisibilityOffIcon />
          </ControlButton>
          <ControlButton
            onClick={() => dispatch(removeMovieFromWatched(movie.id))}
          >
            <DeleteIcon />
          </ControlButton>
        </Stack>
      ) : (
        <div></div>
      )}
    </Box>
  );
};

export default MovieButtons;
