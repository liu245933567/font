import React from "react";
import { connect } from "dva";
import PropTypes from "prop-types";
import { Grid } from "antd-mobile";
import Video from "../../components/Video";
// import {HOST} from 'config'
const HOST = 'http://192.168.31.63:3000'

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
  }

  componentDidMount() {
    this.props.dispatchGetVideoList({});
  }

  render() {
    const { videoList } = this.props;
    const { videoSource } = this.state;
    return (
      <div className="Cinema_Page_Wrapper">
        <div>
          {(videoSource || videoList[0]) ? (
            <Video
              sources={[
                {
                  src: videoSource || `${HOST}${videoList[0].videoUrl}`,
                  type: "video/mp4",
                },
              ]}
            />
          ) : (
            <div className="liubai"></div>
          )}
          <div className="video_info_wrapper">
            <Grid
              data={videoList}
              columnNum={2}
              renderItem={(videoItem) => (
                <div
                  onClick={() => {
                    // this.props.history.push({
                    //   pathname: "/cinema",
                    // });
                    this.setState({
                      videoSource: `${HOST}${videoItem.videoUrl}`
                    })
                  }}
                >
                  <img
                    className="cartoon_coverImage"
                    src={`${HOST}${videoItem.previewImgUrl}`}
                  />
                  <div>
                    <span>{videoItem.fileName}</span>
                  </div>
                </div>
              )}
            />
          </div>
        </div>
      </div>
    );
  }
}

Cinema.propTypes = {
  videoList: PropTypes.array,
  dispatchGetVideoList: PropTypes.func,
  history: PropTypes.object,
};
