import {post} from './axios';

export function cartoonDetail(params) {
  return post(`/cartoon/detail.json`, params);
}
