import type { Metadata } from "next";
import { Sora, Inter, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { MobileNav, Fab } from "@/components/layout/mobile-nav";
import { ScrollRestoration } from "@/components/scroll-restoration";
import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Appmigo — Simple Mobile Experiences",
    template: "%s | Appmigo",
  },
  description:
    "Appmigo creates mobile games that bring joy and mental stimulation to millions of players worldwide.",
  keywords: [
    "Appmigo",
    "mobile games",
    "puzzle games",
    "brain training",
    "Android games",
    "iOS games",
  ],
  openGraph: {
    title: "Appmigo — Simple Mobile Experiences",
    description:
      "Appmigo creates mobile games that bring joy and mental stimulation to millions of players worldwide.",
    siteName: "Appmigo",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Appmigo — Simple Mobile Experiences",
    description:
      "Appmigo creates mobile games that bring joy and mental stimulation to millions of players worldwide.",
  },
  icons: {
    icon: [
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: '/appmigo-icon.svg',
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
    <html
      lang="en"
      suppressHydrationWarning
      className={`${sora.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <meta name="color-scheme" content="light dark" />
      </head>
      <body className="min-h-screen flex flex-col antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ScrollRestoration />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <MobileNav />
          <Fab />
        </ThemeProvider>
      </body>
    </html>
  );
}
