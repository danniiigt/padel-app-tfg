import { Navbar } from "../components/Navbar";
import { Box } from "@mui/material";

export const MainLayout = ({ children, userImage }) => {
  return (
    <>
      <Navbar userImage={userImage} />
      <Box sx={{ maxWidth: 1100, paddingX: "12px", marginX: "auto" }}>
        {children}
      </Box>
    </>
  );
};
