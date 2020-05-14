import { cartoonDetail, cartoonList, sectionDetail } from '../services/cartoon';

export default {
  namespace: 'cartoon',
  state: {
    cartoonList: [],
    sectionList: [],
    sectionInfo: null
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
    },

    // 获取动漫详情
    *getSectionDeatil({ payload }, { call, put }) {
      const { data } = yield call(sectionDetail, payload);
      if (data && data.isOk) {
        yield put({
          type: 'changeSectionDeatil',
          payload: data.sectionInfo
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
    },

    changeSectionDeatil(state, { payload }) {
      return {
        ...state,
        sectionInfo: payload
      };
    }
  }
}