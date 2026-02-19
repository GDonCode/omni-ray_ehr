import "./globals.css"; // Ensure global styles are imported

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Noticia+Text:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <a href="#main-content" className="absolute left-4 -top-20 z-50 bg-[#058080] px-6 py-3 text-white shadow-lg transition-all duration-200 focus:top-4 focus:outline-none focus:ring-2 focus:ring-[#f6d212]">Skip to main content</a>
        {children}
      </body>
    </html>
  );
}
