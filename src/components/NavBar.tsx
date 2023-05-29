import { DarkMode, LightMode } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  useTheme,
  styled,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { RootState } from "../app/store";
import { setMode } from "../state/moviesSlice";

const StyledLink = styled(NavLink)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontWeight: 600,
  fontSize: "30px",
  textDecoration: "none",
  "&.active": {
    color: theme.palette.primary.main,
  },
  "@media (max-width: 460px)": {
    fontSize: "20px",
  },
}));

const NavBar = () => {
  const dispatch = useDispatch();
  const mode = useSelector((state: RootState) => state.movies.mode);

  const theme = useTheme();

  const handleModeToggle = () => {
    dispatch(setMode());
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar sx={{ backgroundColor: theme.palette.background.default }}>
          <Box
            sx={{
              display: "flex",
              gap: "20px",
              alignItems: "center",
              m: "auto",
            }}
          >
            <IconButton onClick={handleModeToggle}>
              {theme.palette.mode === "dark" ? (
                <DarkMode
                  sx={{ fontSize: "25px", color: theme.palette.secondary.main }}
                />
              ) : (
                <LightMode
                  sx={{ color: theme.palette.secondary.main, fontSize: "25px" }}
                />
              )}
            </IconButton>
            <StyledLink to="/">ToWatch</StyledLink>
            <StyledLink to="/watched">WatchAgain</StyledLink>
            <StyledLink to="/search">
              <Button color="inherit">
                <SearchIcon />
              </Button>
            </StyledLink>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default NavBar;
