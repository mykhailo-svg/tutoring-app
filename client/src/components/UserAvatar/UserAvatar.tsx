import { USER_ROLE } from '@/global_types';
import { FC, useMemo } from 'react';
import { FaChalkboardTeacher as TeacherIcon, FaRegUser as UserIcon } from 'react-icons/fa';
import { PiStudentBold as StudentIcon } from 'react-icons/pi';
import styles from './UserAvatar.module.scss';
import { UserAvatarSize } from './types';
import classNames from 'classnames';

const USER_ROLE_ICON_DEFINITION: Record<USER_ROLE, FC> = {
  [USER_ROLE.OWNER]: TeacherIcon,
  [USER_ROLE.STUDENT]: StudentIcon,
};

const SIZE_CLASSNAME_MAP: Record<UserAvatarSize, string> = {
  huge: styles.huge,
  small: styles.small,
  medium: styles.medium,
  thumbnail: styles.thumbnail,
};

type UserAvatarProps = {
  role?: USER_ROLE;
  size?: UserAvatarSize;
  iconColor?: string;
  backgroundColor?: string;
  imageSrc?: string | null;
};

export const UserAvatar: React.FC<UserAvatarProps> = ({
  role,
  size = 'small',
  iconColor = 'var(--primary-color)',
  imageSrc,
  backgroundColor,
}) => {
  const Icon = useMemo(() => (role && USER_ROLE_ICON_DEFINITION[role]) ?? UserIcon, [role]);

  const rootClassName = useMemo(() => classNames(styles.root, SIZE_CLASSNAME_MAP[size]), [size]);

  return (
    <div style={{ background: !imageSrc ? backgroundColor : undefined }} className={rootClassName}>
      {imageSrc ? <img src={imageSrc} /> : <Icon color={iconColor} />}
    </div>
  );
};
