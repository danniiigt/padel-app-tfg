import { Box, Typography } from "@mui/material";
import Link from "next/link";

export const DashboardButton = ({ link, text, icon, delay }) => {
  return (
    <Link
      href={link}
      style={{
        textDecoration: "none",
        color: "inherit",
      }}
      className={`animate__animated animate__fadeInUp delay-${delay}`}
    >
      <Box
        sx={{
          width: "100%",
          backgroundColor: "background.paper",
          padding: 3,
          borderRadius: 1,
          boxShadow:
            "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 2,

          "&:hover": {
            backgroundColor: "#f9f9f9",
            transition: "all 0.4s ease-in-out",
          },
        }}
      >
        <Typography color="primary" alignItems="center" display="flex">
          {icon}
        </Typography>
        <Typography variant="h6" fontWeight={500}>
          {text}
        </Typography>
      </Box>
    </Link>
  );
};
