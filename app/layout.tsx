import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import { ThemeProvider } from "@/components/theme-provider";
import { Providers } from "@/app/providers";
import { siteConfig } from "@/lib/site";
import { metadataKeywords } from "./metadata";
import { SiteNav } from "@/components/site-nav";
import { MobileBottomNav } from "@/components/MobileBottomNav";
import Footer from "@/components/footer";
import { ScrollProgress } from "@/components/loading";
import { GoTopButton } from "@/components/go-top-button";
import { VisitorTracker } from "@/components/visitor-tracker";
import { LenisProvider } from "@/components/lenis-provider";
import { ViewTransitionProvider } from "@/components/view-transition-provider";
import "@/app/globals.css";

const pretendard = localFont({
  src: "../node_modules/pretendard/dist/web/variable/woff2/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});

export const viewport: Viewport = {
  themeColor: "black",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,  
  },
  description: siteConfig.description,
  keywords: metadataKeywords,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${pretendard.variable} antialiased`}
      suppressHydrationWarning
    >
      <body>
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const theme = localStorage.getItem('theme') || 'dark';
                if (theme === 'dark') {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
                if (!localStorage.getItem('theme')) {
                  localStorage.setItem('theme', 'dark');
                }
              })();
            `,
          }}
        />
        <LenisProvider>
        <Providers>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <ViewTransitionProvider />
            <ScrollProgress />
            <GoTopButton />
            <VisitorTracker />
            <div id="site-nav-wrapper"><SiteNav /></div>
            <main className="pt-16">
              {children}
            </main>
            <Footer />
            <MobileBottomNav />
          </ThemeProvider>
        </Providers>
        </LenisProvider>
      </body>
    </html>
  );
}
