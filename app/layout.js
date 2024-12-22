export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-900 text-white">
        <div className="container mx-auto px-4 py-8">{children}</div>
      </body>
    </html>
  );
}
