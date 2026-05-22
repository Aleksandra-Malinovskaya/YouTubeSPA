import {
  TextField,
  Button,
  Box,
  InputAdornment,
  Typography,
  Tooltip,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { getVideos, getStatistics } from "../RTK/videoSlice";
import { useDispatch, useSelector } from "react-redux";
import { change, selectValue } from "../RTK/inputSlice";
import { openModal } from "../RTK/modalSlice";
import ModalWindow from "./ModalWindow";

const Search = ({ isResultsPage }) => {
  const dispatch = useDispatch();
  const text = useSelector(selectValue);
  const handleSearch = async () => {
    const resultVideo = await dispatch(getVideos({ text: text }));

    const videos = resultVideo.payload;

    if (videos && videos.length > 0) {
      const ids = videos.map((video) => video.id.videoId).join(",");
      dispatch(getStatistics({ id: ids }));
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: isResultsPage ? "flex-start" : "center",
        mt: isResultsPage ? 4 : "20vh",
        width: "100%",
        transition: "all 0.3s ease",
      }}
    >
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 500 }}>
        Поиск видео
      </Typography>

      <Box sx={{ display: "flex", width: "100%", maxWidth: 700 }}>
        <TextField
          fullWidth
          value={text}
          onChange={(e) => dispatch(change(e.target.value))}
          placeholder="Что хотите посмотреть?"
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <Tooltip title="Сохранить запрос" arrow>
                    <FavoriteBorderIcon
                      onClick={() => dispatch(openModal())}
                      sx={{ color: "rgba(0,0,0,0.4)", cursor: "pointer" }}
                    />
                  </Tooltip>
                </InputAdornment>
              ),
            },
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "4px 0 0 4px",
              backgroundColor: "white",
            },
          }}
        />
        <Button
          variant="contained"
          onClick={handleSearch}
          sx={{
            px: 4,
            borderRadius: "0 4px 4px 0",
            textTransform: "none",
            fontSize: "18px",
          }}
        >
          Найти
        </Button>
        <ModalWindow />
      </Box>
    </Box>
  );
};

export default Search;
