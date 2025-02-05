import { Button } from '@/shared/ui/buttons';
import { Card } from '@/shared/ui/cards';
import styles from './ProfileEditableGeneralData.module.scss';
import { LanguagesSelectState, LanguagesSelect } from '@/components/LanguagesSelect';
import { Dispatch, SetStateAction, useMemo, useState } from 'react';
import { InterestsPicker } from '@/components/InterestsPicker';
import { FaPen as EditIcon } from 'react-icons/fa';
import { useToggle } from '@/shared/hooks';
import { Modal, ModalActions } from '@/shared/ui/modals';

type ProfileEditableGeneralDataProps = {};

export const ProfileEditableGeneralData: React.FC<ProfileEditableGeneralDataProps> = () => {
  const [languagesState, setLanguagesState] = useState<LanguagesSelectState>({
    languages: {},
    unsavedLanguage: false,
  });

  const interestsModalToggler = useToggle(false);

  const [unsavedInterests, setUnsavedInterests] = useState<string[]>([]);

  console.log(unsavedInterests);

  return (
    <div className={styles.root}>
      <InterestsModal
        selectedInterests={unsavedInterests}
        setSelectedInterests={setUnsavedInterests}
        interestsModalToggler={interestsModalToggler}
      />

      <Card className={styles.card}>
        <h3 className={styles.title}>Languages you understand</h3>
        <div className={styles.cardInner}>
          <LanguagesSelect state={languagesState} setLanguages={setLanguagesState} />
          {/* <InterestsPicker /> */}
          <div className={styles.save}>
            <Button size='small' as='button' text='Save' variant='primary' />
          </div>
        </div>
      </Card>

      <Card className={styles.card}>
        <h3 className={styles.title}>Interests</h3>
        <div className={styles.cardInner}>
          <div className={styles.cardContent}>
            <p className={styles.interestsSubtitle}>
              Find common topics to discuss with students. Pick up to 5 things you're most
              interested in.
            </p>
          </div>

          <Button
            onClick={interestsModalToggler.toggle}
            icon={<EditIcon />}
            variant='minor'
            size='small'
            as='button'
            text='Edit interests'
          />
        </div>
      </Card>
    </div>
  );
};

type InterestsModalProps = {
  interestsModalToggler: ReturnType<typeof useToggle>;
  selectedInterests: string[];
  setSelectedInterests: Dispatch<SetStateAction<string[]>>;
};

function InterestsModal({
  interestsModalToggler,
  selectedInterests,
  setSelectedInterests,
}: InterestsModalProps) {
  const modalActions = useMemo<ModalActions>(() => {
    return {
      primary: {
        text: 'Save',
        onAction: () => {},
      },
      secondary: {
        text: 'Answer later',
        onAction: interestsModalToggler.setNotActive,
      },
    };
  }, [interestsModalToggler.setNotActive]);

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
