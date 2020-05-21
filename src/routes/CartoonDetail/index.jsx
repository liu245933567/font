import React from "react";
import { connect } from "dva";
import PropTypes from "prop-types";

@connect(
  (state) => {
    return {
      sectionList: state.cartoon.sectionList,
      selectedCartoon: state.cartoon.selectedCartoon,
      queryCartoonDetailParams: state.cartoon.queryCartoonDetailParams,
    };
  },
  (dispatch) => ({
    dispatchGetSectionList(payload) {
      dispatch({
        type: "cartoon/getCartoonDeatil",
        payload,
      });
    },
    dispatchGetSectionDeatil(payload) {
      dispatch({
        type: "cartoon/getSectionDeatil",
        payload,
      });
    },
  })
)
class CartoonDetail extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatchGetSectionList();
  }

  render() {
    const { sectionList, selectedCartoon } = this.props;
    return (
      <div className="Cartoon-Detail-page">
        {selectedCartoon.cartoonName && (
          <div className="page-header">
            <div className="header-image-wrapper">
              <img src={selectedCartoon.coverImage} />
            </div>
            <div className="header-content">
              <div className="cartoon-name">{selectedCartoon.cartoonName}</div>
              <div className="cartoon-update">上次更新：{selectedCartoon.updataTime}</div>
              <div className="cartoon-description">
                简介：{selectedCartoon.description}
              </div>
            </div>
          </div>
        )}
        <ul className="section-list-wrapper">
          {sectionList.map((item) => (
            <li
              key={item.sectionId}
              className="section-item"
              onClick={() => {
                this.props.dispatchGetSectionDeatil({
                  sectionId: item.sectionId,
                });
                this.props.history.push({
                  pathname: "/sectionDetail",
                });
              }}
            >
              <div>{item.sectionTitle}</div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

CartoonDetail.propTypes = {
  sectionList: PropTypes.array,
  dispatchGetSectionList: PropTypes.func,
  dispatchGetSectionDeatil: PropTypes.func,
  history: PropTypes.object,
  selectedCartoon: PropTypes.object,
  queryCartoonDetailParams: PropTypes.object,
};

export default CartoonDetail;
