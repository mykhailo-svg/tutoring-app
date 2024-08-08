import { ReactQueryProvider } from "@/providers";
import { ReactNode } from "react";

type RootLayoutProps = {
  children: ReactNode;
};
export const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <ReactQueryProvider>
          <main>{children}</main>
        </ReactQueryProvider>
      </body>
    </html>
  );
};
