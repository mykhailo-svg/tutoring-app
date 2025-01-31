import { LANGUAGE_LEVEL } from '@/global_types';
import { useMemo, useState } from 'react';
import styles from './LanguageLevelPicker.module.scss';
import { OptionList, OptionsListItem } from '@/shared/ui/lists';

type LanguageLevelPickerProps = {};

const AVAILABLE_LEVELS = Object.values(LANGUAGE_LEVEL);

export const LanguageLevelPicker: React.FC<LanguageLevelPickerProps> = () => {
  const options = useMemo<OptionsListItem[]>(
    () => AVAILABLE_LEVELS.map((level) => ({ label: translateLanguageLevel(level), value: level })),
    []
  );

  const [selectedLevel, setSelectedLevel] = useState<LANGUAGE_LEVEL>(LANGUAGE_LEVEL.A1);

  return (
    <div className={styles.root}>
      <OptionList
        label='Language level'
        onSelect={(value) => setSelectedLevel(value as LANGUAGE_LEVEL)}
        selected={selectedLevel}
        options={options}
      />
    </div>
  );
};

function translateLanguageLevel(level: LANGUAGE_LEVEL) {
  const translations: Record<LANGUAGE_LEVEL, string> = {
    [LANGUAGE_LEVEL.A1]: 'Beginner (A1)',
    [LANGUAGE_LEVEL.A2]: 'Elementary (A2)',
    [LANGUAGE_LEVEL.B1]: 'Intermediate (B1)',
    [LANGUAGE_LEVEL.B2]: 'Upper-Intermediate (B2)',
    [LANGUAGE_LEVEL.C1]: 'Advanced (C1)',
    [LANGUAGE_LEVEL.C2]: 'Proficient (C2)',
    [LANGUAGE_LEVEL.NATIVE]: 'Native',
  };

  return translations[level] ?? '';
}
