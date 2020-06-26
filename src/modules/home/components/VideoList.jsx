/*
 * @Author: LiuYh
 * @Description: 视频列表组件
 * @Date: 2020-06-26 17:01:18
 * @Last Modified by: LiuYh
 * @Last Modified time: 2020-06-26 19:52:30
 */

import React from "react";
import Scroll from "./Scroll";
import PropTypes from "prop-types";

const HOST = "http://192.168.31.71:3000";

const VideoList = ({ videoList }) => {
  console.log("videoList ---", videoList);
  return (
    <div className="VideoList_Component_Wrapper">
      <Scroll>
        <div className="videos_wrapper">
          {videoList.map((video) => {
            return (
              <div className="video_item" key={video.createdTime}>
                <div className="video_preview_wrapper">
                  <img
                    className="video_preview_src"
                    src={`${HOST}${video.previewImgUrl}`}
                  />
                  <div className="video_preview_info">
                    <div className="video_info amount_play">暂无</div>
                    <div className="video_info bullet_screen_amount">暂无</div>
                  </div>
                </div>
                <div className="video_name">{video.fileName}</div>
              </div>
            );
          })}
        </div>
      </Scroll>
    </div>
  );
};

VideoList.propTypes = {
  videoList: PropTypes.array,
};
VideoList.defaultProps = {
  videoList: [],
};

export default VideoList;
