import * as homepage from './api';
export class HomePageService {
  static getDiscover() {
    return homepage.getDiscover();
  }
}
