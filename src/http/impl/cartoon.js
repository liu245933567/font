import {post} from '../conf/axios';
import {
  cartoonDeatilURL
} from '../conf/api';

// 动漫详情
export const cartoonDeatil = (params) =>{
  return post(cartoonDeatilURL,params);
}