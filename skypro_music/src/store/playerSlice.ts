import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Track } from '@/types/track';

interface PlayerState {
  currentTrack: Track | null;
  isPlaying: boolean;
}

const initialState: PlayerState = {
  currentTrack: null,
  isPlaying: false,
};

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    selectTrack(state, action: PayloadAction<Track>) {
      state.currentTrack = action.payload;
      state.isPlaying = true;
    },
    setPlaying(state, action: PayloadAction<boolean>) {
      state.isPlaying = action.payload && state.currentTrack !== null;
    },
    clearTrack(state) {
      state.currentTrack = null;
      state.isPlaying = false;
    },
  },
});

export const { selectTrack, setPlaying, clearTrack } = playerSlice.actions;
export default playerSlice.reducer;
