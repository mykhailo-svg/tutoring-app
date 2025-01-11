import { Card } from '@/shared/ui/cards';
import styles from './ProfileGeneralData.module.scss';
import type { USER_ROLE } from '@/global_types';
import { useMemo } from 'react';
import { translateUserRole } from '@/shared/helpers/translateUserRole';
import { MdAlternateEmail as EmailIcon } from 'react-icons/md';

type ProfileGeneralDataProps = {
  name: string | undefined;
  email: string | undefined;
  role: USER_ROLE | undefined;
};

export const ProfileGeneralData: React.FC<ProfileGeneralDataProps> = ({ role, name, email }) => {
  const translatedRole = useMemo(() => translateUserRole(role), [role]);

  return (
    <div className={styles.root}>
      <Card shadow='none'>
        <div className={styles.row}>
          <img
            src='https://images.pexels.com/photos/158063/bellingrath-gardens-alabama-landscape-scenic-158063.jpeg?cs=srgb&dl=pexels-pixabay-158063.jpg&fm=jpg'
            alt='profile'
            className={styles.avatar}
          />
          <div>
            <h4 className={styles.name}>{name}</h4>
            <p className={styles.role}>{translatedRole}</p>

            <div className={styles.email}>
              <EmailIcon />
              <p> {email}</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
