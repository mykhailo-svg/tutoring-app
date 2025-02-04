import { useMemo } from 'react';
import { INTERESTS_LIST_BY_CATEGORY } from './constants';
import styles from './InterestsPicker.module.scss';
import { getInterestIcon, translateInterest } from './helpers';

type InterestsPickerProps = {};

export const InterestsPicker: React.FC<InterestsPickerProps> = () => {
  const renderedInterests = useMemo(() => {
    const categories = Object.keys(
      INTERESTS_LIST_BY_CATEGORY
    ) as (keyof typeof INTERESTS_LIST_BY_CATEGORY)[];

    return categories.map((category) => (
      <div className={styles.category} key={category}>
        <p>{category}</p>
        <InterestsList items={INTERESTS_LIST_BY_CATEGORY[category]} />
      </div>
    ));
  }, []);

  return <div className={styles.root}>{renderedInterests}</div>;
};

type InterestsListProps = {
  items: string[];
};

function InterestsList({ items }: InterestsListProps) {
  const renderedItems = useMemo(
    () =>
      items.map(
        (item) => (
          <div className={styles.interest}>
            <img src={getInterestIcon(item)} alt='' /> <span>{translateInterest(item)}</span>
          </div>
        ),
        [items]
      ),
    []
  );

  return <div className={styles.interests}>{renderedItems}</div>;
}
