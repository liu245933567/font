import React from "react";
import NavScroll from "./components/NavScroll";
import VideoList from "../../components/VideoList";
import Scroll from "../../components/Scroll";
import { connect } from "dva";
import PropTypes from "prop-types";

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
class Movie extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatchGetVideoList({});
  }
  render() {
    const { videoList } = this.props;
    console.log("videoList", videoList);
    return (
      <div className="Movie_Page_Wrapper">
        <NavScroll />
        <Scroll>
          <VideoList videoList={videoList} />
        </Scroll>
      </div>
    );
  }
}

Movie.propTypes = {
  videoList: PropTypes.array,
  dispatchGetVideoList: PropTypes.func,
};
Movie.defaultProps = {
  videoList: [],
  dispatchGetVideoList: () => {},
};

export default Movie;
