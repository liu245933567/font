import {
  videoList,
  videoCategories
} from 'services/video';

export default {
  namespace: 'video',
  state: {
    videoList: [],
    categoryList: []
  },

  effects: {
    /** 获取视频列表 */
    *getVideoList({ payload }, { call, put }) {
      const { data } = yield call(videoList, payload);
      if (data && data.isOk) {
        yield put({
          type: 'changeVideoList',
          payload: data.videoList
        });
      }
    },

    /** 获取视频种类列表 */
    *getVideoCategories({ payload }, { call, put }) {
      const { data: categoriesData } = yield call(videoCategories, payload);
      if (categoriesData && categoriesData.isOk && categoriesData.categories.length) {
        const { data: videoListData } = yield call(videoList, { category: categoriesData.categories[0].category });
        yield put({
          type: 'changeCategoryList',
          payload: categoriesData.categories
        });
        if (videoListData && videoListData.isOk) {
          yield put({
            type: 'changeVideoList',
            payload: videoListData.videoList
          });
        }
      }
    }
  },

  reducers: {
    /** 保存视频列表 */
    changeVideoList(state, { payload }) {
      return {
        ...state,
        videoList: payload,
      };
    },

    /** 保存视频种类列表 */
    changeCategoryList(state, { payload }) {
      return {
        ...state,
        categoryList: payload,
      };
    }
  }
}