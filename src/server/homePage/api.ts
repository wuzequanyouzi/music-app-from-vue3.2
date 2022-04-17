import { getRequest } from '../index';

import { homePageUrl } from '@/config/url';

const url = `${homePageUrl}/block`;

// 首页发现
export const getDiscover = () => {
  return getRequest(`${url}/page`);
};
