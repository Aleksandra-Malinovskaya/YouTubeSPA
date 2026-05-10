import { useState } from "react";
import {
  Box,
  IconButton,
  Grid,
  Container,
  Typography,
  CircularProgress,
  Alert,
} from "@mui/material";
import ViewListIcon from "@mui/icons-material/ViewList";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import Search from "./Search";
import { useSelector } from "react-redux";
import { selectError, selectLoading, selectVideo } from "../RTK/videoSlice";
import VideoCard from "./VideoCard";

const MainSearch = () => {
  const videoMas = useSelector(selectVideo);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const [viewMode, setViewMode] = useState("grid");
  const isResultsPage = videoMas && videoMas.length > 0;

  return (
    <Container maxWidth="lg" sx={{ pt: 4 }}>
      <Search isResultsPage={isResultsPage} />
      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
          <CircularProgress />
        </Box>
      )}
      {error && !loading && (
        <Box sx={{ mt: 4 }}>
          <Alert severity="error">
            {typeof error === "string" ? error : "Произошла ошибка"}
          </Alert>
        </Box>
      )}

      {isResultsPage && (
        <Box sx={{ mt: 4 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mb: 2,
              alignItems: "center",
            }}
          >
            <Typography color="text.secondary">
              Видео по запросу <b>«текст»</b> {videoMas.length}
            </Typography>
            <Box>
              <IconButton
                onClick={() => setViewMode("list")}
                color={viewMode === "list" ? "primary" : "default"}
              >
                <ViewListIcon />
              </IconButton>
              <IconButton
                onClick={() => setViewMode("grid")}
                color={viewMode === "grid" ? "primary" : "default"}
              >
                <ViewModuleIcon />
              </IconButton>
            </Box>
          </Box>

          <Grid container spacing={isResultsPage ? 3 : 0}>
            {videoMas.map((video) => (
              <Grid
                xs={12}
                sm={6}
                md={viewMode === "list" ? 12 : 3}
                key={video.id.videoId}
              >
                <VideoCard video={video} mode={viewMode} />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Container>
  );
};

export default MainSearch;
