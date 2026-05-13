import {
  TextField,
  Button,
  Box,
  Typography,
  Modal,
  Select,
  MenuItem,
  Slider,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectValue } from "../RTK/inputSlice";
import { add, edit } from "../RTK/favoriteSlice";
import { closeModal, selectModal } from "../RTK/modalSlice";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const ModalWindow = ({ fav = null }) => {
  const isopen = useSelector(selectModal);
  const text = useSelector(selectValue);
  const [queryText, setQueryText] = useState("");
  const [saveName, setSaveName] = useState("");
  const [sortBy, setSortBy] = useState("relevance");
  const [maxCount, setMaxCount] = useState(25);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isopen) {
      setQueryText(fav ? fav.text : text);
      setSaveName(fav ? fav.name : "");
      setSortBy(fav ? fav.sortBy : "relevance");
      setMaxCount(fav ? fav.maxCount : 25);
    }
  }, [isopen, fav, text]);

  const handleSave = () => {
    const payload = {
      id: fav ? fav.id : crypto.randomUUID(),
      text: queryText,
      name: saveName,
      sortBy: sortBy,
      maxCount: maxCount,
    };
    if (fav) {
      dispatch(edit(payload));
    } else {
      dispatch(add(payload));
    }

    setSaveName("");
    setSortBy("relevance");
    setMaxCount(25);
    dispatch(closeModal());
  };
  const handleNotSave = () => {
    setSaveName("");
    setSortBy("relevance");
    setMaxCount(25);
    dispatch(closeModal());
  };
  return (
    <Modal open={isopen} onClose={() => dispatch(closeModal())}>
      <Box sx={style}>
        <Typography
          variant="h6"
          sx={{ fontWeight: 600, mb: 1, textAlign: "center" }}
        >
          Сохранить запрос
        </Typography>

        <Box>
          <Typography variant="body2" sx={{ mb: 0.5 }}>
            Запрос
          </Typography>
          <TextField
            fullWidth
            size="small"
            value={queryText}
            onChange={(e) => setQueryText(e.target.value)}
            disabled={!fav}
          />
        </Box>

        <Box>
          <Typography variant="body2" sx={{ mb: 0.5 }}>
            <span style={{ color: "red" }}>*</span> Название
          </Typography>
          <TextField
            fullWidth
            size="small"
            placeholder="Укажите название"
            value={saveName}
            onChange={(e) => setSaveName(e.target.value)}
          />
        </Box>

        <Box>
          <Typography variant="body2" sx={{ mb: 0.5 }}>
            Сортировать по
          </Typography>
          <Select
            fullWidth
            size="small"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <MenuItem value="relevance">Без сортировки</MenuItem>
            <MenuItem value="date">По дате</MenuItem>
            <MenuItem value="rating">По рейтингу</MenuItem>
          </Select>
        </Box>

        <Box>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Максимальное количество
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Slider
              value={maxCount}
              min={0}
              max={50}
              onChange={(e, val) => setMaxCount(val)}
              sx={{ flexGrow: 1 }}
            />
            <Box
              sx={{
                border: "1px solid #ccc",
                p: "5px 15px",
                borderRadius: "4px",
                minWidth: "40px",
                textAlign: "center",
              }}
            >
              {maxCount}
            </Box>
          </Box>
        </Box>

        <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
          <Button
            fullWidth
            variant="outlined"
            onClick={handleNotSave}
            sx={{ textTransform: "none" }}
          >
            Не сохранять
          </Button>
          <Button
            onClick={handleSave}
            fullWidth
            variant="contained"
            sx={{ textTransform: "none" }}
          >
            Сохранить
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalWindow;
