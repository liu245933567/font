import { cartoonDetail, cartoonList, sectionDetail } from '../services/cartoon';

export default {
  namespace: 'cartoon',
  state: {
    cartoonList: [],
    sectionList: [],
    // 查询动漫详情的参数
    queryCartoonDetailParams: {
      collectionTag: '',
      sortType: -1,
      pageIndex: 1,
      pageSize: 2000
    },
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
    *getCartoonDeatil({ payload }, { call, put, select }) {
      const { queryCartoonDetailParams } = yield select((state) => state.cartoon);
      const { data } = yield call(cartoonDetail, queryCartoonDetailParams);
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
    // 保存动漫列表
    changeCartoonList(state, { payload }) {
      return {
        ...state,
        cartoonList: payload,
      };
    },
    // 保存章节列表
    changeSectionList(state, { payload }) {
      return {
        ...state,
        sectionList: payload,
      };
    },
    // 保存章节详情
    changeSectionDeatil(state, { payload }) {
      return {
        ...state,
        sectionInfo: payload
      };
    },
    // 更改查询动漫详情的参数
    changeQueryCartoonDetailParams(state, { payload }) {
      return {
        ...state,
        queryCartoonDetailParams: {
          ...state.queryCartoonDetailParams,
          ...payload
        }
      }
    }
  }
}