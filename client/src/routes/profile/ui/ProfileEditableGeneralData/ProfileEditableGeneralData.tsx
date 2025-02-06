import { Button } from '@/shared/ui/buttons';
import { Card } from '@/shared/ui/cards';
import styles from './ProfileEditableGeneralData.module.scss';
import { LanguagesSelectState, LanguagesSelect } from '@/components/LanguagesSelect';
import { useState } from 'react';
import { ProfileInterestsPicker } from '../ProfileInterestsPicker';

type ProfileEditableGeneralDataProps = {};

export const ProfileEditableGeneralData: React.FC<ProfileEditableGeneralDataProps> = () => {
  const [languagesState, setLanguagesState] = useState<LanguagesSelectState>({
    languages: {},
    unsavedLanguage: false,
  });

  return (
    <div className={styles.root}>
      <Card className={styles.card}>
        <h3 className={styles.title}>Languages you understand</h3>
        <div className={styles.cardInner}>
          <LanguagesSelect state={languagesState} setLanguages={setLanguagesState} />
          {/* <InterestsPicker /> */}
          <div className={styles.save}>
            <Button size='small' as='button' text='Save' variant='primary' />
          </div>
        </div>
      </Card>

      <ProfileInterestsPicker />
    </div>
  );
};
