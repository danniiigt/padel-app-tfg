import { AppTheme } from "@/themes/AppTheme";
import { SessionProvider } from "next-auth/react";
import "animate.css";
import "../themes/transitiondelays.css";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Box, LinearProgress } from "@mui/material";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Loading() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = (url) => url !== router.asPath && setLoading(true);
    const handleComplete = (url) => url === router.asPath && setLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  });

  if (loading) {
    return (
      <Box
        sx={{
          width: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 100000,
        }}
      >
        <LinearProgress color="primary" />
      </Box>
    );
  } else {
    return null;
  }
}

export default function App({ Component, pageProps }) {
  return (
    <SessionProvider>
      <AppTheme>
        <Loading />
        <Component {...pageProps} />
        <ToastContainer />
      </AppTheme>
    </SessionProvider>
  );
}
