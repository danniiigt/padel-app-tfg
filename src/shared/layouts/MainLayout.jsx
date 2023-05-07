import { AdminNavbar } from "../components/AdminNavbar";
import { Box } from "@mui/material";
import { NotAuthNavbar } from "../components/NotAuthNavbar";
import { ClientNavBar } from "../components/ClientNavBar";

export const MainLayout = ({ children, user, breadcrumbsItems }) => {
  if (!user) {
    return (
      <>
        <NotAuthNavbar />
        <Box sx={{ maxWidth: 1100, paddingX: "16px", marginX: "auto" }}>
          {children}
        </Box>
      </>
    );
  }

  if (user?.role == "ADMIN") {
    return (
      <>
        <AdminNavbar
          userImage={user.image}
          breadcrumbsItems={breadcrumbsItems}
        />
        <Box sx={{ maxWidth: 1100, paddingX: "16px", marginX: "auto" }}>
          {children}
        </Box>
      </>
    );
  } else {
    return (
      <>
        <ClientNavBar user={user} />
        <Box sx={{ maxWidth: 1100, paddingX: "16px", marginX: "auto" }}>
          {children}
        </Box>
      </>
    );
  }
};
