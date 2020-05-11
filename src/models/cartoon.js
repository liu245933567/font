import { cartoonDetail } from '../services/cartoon';

export default {
  namespace: 'cartoon',
  state: {
    sectionList: []
  },

  effects: {
    *changeMessage({ payload }, { call, put }) {
      const { data } = yield call(cartoonDetail, payload);
      if (data && data.isOk) {
        yield put({
          type: 'changeSectionList',
          payload: data.sectios,
        });
      }
    }
  },

  reducers: {
    changeSectionList(state, { payload }) {
      return {
        ...state,
        sectionList: payload,
      };
    }
  }
}