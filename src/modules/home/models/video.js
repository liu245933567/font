import {
  videoList
} from 'services/video';

export default {
  namespace: 'video',
  state: {
    videoList: []
  },

  effects: {
    // 获取视频列表
    *getVideoList({ payload }, { call, put }) {
      const { data } = yield call(videoList, payload);
      if (data && data.isOk) {
        yield put({
          type: 'changeVideoList',
          payload: data.videoList
        });
      }
    }
  },

  reducers: {
    // 保存动漫列表
    changeVideoList(state, { payload }) {
      return {
        ...state,
        videoList: payload,
      };
    }
  }
}