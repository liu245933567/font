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

  componentDidMount() {
    this.props.dispatchGetSectionDeatil({
      collectionTag: "jiemoren",
      sectionId: 11037,
    });
  }

  render() {
    const { imagesList, sectionTitle } = this.props.sectionInfo || {
      imagesList: [],
      sectionTitle: "没有",
    };
    return (
      <div className="SectionDetail-detail-wrapper">
        <div className="section-title">{sectionTitle}</div>

        <ul className="images-wrapper">
          {imagesList.map((url) => (
            <li className="image-item-wrapper" key={url}>
              <img src={url} />
            </li>
          ))}
        </ul>

        <div className="float-btn-wrapper">
          <div className="con-btn">上一章</div>
          <div className="con-btn">下一章</div>
        </div>
      </div>
    );
  }
}

SectionDetail.propTypes = {
  sectionList: PropTypes.array,
  sectionInfo: PropTypes.object,
  dispatchGetSectionDeatil: PropTypes.func,
};
