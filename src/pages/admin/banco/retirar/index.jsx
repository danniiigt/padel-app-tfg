import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import prisma from "../../../../../lib/prisma";
import { MainLayout } from "@/shared/layouts/MainLayout";
import { Typography } from "@mui/material";

const RetirarPage = ({ user }) => {
  user = JSON.parse(user);

  const breadcrumbsItems = [
    {
      link: "/admin",
      text: "Dashboard",
    },
    {
      link: "/admin/banco",
      text: "Banco",
    },
    {
      link: "/admin/banco/retirar",
      text: "Retirar",
    },
  ];

  return (
    <MainLayout user={user} breadcrumbsItems={breadcrumbsItems}>
      <Typography>Retirar saldo!</Typography>
    </MainLayout>
  );
};

export const getServerSideProps = async (ctx) => {
  const session = await getServerSession(ctx.req, ctx.res, authOptions);

  if (!session) {
    return { redirect: { destination: "/auth/login" } };
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session?.user.email,
    },
  });

  if (!session || user.role !== "ADMIN") {
    return { redirect: { destination: "/auth/login" } };
  }

  return {
    props: {
      user: JSON.stringify(user),
    },
  };
};

export default RetirarPage;
