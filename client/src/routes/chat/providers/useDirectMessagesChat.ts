'use client';

import { useContext } from 'react';
import { DirectMessagesChatContext } from './DirectMessagesChatContext';

export const useDirectMessagesChat = () => {
  const context = useContext(DirectMessagesChatContext);

  return context;
};
