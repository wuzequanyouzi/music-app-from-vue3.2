import * as login from './api';
export class LoginService {
  static phoneLogin(params: any) {
    return login.phoneLogin(params);
  }
}
