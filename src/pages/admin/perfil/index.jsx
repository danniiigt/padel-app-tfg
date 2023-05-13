import { MainLayout } from "@/shared/layouts/MainLayout";
import React, { useEffect, useState } from "react";
import prisma from "../../../../lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { UserEditCard } from "@/shared/components/UserEditCard";
import { Box, Stack, Tab, Tabs, Tooltip, Typography } from "@mui/material";
import { UserBankEditCard } from "@/shared/components/UserBankEditCard";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import Link from "next/link";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,

    sx: {
      padding: 0,
      width: "fit-content",
      height: "fit-content",
      minWidth: 130,
      borderRadius: 1,
      minHeight: 40,
      alignItems: "start",
      paddingLeft: 1.5,

      "&.Mui-selected": {
        borderRight: "none",
        color: "#545454",
        backgroundColor: "#e6e6e6",
      },
    },
  };
}

const PerfilPage = ({ user }) => {
  user = JSON.parse(user);

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const breadcrumbsItems = [
    {
      link: "/admin",
      text: "Dashboard",
    },
    {
      link: "/admin/perfil",
      text: "Perfil",
    },
  ];

  useEffect(() => {
    document.title = `${user.name} - Padel App`;
  }, []);

  return (
    <MainLayout user={user} breadcrumbsItems={breadcrumbsItems}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Box>
          <Typography mt={4} variant="h5">
            Tu Perfil
          </Typography>
          <Typography variant="body2" mb={4} fontWeight={300}>
            Ajustes de tu perfil
          </Typography>
        </Box>
      </Stack>

      <Stack direction="row" spacing={5}>
        <Box>
          <Tabs
            TabIndicatorProps={{
              style: {
                backgroundColor: "#545454",
              },
            }}
            orientation="vertical"
            variant="standard"
            value={value}
            onChange={handleChange}
            sx={{
              width: "fit-content",
            }}
          >
            <Tab disableRipple label="General" {...a11yProps(0)} />
            <Tab disableRipple label="Retiradas" {...a11yProps(1)} />
          </Tabs>
        </Box>

        <Box sx={{ width: "100%" }}>
          <TabPanel
            value={value}
            index={0}
            sx={{ width: "100%" }}
            className="
            animate__animated animate__fadeIn
          "
          >
            <UserEditCard user={user} />
          </TabPanel>
          <TabPanel
            value={value}
            index={1}
            sx={{ width: "100%" }}
            className="
            animate__animated animate__fadeIn
          "
          >
            <UserBankEditCard user={user} />
          </TabPanel>
        </Box>
      </Stack>
    </MainLayout>
  );
};

export const getServerSideProps = async (ctx) => {
  const nextAuthSession = await getServerSession(ctx.req, ctx.res, authOptions);
  let session = null;

  if (nextAuthSession?.user?.user) {
    session = nextAuthSession.user;
  } else {
    session = nextAuthSession;
  }

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

export default PerfilPage;
