'use client';

import { Popover } from '@/shared/ui/popovers';
import styles from './UserAuthQuickActions.module.scss';
import { useAuth } from '@/providers/AuthProvider';
import { translateUserRole } from '@/shared/helpers/translateUserRole';
import { Button } from '@/shared/ui/buttons';
import { MdLogout as LogoutIcon } from 'react-icons/md';
import { UserAvatar } from '../UserAvatar';

type UserAuthQuickActionsProps = {};

export const UserAuthQuickActions: React.FC<UserAuthQuickActionsProps> = () => {
  const { data, logout } = useAuth();

  return (
    <Popover
      activator={
        <div className={styles.root}>
          {data.user && (
            <div className={styles.avatar}>
              <UserAvatar
                imageSrc={data.user?.avatar?.display_url}
                role={data.user.role}
                size='small'
              />
            </div>
          )}
        </div>
      }
    >
      <div className={styles.popover}>
        <div className={styles.info}>
          <div className={styles.name}>{data.user?.name}</div>
          <div className={styles.role}>{translateUserRole(data.user?.role)}</div>
        </div>

        <div className={styles.logout}>
          <Button
            icon={<LogoutIcon />}
            onClick={logout}
            size='small'
            fullWidth
            variant='minor'
            as='button'
            text='Logout'
          />
        </div>
      </div>
    </Popover>
  );
};
