import { getRequest } from '../index';
import { personalizedUrl } from '@/config/url';

const mvUrl = `${personalizedUrl}/mv`;

export const getPersonalizedMv = () => {
  return getRequest(mvUrl);
};
