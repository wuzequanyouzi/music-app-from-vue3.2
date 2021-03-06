import { getRequest } from '../index';
import { personalizedUrl } from '@/config/url';

const url = `${personalizedUrl}/privatecontent`;

// 独家放送（入口列表）
export const getPrivatecontent = () => {
  return getRequest(url);
};

export const getPrivatecontentList = (params: any) => {
  return getRequest(`${url}/list`, params);
};
