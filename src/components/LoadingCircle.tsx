import { Box, CircularProgress } from "@mui/material";

export default function LoadingCircle({
  isDisplayed,
}: {
  isDisplayed: boolean;
}) {
  return (
    <div>
      {isDisplayed ? (
        <Box position="absolute" top="50%" left="50%" sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      ) : (
        <div></div>
      )}
    </div>
  );
}
