import {
  Box,
  Typography,
  Container,
  Paper,
  Button,
  List,
  ListItem,
  Divider,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router";
import { removeFavorite, selectFavorites } from "../RTK/favoriteSlice";
import { getVideos, getStatistics } from "../RTK/videoSlice";
import { change } from "../RTK/inputSlice";
import { openModal } from "../RTK/modalSlice";
import ModalWindow from "../search/ModalWindow";

const FavoritePage = () => {
  const favorites = useSelector(selectFavorites);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [editingFav, setEditingFav] = useState(null);

  const handleExecute = async (fav) => {
    dispatch(change(fav.text));

    const resultVideo = await dispatch(
      getVideos({
        text: fav.text,
        result: fav.maxCount,
        order: fav.sortBy,
      })
    );

    const videos = resultVideo.payload;

    if (videos && videos.length > 0) {
      const ids = videos.map((video) => video.id.videoId).join(",");
      dispatch(getStatistics({ id: ids }));
    }
    navigate("/search");
  };

  const handleEdit = (fav) => {
    setEditingFav(fav);
    dispatch(openModal());
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 500 }}>
        Избранное
      </Typography>

      <Paper
        elevation={0}
        sx={{ border: "1px solid #e0e0e0", borderRadius: "4px" }}
      >
        <List sx={{ p: 0 }}>
          {favorites.map((fav, index) => (
            <Box key={fav.id || index}>
              <ListItem
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  p: 2,
                  "&:hover": { bgcolor: "#f5f5f5" },
                }}
              >
                <Typography sx={{ fontWeight: 600 }}>{fav.name}</Typography>

                <Box sx={{ display: "flex", gap: 2 }}>
                  <Button
                    size="small"
                    onClick={() => handleExecute(fav)}
                    sx={{ textTransform: "none", color: "#1976d2" }}
                  >
                    Выполнить
                  </Button>
                  <Button
                    size="small"
                    color="primary"
                    onClick={() => handleEdit(fav)}
                    sx={{ textTransform: "none" }}
                  >
                    Редактировать
                  </Button>
                  <Button
                    size="small"
                    color="error"
                    onClick={() => dispatch(removeFavorite(fav.id))}
                    sx={{ textTransform: "none" }}
                  >
                    Удалить
                  </Button>
                </Box>
              </ListItem>
              {index < favorites.length - 1 && <Divider />}
            </Box>
          ))}
        </List>
      </Paper>
      <ModalWindow key={editingFav?.id} fav={editingFav} />
    </Container>
  );
};

export default FavoritePage;
