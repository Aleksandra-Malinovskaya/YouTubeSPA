import { Card, CardContent, CardMedia, Typography } from "@mui/material";

const VideoCard = ({ video, mode }) => {
  const isList = mode === "list";

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: isList ? "row" : "column",
        width: isList ? "100%" : 270,
        height: isList ? 150 : "auto",
        boxShadow: "none",
        background: "transparent",
      }}
    >
      <CardMedia
        component="img"
        sx={{
          width: isList ? 250 : "100%",
          height: isList ? "100%" : "auto",
          borderRadius: "8px",
        }}
        image={video.snippet.thumbnails.medium.url}
        alt={video.snippet.title}
      />
      <CardContent>
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: 600,
            lineHeight: "20px",
            fontSize: "16px",
            mb: 1,
            display: "-webkit-box",
            overflow: "hidden",
            height: "40px",
          }}
        >
          {video.snippet.title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ fontSize: "14px" }}
        >
          {video.snippet.channelTitle}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ fontSize: "14px" }}
        ></Typography>
      </CardContent>
    </Card>
  );
};

export default VideoCard;
