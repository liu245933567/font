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

  render() {
    const { sectionInfo, dispatchGetSectionDeatil } = this.props;
    const { imagesList, sectionTitle, sectionId } = sectionInfo;
    console.log(this.props.sectionInfo);
    return (
      <div className="SectionDetail-detail-wrapper">
        <div className="section-title">{sectionTitle || "--"}</div>

        <div className="float-btn-wrapper">
          <div
            className="con-btn"
            onClick={() => {
              dispatchGetSectionDeatil({ queryType: "prev", sectionId });
            }}
          >
            上一章
          </div>
          <div
            className="con-btn"
            onClick={() => {
              dispatchGetSectionDeatil({ queryType: "next", sectionId });
            }}
          >
            下一章
          </div>
        </div>

        <ul className="images-wrapper">
          {imagesList &&
            imagesList.map((url) => (
              <li className="image-item-wrapper" key={url}>
                <img src={url} />
              </li>
            ))}
        </ul>

        <div className="float-btn-wrapper">
          <div
            className="con-btn"
            onClick={() => {
              dispatchGetSectionDeatil({ queryType: "prev", sectionId });
            }}
          >
            上一章
          </div>
          <div
            className="con-btn"
            onClick={() => {
              dispatchGetSectionDeatil({ queryType: "next", sectionId });
            }}
          >
            下一章
          </div>
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
