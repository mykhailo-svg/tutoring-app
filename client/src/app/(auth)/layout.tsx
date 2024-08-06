import { ReactNode } from "react";
import styles from "./AuthLayout.module.scss";

type AuthLayoutProps = {
  children: ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className={styles.root}>
      <div className={styles.container}>{children}</div>
    </div>
  );
}
