import { ComponentPropsWithRef, ReactNode } from "react";
import styles from "./AuthRow.module.scss";
import classNames from "classnames";

interface AuthRowProps extends ComponentPropsWithRef<"div"> {
  firstColumnContent: ReactNode;
  secondColumnContent: ReactNode;
}

export const AuthRow: React.FC<AuthRowProps> = ({
  secondColumnContent,
  firstColumnContent,
  className,
  ...rest
}) => {
  return (
    <div {...rest} className={classNames(styles.root, className)}>
      <div>{firstColumnContent}</div>
      <div>{secondColumnContent}</div>
    </div>
  );
};
