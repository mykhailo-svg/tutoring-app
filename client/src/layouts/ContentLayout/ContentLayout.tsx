import { ReactNode } from 'react';

type ContentLayoutProps = {
  children: ReactNode;
};

export const ContentLayout: React.FC<ContentLayoutProps> = ({ children }) => {
  return <div>hello{children}</div>;
};
