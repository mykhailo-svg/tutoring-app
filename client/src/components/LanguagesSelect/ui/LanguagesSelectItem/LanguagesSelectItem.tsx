import { Button } from '@/shared/ui/buttons';
import styles from './LanguagesSelectItem.module.scss';
import { Popover } from '@/shared/ui/popovers';
import { LanguagesList } from '../LanguagesList';
import { LanguageLevelPicker } from '../LanguageLevelPicker';
import classNames from 'classnames';
import { MdDelete as DeleteIcon } from 'react-icons/md';

type LanguagesSelectItemProps = {
  language: {
    label: string;
    value: string;
  } | null;
};

export const LanguagesSelectItem: React.FC<LanguagesSelectItemProps> = () => {
  return (
    <div className={styles.root}>
      <Popover activator={<Button as='button' variant='secondary' size='small' text='Select' />}>
        <LanguagesList />
      </Popover>

      <Popover activator={<Button as='button' variant='secondary' size='small' text='Select' />}>
        <LanguageLevelPicker />
      </Popover>

      <div className={classNames(styles.remove)}>
        <Button size='small' as='button' icon={<DeleteIcon />} />
      </div>
    </div>
  );
};
