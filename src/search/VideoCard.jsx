import { Card, CardContent, CardMedia, Typography, Box } from "@mui/material";

const VideoCard = ({ video, mode }) => {
  const isList = mode === "list";
  const viewCount = video.statistics?.viewCount;
  const formattedViews = viewCount
    ? `${Math.floor(viewCount / 1000).toLocaleString()} тыс. просмотров`
    : "Загрузка...";

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: isList ? "row" : "column",
        width: isList ? "100%" : 270,
        height: isList ? 150 : "auto",
        boxShadow: "none",
        background: "transparent",
        mb: isList ? 4 : 0,
      }}
    >
      <CardMedia
        component="img"
        sx={{
          width: isList ? 245 : "100%",
          height: isList ? "100%" : "auto",
          borderRadius: "12px",
        }}
        image={video.snippet.thumbnails.medium.url}
        alt={video.snippet.title}
      />
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          textAlign: "left",
          p: isList ? "0 0 0 24px" : "12px 0",
          "&:last-child": { pb: 0 },
        }}
      >
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
            WebkitLineClamp: 2,
          }}
        >
          {video.snippet.title}
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "2px" }}>
          <Typography
            variant="body2"
            sx={{
              fontSize: "14px",
              color: "rgba(0, 0, 0, 0.4)",
              lineHeight: "16px",
            }}
          >
            {video.snippet.channelTitle}
          </Typography>

          <Typography
            variant="body2"
            sx={{
              fontSize: "14px",
              color: "rgba(0, 0, 0, 0.4)",
              lineHeight: "16px",
            }}
          >
            {formattedViews}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontSize: "14px" }}
          ></Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default VideoCard;
