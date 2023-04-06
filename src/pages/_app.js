import { AppTheme } from "@/themes/AppTheme";
import { SessionProvider } from "next-auth/react";

export default function App({ Component, pageProps }) {
  return (
    <SessionProvider>
      <AppTheme>
        <Component {...pageProps} />
      </AppTheme>
    </SessionProvider>
  );
}
