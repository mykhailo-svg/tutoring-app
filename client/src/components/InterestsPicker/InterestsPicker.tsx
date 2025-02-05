import { useCallback, useMemo } from 'react';
import { INTERESTS_LIST_BY_CATEGORY } from './constants';
import styles from './InterestsPicker.module.scss';
import { getInterestIcon, translateInterest, translateInterestsCategory } from './helpers';
import classNames from 'classnames';

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

type InterestsListProps = {
  items: string[];
  onSelect: (selection: string) => void;
  onDeselect: (interest: string) => void;
  selection: string[];
};

function InterestsList({ items, selection, onDeselect, onSelect }: InterestsListProps) {
  const onItemClick = useCallback(
    (isCurrentlySelected: boolean, interestId: string) => {
      if (isCurrentlySelected) {
        onDeselect(interestId);
      } else {
        onSelect(interestId);
      }
    },
    [onSelect, onDeselect]
  );

  const disabled = useMemo(() => selection.length > 5, [selection]);

  const renderedItems = useMemo(
    () =>
      items.map((item) => {
        const isSelected = selection.indexOf(item) > -1;

        return (
          <div
            onClick={() => {
              onItemClick(isSelected, item);
            }}
            className={classNames(styles.interest, {
              [styles.activeInterest]: isSelected,
              [styles.interestDisabled]: !isSelected && disabled,
            })}
          >
            <img src={getInterestIcon(item)} alt='' /> <span>{translateInterest(item)}</span>
          </div>
        );
      }),
    [onItemClick, items, selection, disabled]
  );

  return <div className={styles.interests}>{renderedItems}</div>;
}
