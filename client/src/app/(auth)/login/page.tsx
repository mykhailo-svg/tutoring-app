import * as Form from "@radix-ui/react-form";
import styles from "./LoginPage.module.scss";
import { AuthRow } from "@/components/AuthRow";

export default function LoginPage() {
  return (
    <AuthRow
      firstColumnContent={
        <div className={styles.formColumn}>
          <Form.Root className={styles.form}>
            <Form.Field name="name">
              <Form.Label className="FormLabel">Email</Form.Label>
              <Form.Control asChild>
                <input className="Input" type="email" required />
              </Form.Control>
            </Form.Field>
          </Form.Root>
        </div>
      }
      secondColumnContent={<div className={styles.questionColumn}> sign</div>}
    />
  );
}
