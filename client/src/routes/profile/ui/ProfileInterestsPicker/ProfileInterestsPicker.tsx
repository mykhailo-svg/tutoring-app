import { InterestsList, InterestsPicker } from '@/components/InterestsPicker';
import { useToggle } from '@/shared/hooks';
import { ModalActions, Modal } from '@/shared/ui/modals';
import { Dispatch, SetStateAction, useCallback, useMemo, useState } from 'react';
import styles from './ProfileInterestsPicker.module.scss';
import { Button } from '@/shared/ui/buttons';
import { Card } from '@/shared/ui/cards';
import { useAuth } from '@/providers/AuthProvider';
import { useUpdateUserGeneralData } from '../../hooks';
import { FaPen as EditIcon } from 'react-icons/fa';

type ProfileInterestsPickerProps = {};

export const ProfileInterestsPicker: React.FC<ProfileInterestsPickerProps> = () => {
  const { data } = useAuth();

  const interestsModalToggler = useToggle(false);

  const [interests, setInterests] = useState<string[]>(data.user?.interests ?? []);

  const [unsavedInterests, setUnsavedInterests] = useState<string[]>(interests);

  const { updateUserGeneralData } = useUpdateUserGeneralData();

  const handleInterestsSave = useCallback(() => {
    const action = async () => {
      const updatedData = await updateUserGeneralData({ interests: unsavedInterests });
      if (updatedData.status === 200) {
        setInterests(unsavedInterests);
      }
    };

    action();
  }, [updateUserGeneralData, setInterests, unsavedInterests]);

  return (
    <Card className={styles.root}>
      <InterestsModal
        onSave={handleInterestsSave}
        selectedInterests={unsavedInterests}
        setSelectedInterests={setUnsavedInterests}
        interestsModalToggler={interestsModalToggler}
      />
      <h3 className={styles.title}>Interests</h3>
      <div className={styles.inner}>
        <div className={styles.content}>
          <p className={styles.subtitle}>
            Find common topics to discuss with students. Pick up to 5 things you're most interested
            in.
          </p>
        </div>

        <InterestsList items={interests} />

        <Button
          onClick={interestsModalToggler.toggle}
          icon={<EditIcon />}
          variant='primary'
          size='small'
          as='button'
          text='Edit interests'
        />
      </div>
    </Card>
  );
};

type InterestsModalProps = {
  interestsModalToggler: ReturnType<typeof useToggle>;
  selectedInterests: string[];
  onSave: () => void;
  setSelectedInterests: Dispatch<SetStateAction<string[]>>;
};

function InterestsModal({
  interestsModalToggler,
  selectedInterests,
  setSelectedInterests,
  onSave,
}: InterestsModalProps) {
  const modalActions = useMemo<ModalActions>(() => {
    return {
      primary: {
        text: 'Save',
        onAction: onSave,
      },
      secondary: {
        text: 'Answer later',
        onAction: interestsModalToggler.setNotActive,
      },
    };
  }, [interestsModalToggler.setNotActive, onSave]);

  return (
    <Modal
      title='Edit interests'
      actions={modalActions}
      open={interestsModalToggler.isActive}
      onClose={interestsModalToggler.setNotActive}
      onOpen={interestsModalToggler.setActive}
    >
      <div className={styles.interestsModalInner}>
        <div className={styles.interestsModalHeading}>
          <p className={styles.interestsModalSubtitle}>
            Select up to 5 interests to find people you are on the same wave with!
          </p>
        </div>

        <InterestsPicker
          onDeselect={(interestId) => {
            setSelectedInterests((prevState) => prevState.filter((el) => el !== interestId));
          }}
          onSelect={(interestId) => {
            setSelectedInterests((prevState) => [...prevState, interestId]);
          }}
          selection={selectedInterests}
        />
      </div>
    </Modal>
  );
}
