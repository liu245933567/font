import React from "react";
import { connect } from "dva";
import PropTypes from "prop-types";

@connect(
  (state) => {
    return {
      sectionList: state.cartoon.cartoonList,
      sectionInfo: state.cartoon.sectionInfo,
    };
  },
  (dispatch) => ({
    dispatchGetSectionDeatil(payload) {
      dispatch({
        type: "cartoon/getSectionDeatil",
        payload,
      });
    },
  })
)
export default class SectionDetail extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
    this.props.dispatchGetSectionDeatil({
      collectionTag: "jiemoren",
      sectionId: 11037
    });
  }

  render() {
    return <div>这是详情</div>;
  }
}

SectionDetail.propTypes = {
  sectionList: PropTypes.array,
  sectionInfo: PropTypes.object,
  dispatchGetSectionDeatil: PropTypes.func,
};
