import { Languages, LanguagesSelect, LanguagesSelectState } from '@/components/LanguagesSelect';
import { Button } from '@/shared/ui/buttons';
import { Card } from '@/shared/ui/cards';
import styles from './ProfileLanguageSelect.module.scss';
import { useCallback, useState } from 'react';
import { useUpdateUserGeneralData } from '../../hooks';
import { useAuth } from '@/providers/AuthProvider';

type ProfileLanguageSelectProps = {};

export const ProfileLanguageSelect: React.FC<ProfileLanguageSelectProps> = () => {
  const { data } = useAuth();

  const [languagesState, setLanguagesState] = useState<LanguagesSelectState>({
    languages: (data.user?.spokenLanguagesData as any as Languages<true>) ?? {},
    unsavedLanguage: false,
  });

  const { updateUserGeneralData } = useUpdateUserGeneralData();

  const handleSave = useCallback(() => {
    const formattedLanguagesState = { ...languagesState.languages } as Languages<false>;

    for (const language in formattedLanguagesState) {
      if (!formattedLanguagesState[language]?.level) {
        delete formattedLanguagesState[language];
      }
    }

    updateUserGeneralData({ languages: formattedLanguagesState });
  }, [updateUserGeneralData, languagesState.languages]);

  return (
    <Card className={styles.root}>
      <h3 className={styles.title}>Languages you understand</h3>
      <div className={styles.cardInner}>
        <div className={styles.content}>
          <LanguagesSelect state={languagesState} setLanguages={setLanguagesState} />
        </div>

        <div className={styles.save}>
          <Button onClick={handleSave} size='small' as='button' text='Save' variant='primary' />
        </div>
      </div>
    </Card>
  );
};
