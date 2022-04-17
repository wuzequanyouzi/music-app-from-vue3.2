import { getRequest } from '../index';
import { topUrl } from '@/config/url';

// 新歌速递
const newMusics = `${topUrl}/song`;

export const getNewMusics = (params: any) => {
  return getRequest(newMusics, params);
};
