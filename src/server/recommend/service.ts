import * as recommend from './api';

export class RecommendService {
  /**
   * @static
   * @param {Number} limit: 取出数量 , 默认为 30 (不支持 offset)
   * @returns
   * @memberof RecommendService
   */
  static getPersonalized(limit: any) {
    return recommend.getPersonalized({ limit });
  }

  /**
   * @static
   * @param {Number} limit: 取出数量 , 默认为 10 (不支持 offset)
   * @returns
   * @memberof RecommendService
   */
  static getNewSong(limit: any) {
    return recommend.getNewSong({ limit });
  }

  static getDjProgram() {
    return recommend.getDjProgram();
  }

  static getProgramRecommendUrl() {
    return recommend.getProgramRecommendUrl();
  }
}
