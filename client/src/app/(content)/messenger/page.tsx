'use client';

import { TextField } from '@/shared/ui/inputs';
import { useState } from 'react';

const Messenger = () => {
  const [text, setText] = useState('');

  return (
    <>
      <TextField label='' onChange={setText} value={text} />
    </>
  );
};

export default Messenger;
