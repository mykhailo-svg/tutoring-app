import classNames from 'classnames';
import { useCallback, useMemo } from 'react';
import { getInterestIcon, translateInterest } from '../../helpers';
import styles from './InterestsList.module.scss';
import { isFunction } from 'lodash';

type InterestsListProps = {
  items: string[];
  onSelect?: (selection: string) => void;
  onDeselect?: (interest: string) => void;
  selection?: string[];
};

export const InterestsList = ({
  items,
  selection = [],
  onDeselect,
  onSelect,
}: InterestsListProps) => {
  const onItemClick = useCallback(
    (isCurrentlySelected: boolean, interestId: string) => {
      if (isCurrentlySelected) {
        if (isFunction(onDeselect)) {
          onDeselect(interestId);
        }
      } else {
        if (isFunction(onSelect)) {
          onSelect(interestId);
        }
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
};
