import { useMemo } from 'react';
import { INTERESTS_LIST_BY_CATEGORY } from './constants';
import styles from './InterestsPicker.module.scss';
import { translateInterestsCategory } from './helpers';

import { InterestsList } from './ui';

type InterestsPickerProps = {
  selection: string[];
  onSelect: (selection: string) => void;
  onDeselect: (interest: string) => void;
};

export const InterestsPicker: React.FC<InterestsPickerProps> = ({
  onDeselect,
  onSelect,
  selection,
}) => {
  const renderedInterests = useMemo(() => {
    const categories = Object.keys(
      INTERESTS_LIST_BY_CATEGORY
    ) as (keyof typeof INTERESTS_LIST_BY_CATEGORY)[];

    return categories.map((category) => (
      <div className={styles.category} key={category}>
        <p>{translateInterestsCategory(category)}</p>
        <InterestsList
          selection={selection}
          onDeselect={onDeselect}
          onSelect={onSelect}
          items={INTERESTS_LIST_BY_CATEGORY[category]}
        />
      </div>
    ));
  }, [selection, onDeselect, onSelect]);

  return <div className={styles.root}>{renderedInterests}</div>;
};
