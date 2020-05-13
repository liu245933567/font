import { cartoonDetail, cartoonList } from '../services/cartoon';

export default {
  namespace: 'cartoon',
  state: {
    cartoonList: [],
    sectionList: []
  },

  effects: {
    // 获取动漫列表
    *getCartoonList({ payload }, { call, put }) {
      const { data } = yield call(cartoonList, payload);
      console.log(data);
      if (data && data.isOk) {
        yield put({
          type: 'changeCartoonList',
          payload: data.cartoonList,
        });
      }
    },

    // 获取动漫详情
    *getCartoonDeatil({ payload }, { call, put }) {
      const { data } = yield call(cartoonDetail, payload);
      if (data && data.isOk) {
        yield put({
          type: 'changeSectionList',
          payload: data.sectioList,
        });
      }
    }
  },

  reducers: {
    changeCartoonList(state, { payload }) {
      return {
        ...state,
        cartoonList: payload,
      };
    },

    changeSectionList(state, { payload }) {
      return {
        ...state,
        sectionList: payload,
      };
    }
  }
}