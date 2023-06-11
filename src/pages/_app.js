import AppLayout from "@/layout/AppLayout";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  const getLayout =
    Component.getLayout || ((page) => <AppLayout>{page}</AppLayout>);
  return <>{getLayout(<Component {...pageProps} />)}</>;
}
