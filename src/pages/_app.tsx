import { AppProps } from "next/app";
import { Header } from "../components/Header";
import {SessionProvider as NextAuth} from 'next-auth/react'

import "../styles/global.scss";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NextAuth session={pageProps.session}>
      <Header />
      <Component {...pageProps} />
    </NextAuth>
  );
}

export default MyApp;
