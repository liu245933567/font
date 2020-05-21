import { cartoonDetail, cartoonList, sectionDetail } from '../services/cartoon';

export default {
  namespace: 'cartoon',
  state: {
    cartoonList: [],
    sectionList: [],
    selectedCartoon: {},
    // 查询动漫详情的参数
    queryCartoonDetailParams: {
      collectionTag: '',
      sortType: -1,
      pageIndex: 1,
      pageSize: 2000
    },
    sectionInfo: {},
    hasPrev: true,
    hasNext: true
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
    *getSectionDeatil({ payload }, { call, put, select }) {
      let { sectionId, queryType } = payload;
      const { queryCartoonDetailParams, sectionList } = yield select((state) => state.cartoon);
      const { collectionTag, sortType } = queryCartoonDetailParams;

      const sectionIndex = sectionList.findIndex(item => item.sectionId === sectionId);
      const
        max = sectionList.length - 1,
        min = 0,
        prevIndex = sectionIndex - sortType,
        nextIndex = sectionIndex + sortType;
      const hasPrev = prevIndex >= min && prevIndex <= max;
      const hasNext = nextIndex >= min && nextIndex <= max;
      if (queryType === 'prev' && hasPrev) {
        sectionId = sectionList[prevIndex].sectionId;
      } else if (queryType === 'next' && hasNext) {
        sectionId = sectionList[nextIndex].sectionId;
      }
      
      const { data } = yield call(sectionDetail, { sectionId, collectionTag });
      if (data && data.isOk) {
        yield put({
          type: 'changeSectionDeatil',
          payload: { sectionInfo: data.sectionInfo, hasPrev, hasNext }
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
    // 选中动漫
    saveCartoonDetail(state, { payload }) {
      return {
        ...state,
        selectedCartoon: payload,
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
        ...payload
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