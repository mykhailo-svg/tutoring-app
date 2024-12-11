import { Card } from '@/shared/ui/cards';
import styles from './RegisterPageRolesPickerStep.module.scss';
import { USER_ROLE } from '@/global_types';
import type { RegisterPageFields } from '@/routes/register/types';
import type { UseFormSetValue } from 'react-hook-form';
import { CheckCircledIcon as CheckIcon } from '@radix-ui/react-icons';
import classNames from 'classnames';

type RegisterPageRolesPickerStepProps = {
  setFormState: UseFormSetValue<RegisterPageFields>;
  role: USER_ROLE;
};

const AVAILABLE_ROLES = Object.values(USER_ROLE);

const ROLES_CONTENT_MAP: Record<USER_ROLE, { name: string; icon: JSX.Element }> = {
  [USER_ROLE.OWNER]: {
    name: 'Teacher',
    icon: <TeacherIcon />,
  },
  [USER_ROLE.STUDENT]: {
    name: 'Student',
    icon: <StudentIcon />,
  },
};

export const RegisterPageRolesPickerStep: React.FC<RegisterPageRolesPickerStepProps> = ({
  setFormState,
  role: selectedRole,
}) => {
  return (
    <div className={styles.root}>
      {AVAILABLE_ROLES.map((role) => (
        <Card
          onClick={() => {
            setFormState('role', role);
          }}
          active={role === selectedRole}
          hover
          key={role}
        >
          <div className={classNames(styles.itemInner, { [styles.active]: role === selectedRole })}>
            {role === selectedRole && (
              <div className={styles.checkMark}>
                <CheckIcon height='25px' width='25px' />
              </div>
            )}

            <div className={styles.roleIcon}>{ROLES_CONTENT_MAP[role].icon}</div>

            <div className={styles.roleName}>{ROLES_CONTENT_MAP[role].name}</div>
          </div>
        </Card>
      ))}
    </div>
  );
};

function StudentIcon() {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 500 500' fill='none'>
      <path
        fill='#000'
        d='M212 1.3c-3 .7-7.1 2.1-9 3.2A16202 16202 0 0 0 4.2 120.3c-4.9 4.5-4.6 13.6.6 17.8 6.1 4.8 200.6 116.8 204.7 117.8a52.9 52.9 0 0 0 23.1-.4c6.7-2 203.2-116.4 205.7-119.7a12.8 12.8 0 0 0 0-13.6c-1.2-1.7-33.7-21.2-84.9-50.9C243.9 7.5 237.7 4 233.2 2.5A43.5 43.5 0 0 0 212 1.3ZM422.8 172.6l-14.8 8.6v105l-2.3 1.8c-1.3 1-3.6 4.2-5.2 7.2a20.5 20.5 0 0 0-2.9 12.3c0 5.9.5 7.9 2.9 12.4a24.5 24.5 0 0 0 23 13.3c7.3 0 12.7-2.1 17.9-7a22.8 22.8 0 0 0 7.6-18.7c0-8.3-2.1-13.5-7.3-18.5l-3.7-3.4-.2-60.8-.3-60.8-14.7 8.6Z'
      />
      <path
        fill='#000'
        d='M72.2 239.2c.5 51.5-3.4 46.1 60.3 82.8 24.2 14 47.6 26.9 52 28.6 22 8.9 49 9 71.2.4 3.9-1.5 27.1-14.2 51.4-28.1 49.8-28.5 54.4-31.9 59-43.4 2.3-5.8 2.4-6.9 2.7-40.3.2-24.6 0-34.2-.8-34.2-.6 0-28 15.6-60.8 34.7a1404.2 1404.2 0 0 1-66.2 37.2c-5.8 2.3-8 2.5-20.5 2.5-12.8 0-14.6-.2-20.7-2.6-3.7-1.5-33.5-18.2-66.2-37.2-32.7-19-60-34.6-60.6-34.6-.8 0-1 9.2-.8 34.2Z'
      />
    </svg>
  );
}

function TeacherIcon() {
  return (
    <svg viewBox='0 0 500 500' xmlns='http://www.w3.org/2000/svg' fill='none'>
      <path
        fill='#000'
        d='M37.6 2.6a30 30 0 0 0-7.2 5.2C23.6 15 24 2.8 24 169.7v151H14c-8.7 0-10.3.3-12 2-2.7 2.7-2.7 9.3 0 12 1.9 1.9 3.3 2 36.5 2H73v-6a88 88 0 0 1 48-72.1l6.5-3.2-3-2.1a70.3 70.3 0 0 1-24.6-32.7 53.6 53.6 0 0 1-2.4-21c0-12.2.3-14 2.8-20.4a63.7 63.7 0 0 1 67-41.3 64.4 64.4 0 0 1 52.4 41.3c2.5 6.4 2.7 8.2 2.8 20.5 0 11.7-.3 14.5-2.4 20.9a70.3 70.3 0 0 1-24.6 32.7l-3 2 7 3.7a85.2 85.2 0 0 1 21 14.8l4 3.8 26-10.7 26-10.6 10.5-.3 10.4-.2 33.6-62.1c18.4-34.1 34.8-63.4 36.5-65.2 6.4-6.8 18.2-9 26.2-5a28.5 28.5 0 0 1 12.3 13.7c.7 2 1 6.3.8 9.5-.4 5.3-3.1 10.6-38.1 75.4-34.8 64.5-37.7 70.2-37.7 74.7 0 14.6-7 28.8-18.3 37l-4 2.9h83.6c82.4 0 83.7 0 85.7-2 2.7-2.7 2.7-9.3 0-12-1.7-1.7-3.3-2-12-2h-10V169.4c0-145.2-.1-151.4-2-155.2A30 30 0 0 0 449 7C441.8.2 458.9.7 239.9.7 48.9.7 41.5.7 37.6 2.6Z'
      />
      <path
        fill='#000'
        d='M378.8 137.9c-1 .7-18 31.4-37.7 68.3a7411.6 7411.6 0 0 1-37 67.8c-.3.4-2.8-.2-5.4-1.4-4-1.7-6.2-2-12.5-1.7-7 .4-10 1.4-36.6 12.4l-29 11.9-9-9a67.5 67.5 0 0 0-33.1-19.5 84.6 84.6 0 0 0-36.8 0A72.8 72.8 0 0 0 90 318.3c-2 7.3-2 11.4-2 83 0 74 0 75.4 2 77.4s3.3 2 70 2 68 0 70-2 2-3.3 2-64.3v-62.2l34.8-14c34.2-13.8 34.8-14.1 40.4-19.6a26 26 0 0 0 8.5-22.7l-.6-5.5 38.5-71.2c40.9-75.7 41-76 36.4-80.5-2.3-2.3-8.7-2.7-11.3-.8Z'
      />
      <path
        fill='#000'
        d='M144.9 154.6a49.5 49.5 0 0 0-31.2 32 63.9 63.9 0 0 0 0 28.2 48.9 48.9 0 0 0 31.5 32 57.9 57.9 0 0 0 29.8 0 48.9 48.9 0 0 0 31.5-32 63.9 63.9 0 0 0 0-28.2 48.9 48.9 0 0 0-31.5-32 61.3 61.3 0 0 0-30.1 0Z'
      />
    </svg>
  );
}
