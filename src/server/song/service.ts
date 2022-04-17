import * as song from './api';
export class SongService {
  static getSongSheetDetail(params: any) {
    return song.getSongSheetDetail(params);
  }
  static getSongDetail(params: any) {
    return song.getSongDetail(params);
  }
  static getSongMp3Url(params: any) {
    return song.getSongMp3Url(params);
  }
  static getSongLyric(params: any) {
    return song.getSongLyric(params);
  }
}
