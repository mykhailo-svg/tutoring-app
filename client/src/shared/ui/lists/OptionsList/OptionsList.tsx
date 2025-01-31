import { useMemo } from 'react';
import styles from './OptionsList.module.scss';
import classNames from 'classnames';
import { FaCheck as CheckMarkIcon } from 'react-icons/fa6';

export type OptionsListItem = { value: string; label: string };

type OptionListProps = {
  options: OptionsListItem[];
  selected: string;
  label?: string;
  onSelect: (value: string) => void;
};

export const OptionList: React.FC<OptionListProps> = ({ options, selected, label, onSelect }) => {
  const renderedOptions = useMemo(
    () =>
      options.map((option) => {
        const isSelected = selected === option.value;

        return (
          <li
            onClick={() => onSelect(option.value)}
            className={classNames(styles.item, { [styles.selected]: isSelected })}
          >
            <span>{option.label}</span>
            <CheckMarkIcon />
          </li>
        );
      }),
    [options, selected]
  );

  return (
    <div>
      {label && <p className={styles.label}>{label}</p>}
      <ul className={styles.root}>{renderedOptions}</ul>
    </div>
  );
};
