import "@mantine/core/styles.css";
import "../styles/globals.css";
import Head from "next/head";
import { MantineProvider } from "@mantine/core";
import { theme } from "../theme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SearchContextProvider from "../contexts/search-context";
import "@mantine/notifications/styles.css";
import { Notifications } from "@mantine/notifications";
import { ModalsProvider } from "@mantine/modals";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: any) {
  return (
    <MantineProvider theme={theme}>
      <Notifications />
      <QueryClientProvider client={queryClient}>
        <SearchContextProvider>
          <ModalsProvider>
            <Head>
              <title>Forum App</title>
              <meta
                name="viewport"
                content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
              />
              <link rel="shortcut icon" href="/favicon.ico" />
            </Head>
            <Component {...pageProps} />
          </ModalsProvider>
        </SearchContextProvider>
      </QueryClientProvider>
    </MantineProvider>
  );
}
