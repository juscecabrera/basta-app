import './globals.css';

export const metadata = {
  title: 'Basta Multijugador',
  description: 'Juego de Basta multijugador',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}