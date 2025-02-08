import styles from './ProfileEditableGeneralData.module.scss';
import { ProfileInterestsPicker } from '../ProfileInterestsPicker';
import { ProfileLanguageSelect } from '../ProfileLanguageSelect';

type ProfileEditableGeneralDataProps = {};

export const ProfileEditableGeneralData: React.FC<ProfileEditableGeneralDataProps> = () => {
  return (
    <div className={styles.root}>
      <ProfileLanguageSelect />
      <ProfileInterestsPicker />
    </div>
  );
};
