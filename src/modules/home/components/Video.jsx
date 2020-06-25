import React from "react";
import PropTypes from "prop-types";
// import videojs from "video.js";
/* 不能直接引入js，否则会报错：videojs is not defined 
import 'video.js/dist/lang/zh-CN.js' */
// import video_zhCN from 'video.js/dist/lang/zh-CN.json'
// import video_en from  'video.js/dist/lang/en.json'
// import 'video.js/dist/video-js.css'

// videojs.addLanguage('zh-CN', video_zhCN);
// videojs.addLanguage('en', video_en);
// console.log(videojs)
export default class Video extends React.Component {
  constructor(props) {
    super(props);
    this.videoRef = React.createRef();
    this.player = null;
  }

  componentDidMount() {
    this.player = window.videojs(
      this.videoRef.current,
      {
        // 自动播放
        autoplay: false,
        controls: true,
        ...this.props,
      },
      function onPlayerReady() {
        console.log("onPlayerReady", this);
      }
    );
  }
  shouldComponentUpdate(nextProps) {
    if (this.props.sources[0].src !== nextProps.sources[0].src && this.player) {
      this.player.pause();
      this.player.src(nextProps.sources[0]);
      this.player.load(nextProps.sources[0]);
    }
    return false;
  }
  // destroy player on unmount
  componentWillUnmount() {
    if (this.player) {
      this.player.dispose();
    }
  }
  render() {
    return (
      <div className="Video_Component_Wrapper">
        <div>
          <video ref={this.videoRef} className="video-js"></video>
        </div>
      </div>
    );
  }
}

Video.propTypes = {
  sources: PropTypes.array,
};
