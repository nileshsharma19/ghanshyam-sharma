import type { Metadata, Viewport } from "next";
import "./globals.css";
import { WorkProvider } from "@/context/WorkContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MobileBottomBar } from "@/components/MobileBottomBar";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#221108",
};

export const metadata: Metadata = {
  title: "30+ Years Master Carpenter & Interior Woodwork | Ghanshyam Sharma Carpenter",
  description: "30+ वर्षों का अनुभव - मॉड्यूलर किचन, स्लाइडिंग अलमारी, नक्काशीदार मंदिर, डबल बेड और होम इंटीरियर वुडवर्क। सीधे कारीगर से काम करवाएं और बिचौलियों का कमीशन बचाएं।",
  keywords: "Ghanshyam Sharma Carpenter, carpenter, master carpenter, furniture maker, modular kitchen, sliding wardrobe, wooden temple, mandir, teak wood, wood polish, carpenter near me, badhai kaam",
  openGraph: {
    title: "30+ Years Master Carpenter | Ghanshyam Sharma Carpenter",
    description: "Bespoke wooden furniture, modular kitchens, and luxury wood interiors. 30 years experience.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hi" className="scroll-smooth">
      <head>
        <meta name="color-scheme" content="light dark" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const t = localStorage.getItem('ghanshyam_theme_pref') || 'dark';
                document.documentElement.classList.remove('dark', 'light');
                document.documentElement.classList.add(t);
                document.documentElement.setAttribute('data-theme', t);
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className="antialiased min-h-screen flex flex-col bg-stone-950 text-stone-100 selection:bg-amber-600 selection:text-white transition-colors duration-200">
        <WorkProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <MobileBottomBar />
        </WorkProvider>
      </body>
    </html>
  );
}
