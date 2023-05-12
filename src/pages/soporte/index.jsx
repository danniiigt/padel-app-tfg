import { Typography } from "@mui/material";
import React, { useEffect } from "react";

const SoportePage = () => {
  useEffect(() => {
    document.title = "Soporte - Padel App";
  }, []);

  return (
    <div>
      <Typography>Soporte</Typography>
    </div>
  );
};

export default SoportePage;
