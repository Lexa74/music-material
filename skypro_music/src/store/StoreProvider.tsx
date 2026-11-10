'use client';

import { useMemo, type ReactNode } from 'react';
import { Provider } from 'react-redux';
import { makeStore } from './store';

interface StoreProviderProps {
  children: ReactNode;
}

export default function StoreProvider({ children }: StoreProviderProps) {
  const store = useMemo(() => makeStore(), []);

  return <Provider store={store}>{children}</Provider>;
}
