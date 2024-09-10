import "@mantine/core/styles.css";
import Head from "next/head";
import { MantineProvider } from "@mantine/core";
import { theme } from "../theme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SearchContextProvider from "../contexts/search-context";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: any) {
  return (
    <MantineProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <SearchContextProvider>
          <Head>
            <title>Forum App</title>
            <meta
              name="viewport"
              content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
            />
            <link rel="shortcut icon" href="/favicon.ico" />
          </Head>
          <Component {...pageProps} />
        </SearchContextProvider>
      </QueryClientProvider>
    </MantineProvider>
  );
}
