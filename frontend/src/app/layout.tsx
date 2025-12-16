import { ReactNode } from "react";
import '../styles/globals.css'


export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-neutral-950 text-white">
        {children}   {/* Pages render here */}
      </body>
    </html>
  );
}