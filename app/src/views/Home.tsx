import { Box, Typography } from "@mui/material";

const Home = () => {
  return (
    <>
      <Box>
        <Typography variant="h5" fontWeight="bold">Welcome to my Phone Book Demo!</Typography>
      </Box>
      <Box mt={3}>
        <Typography variant="h6">
          Please start by clicking "Contacts" on the left side bar.
        </Typography>
      </Box>
    </>
  );
};
export default Home;
