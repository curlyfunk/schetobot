import { Inter, Montserrat } from 'next/font/google';
import './globals.css';
import { Metadata } from 'next';

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  variable: '--font-sans',
});

const montserrat = Montserrat({
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  variable: '--font-heading',
});

export const metadata: Metadata = {
  title: 'СчетоBot - AI платформа за счетоводни експресни услуги',
  description: 'Автоматизирайте счетоводните си операции с изкуствен интелект. Генерирайте документи, изчислявайте осигуровки и получавайте експертни съвети мигновено.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bg" className={`${inter.variable} ${montserrat.variable}`}>
      <body>
        {children}
      </body>
    </html>
  );
}
