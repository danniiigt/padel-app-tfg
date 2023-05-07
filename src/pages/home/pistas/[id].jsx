import { MainLayout } from "@/shared/layouts/MainLayout";
import { Typography } from "@mui/material";

const PistaPage = ({ id }) => {
  return (
    <MainLayout>
      <Typography>Pista con Id {id}</Typography>
    </MainLayout>
  );
};

export default PistaPage;
