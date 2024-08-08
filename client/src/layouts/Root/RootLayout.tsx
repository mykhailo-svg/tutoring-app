import { ReactQueryProvider } from "@/providers";
import { ReactNode } from "react";
import favicon from "../../../public/favicon.ico"

type RootLayoutProps = {
  children: ReactNode;
};
export const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href={favicon.src} sizes="any" />
      </head>
      <body>
        <ReactQueryProvider>
          <main>{children}</main>
        </ReactQueryProvider>
      </body>
    </html>
  );
};
