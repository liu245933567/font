import { login } from 'services/base';

export default {
  namespace: 'user',
  state: {
    cartoonList: []
  },

  effects: {
    // 获取动漫列表
    *toLogin({ payload }, { call }) {
      const { data } = yield call(login, payload);
      console.log(data);
    }
  },

  reducers: {
    // 保存动漫列表
    changeCartoonList(state, { payload }) {
      return {
        ...state,
        cartoonList: payload,
      };
    }
  }
}