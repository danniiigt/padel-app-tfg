import { AdminNavbar } from "../components/AdminNavbar";
import { Box } from "@mui/material";

export const MainLayout = ({ children, userImage, breadcrumbsItems }) => {
  return (
    <>
      <AdminNavbar userImage={userImage} breadcrumbsItems={breadcrumbsItems} />
      <Box sx={{ maxWidth: 1100, paddingX: "16px", marginX: "auto" }}>
        {children}
      </Box>
    </>
  );
};
