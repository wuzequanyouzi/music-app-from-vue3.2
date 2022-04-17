import { defineStore } from 'pinia';
import store from '@/store';

interface SongInfo {
  currentPlayingSong: object;
  songPlayList: [];
  songLyricInfo: object;
}

export const useSongStore = defineStore({
  id: 'song-store',
  state: (): SongInfo => ({
    currentPlayingSong: {},
    songPlayList: [],
    songLyricInfo: {}
  }),
  actions: {
    setCurrentPlayingSong(songInfo: object) {
      this.currentPlayingSong = songInfo;
    }
  }
});

// Need to be used outside the setup
export function useSongStoreWithOut() {
  return useSongStore(store);
}
