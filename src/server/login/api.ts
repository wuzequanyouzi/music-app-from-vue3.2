import { postRequest } from '../index';

import { loginUrl } from '@/config/url';

const phoneUrl = `${loginUrl}/cellphone`;

// 手机登录
export const phoneLogin = (params: any) => {
  return postRequest(phoneUrl, params);
};
