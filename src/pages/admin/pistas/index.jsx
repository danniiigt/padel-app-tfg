import { MainLayout } from "../../../shared/layouts/MainLayout";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { PrismaClient } from "@prisma/client";
import { Box, Grid, Typography } from "@mui/material";
import Link from "next/link";

const PistasPage = ({ user }) => {
  return (
    <MainLayout>
      <Box mt={4}>
        <Typography variant="h5" fontWeight={600}>
          Tus pistas
        </Typography>
        <Typography>Tienes un total de {user.pista.length} pistas</Typography>
      </Box>

      <Grid container spacing={4} mt={2}>
        <Grid item xs={4}>
          <Box
            sx={{
              padding: "12px 15px",
              backgroundColor: "background.paper",
              borderRadius: 1,
              boxShadow:
                "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
            }}
          ></Box>
        </Grid>
        <Grid item xs={8}>
          <Box
            sx={{
              padding: "12px 15px",
              backgroundColor: "background.paper",
              borderRadius: "4px 4px 0 0",
              boxShadow:
                "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
            }}
          >
            <Typography variant="h6">Pistas</Typography>
          </Box>
          <Box
            sx={{
              padding: "12px 15px",
              backgroundColor: "#f9fafb",
              borderRadius: "0 0 4px 4px",
              boxShadow:
                "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
            }}
          >
            {user.pista.length === 0 ? (
              <Typography variant="body2" fontWeight={300}>
                ¡Todavía no tienes pistas!{" "}
                <Link
                  href="/admin/pistas/add"
                  style={{
                    display: "inline-block",
                    marginLeft: 3,
                    textDecoration: "none",
                  }}
                >
                  Añadir pista
                </Link>
              </Typography>
            ) : (
              <Typography variant="body2">
                Tienes {user.pista.length} pistas
              </Typography>
            )}
          </Box>
        </Grid>
      </Grid>
    </MainLayout>
  );
};

export const getServerSideProps = async (ctx) => {
  const session = await getServerSession(ctx.req, ctx.res, authOptions);
  const prisma = new PrismaClient();

  const user = await prisma.user.findUnique({
    where: {
      email: session?.user.email,
    },

    include: {
      pista: true,
    },
  });

  if (!session || user.role !== "ADMIN") {
    return { redirect: { destination: "/" } };
  }

  return {
    props: {
      user,
    },
  };
};

export default PistasPage;
