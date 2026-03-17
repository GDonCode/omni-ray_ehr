import "./globals.css";
import Providers from './providers'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>

      </head>
      <body>
        <a href="#main-content" className="absolute left-4 -top-20 z-50 bg-[#058080] px-6 py-3 text-white shadow-lg transition-all duration-200 focus:top-4 focus:outline-none focus:ring-2 focus:ring-[#f6d212]">Skip to main content</a>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
