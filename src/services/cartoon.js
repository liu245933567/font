import {post} from './axios';

export async function queryCurrent(params) {
  return post(`/cartoon/detail.json`, params);
}
