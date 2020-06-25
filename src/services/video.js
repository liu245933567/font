import { post } from './axios';
import {
  videoListURL
} from './url';

// 视频列表
export function videoList(params) {
  return post(videoListURL, params);
}
