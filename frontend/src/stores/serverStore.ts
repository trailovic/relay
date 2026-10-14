import { create } from 'zustand';

type ServerStatus = 'idle' | 'checking' | 'online' | 'offline';

type ServerState = {
  status: ServerStatus;
  setStatus: (status: ServerStatus) => void;
};

export const useServerStore = create<ServerState>((set) => ({
  status: 'idle',
  setStatus: (status) => set({ status }),
}));