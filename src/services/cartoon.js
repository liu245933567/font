import {post} from './axios';

// 动漫列表
export function cartoonList(params) {
  return post(`/cartoon/cartoonList.json`, params);
}

// 章节列表
export function cartoonDetail(params) {
  return post(`/cartoon/cartoonDetail.json`, params);
}
