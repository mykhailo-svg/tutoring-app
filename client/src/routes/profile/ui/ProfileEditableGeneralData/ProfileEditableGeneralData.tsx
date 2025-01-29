import { Button } from '@/shared/ui/buttons';
import { Card } from '@/shared/ui/cards';
import styles from './ProfileEditableGeneralData.module.scss';

type ProfileEditableGeneralDataProps = {};

export const ProfileEditableGeneralData: React.FC<ProfileEditableGeneralDataProps> = () => {
  return (
    <Card shadow='none'>
      <div className={styles.save}>
        <Button size='small' as='button' text='Save' variant='primary' />
      </div>
    </Card>
  );
};
