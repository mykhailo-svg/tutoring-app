import { Button } from '@/shared/ui/buttons';
import { Card } from '@/shared/ui/cards';
import styles from './ProfileEditableGeneralData.module.scss';
import { LanguagesSelectState, LanguagesSelect } from '@/components/LanguagesSelect';
import { useState } from 'react';

type ProfileEditableGeneralDataProps = {};

export const ProfileEditableGeneralData: React.FC<ProfileEditableGeneralDataProps> = () => {
  const [languagesState, setLanguagesState] = useState<LanguagesSelectState>({
    languages: {},
    unsavedLanguage: false,
  });

  return (
    <Card shadow='none'>
      <LanguagesSelect state={languagesState} setLanguages={setLanguagesState} />
      <div className={styles.save}>
        <Button size='small' as='button' text='Save' variant='primary' />
      </div>
    </Card>
  );
};
