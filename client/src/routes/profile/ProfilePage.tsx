'use client';

import { useAuth } from '@/providers/AuthProvider';
import { ProfileGeneralData } from './ui';
import { useToggle } from '@/shared/hooks';
import { Modal } from '@/shared/ui/modals/Modal';
import { Button } from '@/shared/ui/buttons';
import { ChangeEvent, useRef, useState } from 'react';

const ProfilePage = () => {
  const {
    data: { user },
  } = useAuth();

  const editAvatarModalToggler = useToggle();

  const filePickerRef = useRef<HTMLInputElement | null>(null);

  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  const openFilePicker = () => {
    if (filePickerRef.current) {
      filePickerRef.current.click();
    }
  };

  const handleImageSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;

    if (file) {
      const uploadFile = async () => {
        const formData = new FormData();

        formData.append('file', file);
        // formData.append('key', '307a45fc4c0c9c040cca8449bba8fab3');

        const upload = await fetch('http://localhost:5000/api/user/upload', {
          body: formData,
          method: 'POST',
        });
      };

      uploadFile();

      const fileReader = new FileReader();

      fileReader.onload = (ev) => {
        if (typeof fileReader.result === 'string') {
          setSelectedFile(fileReader.result);
        }
      };

      fileReader.readAsDataURL(file);
    }
  };

  return (
    <>
      <Modal
        title='Profile photo'
        open={editAvatarModalToggler.isActive}
        onClose={editAvatarModalToggler.setNotActive}
        onOpen={editAvatarModalToggler.setActive}
      >
       <div style={{padding:"20px"}}>
         {selectedFile && (
           <div>
             <img src={selectedFile} />
           </div>
         )}
        
         <input hidden onChange={handleImageSelect} type='file' ref={filePickerRef} />
        
         <Button
           as='button'
           onClick={openFilePicker}
           variant='primary'
           size='medium'
           text='Pick image'
         />
       </div>
      </Modal>
      <ProfileGeneralData
        onAvatarClick={editAvatarModalToggler.toggle}
        name={user?.name}
        role={user?.role}
        email={user?.email}
      />
    </>
  );
};

export default ProfilePage;
