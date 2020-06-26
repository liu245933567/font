import React from "react";
import { connect } from "dva";
import PropTypes from "prop-types";
import Video from "../../components/Video";
import Scroll from "../../components/Scroll";
import VideoList from "../../components/VideoList";
import NormalPage from "../../components/NormalPage";
const HOST = "http://192.168.31.71:3000";

@connect(
  (state) => {
    return {
      videoList: state.video.videoList,
    };
  },
  (dispatch) => ({
    dispatchGetVideoList(payload) {
      dispatch({
        type: "video/getVideoList",
        payload,
      });
    },
  })
)
export default class Cinema extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      videoSource: "",
    };
    this.changeVideoSource = this.changeVideoSource.bind(this);
  }

  componentDidMount() {
    this.props.dispatchGetVideoList({});
  }

  /**
   * 切换视频源
   * @param {Object} video
   */
  changeVideoSource(video) {
    this.setState({
      videoSource: `${HOST}${video.videoUrl}`,
    });
  }

  render() {
    const { videoList } = this.props;
    const { videoSource } = this.state;
    /** 列表第一个元素的地址 */
    const firstVideoSource = videoList[0] && `${HOST}${videoList[0].videoUrl}`;
    return (
      <NormalPage>
        <div className="Cinema_Page_Wrapper">
          {videoSource || firstVideoSource ? (
            <Video
              sources={[
                {
                  src: videoSource || firstVideoSource,
                  type: "video/mp4",
                },
              ]}
            />
          ) : (
            <div className="liubai"></div>
          )}
          <Scroll>
            <VideoList
              videoList={videoList}
              currentVideoKey={videoSource || firstVideoSource}
              chooseHandle={this.changeVideoSource}
            />
          </Scroll>
        </div>
      </NormalPage>
    );
  }
}

Cinema.propTypes = {
  videoList: PropTypes.array,
  dispatchGetVideoList: PropTypes.func,
  history: PropTypes.object,
};
