import * as privatecontent from './api';

import { privatecontentTranslator } from './translator';

export class PrivatecontentService {
  /**
   * @description 独家放送（入口列表）
   * @returns
   */
  static getPrivatecontent() {
    return privatecontent.getPrivatecontent().then(privatecontentTranslator);
  }

  /**
   * @description 独家放送列表
   * @param {Number} limit : 返回数量 , 默认为 60
   * @param {Number} offset : 偏移数量，用于分页 , 如 :( 页数 -1)*60, 其中 60 为 limit 的值 , 默认为 0
   * @returns
   */
  static getPrivatecontentList(limit: any, offset: any) {
    return privatecontent.getPrivatecontentList({ limit, offset });
  }
}
