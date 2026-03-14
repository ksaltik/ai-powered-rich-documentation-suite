import { HocuspocusProvider } from '@hocuspocus/provider';
import * as Y from 'yjs';

export const setupCollaboration = (documentName: string) => {
  const ydoc = new Y.Doc();
  const provider = new HocuspocusProvider({
    url: import.meta.env.VITE_WS_URL || 'ws://127.0.0.1:3000',
    name: documentName,
    document: ydoc,
  });

  return { ydoc, provider };
};
