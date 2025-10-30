import { Montserrat } from 'next/font/google';
import './globals.css';

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-body', 
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={montserrat.variable}> 
      <body className="bg-page-bg"> 
        {children}
      </body>
    </html>
  );
}