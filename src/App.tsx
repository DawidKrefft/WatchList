import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RootState } from "./app/store";
import NavBar from "./components/NavBar";
import SearchMovie from "./pages/searchMovie";
import WatchListMovies from "./pages/watchListMovies";
import WatchedMovies from "./pages/watchedMovies";
import { themeSettings } from "./theme";

function App() {
  const mode = useSelector((state: RootState) => state.movies.mode);
  const theme = useMemo(() => themeSettings(mode), [mode]);

  return (
    <BrowserRouter>
      <ThemeProvider theme={createTheme(theme)}>
        {/* css reset for mui */}
        <CssBaseline />
        <NavBar />
        <Routes>
          <Route path="/" element={<WatchListMovies />} />
          <Route path="/watched" element={<WatchedMovies />} />
          <Route path="/search" element={<SearchMovie />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
