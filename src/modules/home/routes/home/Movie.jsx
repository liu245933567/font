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
    this.state = {
      curCategory: ''
    }
  }

  componentDidMount() {
    this.props.dispatchGetVideoCategories({});
  }
  render() {
    const { videoList, categoryList } = this.props;
    const{curCategory}=this.state;
    console.log("videoList", videoList);
    return (
      <div className="Movie_Page_Wrapper">
        <NavScroll
          categoryList={categoryList}
          curCategory={curCategory}
          chooseHandle={(category) => {
            this.setState({
              curCategory: category.category
            })
            this.props.dispatchGetVideoList(category);
          }}
        />
        <Scroll>
          <VideoList videoList={videoList} chooseHandle={() => {
            
          }}/>
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
