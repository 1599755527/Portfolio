import type { Metadata } from 'next';
import './globals.css';
import './english.css';

export const metadata: Metadata = {
  title: "Dennis Fei — Game Designer / Systems Designer / Level Designer",
  description: "The game design portfolio of Dennis Fei.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="antialiased"
      >
        {children}
      </body>
    </html>
  );
}
