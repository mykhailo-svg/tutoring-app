import { Card } from '@/shared/ui/cards';
import styles from './ProfileGeneralData.module.scss';
import type { USER_ROLE } from '@/global_types';
import { useMemo } from 'react';
import { translateUserRole } from '@/shared/helpers/translateUserRole';
import { MdAlternateEmail as EmailIcon } from 'react-icons/md';
import { Button } from '@/shared/ui/buttons';
import { MdEdit as EditIcon } from 'react-icons/md';
import { UserAvatar } from '@/components/UserAvatar';

type ProfileGeneralDataProps = {
  name: string | undefined;
  email: string | undefined;
  role: USER_ROLE | undefined;
  onGeneralDataEdit?: () => void;
  onAvatarClick?: () => void;
};

export const ProfileGeneralData: React.FC<ProfileGeneralDataProps> = ({
  role,
  name,
  email,
  onGeneralDataEdit,
  onAvatarClick,
}) => {
  const translatedRole = useMemo(() => translateUserRole(role), [role]);

  const canEditGeneralData = useMemo(
    () => typeof onGeneralDataEdit === 'function',
    [onGeneralDataEdit]
  );

  return (
    <div className={styles.root}>
      <Card shadow='none'>
        <div className={styles.row}>
          {canEditGeneralData && (
            <div className={styles.editGeneralData}>
              <Button
                onClick={onGeneralDataEdit}
                size='small'
                as='button'
                text=''
                icon={<EditIcon />}
              />
            </div>
          )}

          <div onClick={onAvatarClick} className={styles.avatar}>
            <UserAvatar iconColor='var(--white-color)' size='medium' role={role} />
          </div>

          <div>
            <h4 className={styles.name}>{name}</h4>
            <p className={styles.role}>{translatedRole}</p>

            <div className={styles.email}>
              <EmailIcon />
              <p>{email}</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
