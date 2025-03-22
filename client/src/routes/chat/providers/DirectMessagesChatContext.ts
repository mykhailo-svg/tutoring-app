'use client';

import { createContext, type MutableRefObject } from 'react';

type DirectMessagesChatContextValue = {};

export const DirectMessagesChatContext = createContext<DirectMessagesChatContextValue>({});
