import { AdminNavbar } from "../components/AdminNavbar";
import { Box } from "@mui/material";
import { NotAuthNavbar } from "../components/NotAuthNavbar";
import { ClientNavBar } from "../components/ClientNavBar";
import { SuperAdminNavbar } from "../components/SuperAdmin/SuperAdminNavbar";

export const MainLayout = ({ children, user, breadcrumbsItems, message }) => {
  if (!user) {
    return (
      <>
        <NotAuthNavbar message={message} />
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
          message={message}
          user={user}
          breadcrumbsItems={breadcrumbsItems}
        />
        <Box sx={{ maxWidth: 1100, paddingX: "16px", marginX: "auto" }}>
          {children}
        </Box>
      </>
    );
  } else if (user?.role == "SUPERADMIN") {
    return (
      <>
        <SuperAdminNavbar message={message} user={user} />
        <Box
          sx={{
            maxWidth: 1100,
            paddingX: "16px",
            marginX: "auto",
            marginTop: "40px",
          }}
        >
          {children}
        </Box>
      </>
    );
  } else {
    return (
      <>
        <ClientNavBar message={message} user={user} />
        <Box sx={{ maxWidth: 1100, paddingX: "16px", marginX: "auto" }}>
          {children}
        </Box>
      </>
    );
  }
};
