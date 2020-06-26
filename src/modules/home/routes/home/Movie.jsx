import React from "react";
import NavScroll from "./components/NavScroll";
import VideoList from "../../components/VideoList";
import Scroll from "../../components/Scroll";
import { connect } from "dva";
import PropTypes from "prop-types";

@connect(
  ({ video }) => {
    const { videoList, categoryList } = video;
    return {
      videoList,
      categoryList,
    };
  },
  (dispatch) => ({
    dispatchGetVideoList(payload) {
      dispatch({
        type: "video/getVideoList",
        payload,
      });
    },
    dispatchGetVideoCategories(payload) {
      dispatch({
        type: "video/getVideoCategories",
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
    // this.props.dispatchGetVideoList({});
    this.props.dispatchGetVideoCategories({});
  }
  render() {
    const { videoList, categoryList } = this.props;
    console.log("videoList", videoList);
    return (
      <div className="Movie_Page_Wrapper">
        <NavScroll categoryList={categoryList} chooseHandle={() => {}}/>
        <Scroll>
          <VideoList videoList={videoList} />
        </Scroll>
      </div>
    );
  }
}

Movie.propTypes = {
  videoList: PropTypes.array,
  categoryList: PropTypes.array,
  dispatchGetVideoList: PropTypes.func,
  dispatchGetVideoCategories: PropTypes.func,
};
Movie.defaultProps = {
  videoList: [],
  categoryList: [],
  dispatchGetVideoList: () => {},
  dispatchGetVideoCategories: () => {},
};

export default Movie;
