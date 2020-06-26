/*
 * @Author: LiuYh
 * @Description: 视频列表组件
 * @Date: 2020-06-26 17:01:18
 * @Last Modified by: LiuYh
 * @Last Modified time: 2020-06-26 23:12:05
 */

import React from "react";
// import Scroll from "./Scroll";
import PropTypes from "prop-types";
import LazyLoad from "react-lazyload";
import {STATICHOST} from 'config';

const VideoList = ({ videoList, currentVideoKey, chooseHandle }) => {
  return (
    <div className="VideoList_Component_Wrapper">
      {/* <Scroll> */}
      <div className="videos_wrapper">
        {videoList.map((video, index) => {
          return (
            <div
              className="video_item"
              key={video.createdTime + index}
              onClick={() => {
                chooseHandle(video);
              }}
            >
              <div className="video_preview_wrapper">
                <LazyLoad height={'2.6rem'} once>
                  <img
                    className="video_preview_src"
                    src={`${STATICHOST}${video.previewImgUrl}`}
                  />
                </LazyLoad>
                {/* <img
                  className="video_preview_src"
                  src={`${STATICHOST}${video.previewImgUrl}`}
                /> */}
                <div className="video_preview_info">
                  <div className="video_info amount_play">暂无</div>
                  <div className="video_info bullet_screen_amount">暂无</div>
                </div>
              </div>
              <div
                className={`video_name ${
                  STATICHOST + video.videoUrl === currentVideoKey &&
                  "video_name_watching"
                }`}
              >
                {video.fileName}
              </div>
            </div>
          );
        })}
      </div>
      {/* </Scroll> */}
    </div>
  );
};

VideoList.propTypes = {
  videoList: PropTypes.array,
  currentVideoKey: PropTypes.string,
  chooseHandle: PropTypes.func,
};
VideoList.defaultProps = {
  videoList: [],
  currentVideoKey: "",
  chooseHandle: () => {},
};

export default VideoList;
