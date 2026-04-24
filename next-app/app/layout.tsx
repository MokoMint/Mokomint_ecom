import "./globals.css";
import Script from "next/script";
import SiteLayout from "../components/Layout";
import { StoreProvider } from "../providers/StoreProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const metadata = {
  title: "Mokomint",
  description: "Mokomint e-commerce ",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.0/css/all.min.css"
          rel="stylesheet"
        />
        <link href="/css/style.css" rel="stylesheet" />
        <link href="/lib/animate/animate.min.css" rel="stylesheet" />
        <link
          href="/lib/owlcarousel/assets/owl.carousel.min.css"
          rel="stylesheet"
        />
        <link rel="icon" href="/img/favicon.ico" />
      </head>
      <body>
        <StoreProvider>
          <SiteLayout>{children}</SiteLayout>
        </StoreProvider>
        <ToastContainer position="top-right" autoClose={3000} theme="light" />
        <Script
          src="https://code.jquery.com/jquery-3.4.1.min.js"
          strategy="beforeInteractive"
        />
        <Script
          src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.bundle.min.js"
          strategy="beforeInteractive"
        />
        <Script
          src="/lib/owlcarousel/owl.carousel.min.js"
          strategy="beforeInteractive"
        />
        <Script src="/js/main.js" strategy="afterInteractive" />
        <script src="https://cdn.jsdelivr.net/gh/Sean-93/newmarquee@v0.9.1/dist/newmarquee-min.js"></script>
      </body>
    </html>
  );
}
