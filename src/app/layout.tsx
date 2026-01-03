import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const ibmPlexSansKR = localFont({
  src: [
    {
      path: "../../public/fonts/IBM_Plex_Sans_KR/IBMPlexSansKR-Thin.ttf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../../public/fonts/IBM_Plex_Sans_KR/IBMPlexSansKR-ExtraLight.ttf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../../public/fonts/IBM_Plex_Sans_KR/IBMPlexSansKR-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/IBM_Plex_Sans_KR/IBMPlexSansKR-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/IBM_Plex_Sans_KR/IBMPlexSansKR-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/IBM_Plex_Sans_KR/IBMPlexSansKR-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/IBM_Plex_Sans_KR/IBMPlexSansKR-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-ibm-plex",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hyunjae's Personal Website",
  description: "Software Engineer Hyunjae's Portfolio - Web Development, AI, and more.",
  openGraph: {
    title: "Hyunjae's Personal Website",
    description: "Welcome to Hyunjae's Portfolio. Explore my projects, career, and skills.",
    url: "https://hyunzai.com",
    siteName: "Hyunjae's Portfolio",
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hyunjae's Personal Website",
    description: "Software Engineer Hyunjae's Portfolio",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${ibmPlexSansKR.className} ${ibmPlexSansKR.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
