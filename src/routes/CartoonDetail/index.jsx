import React from "react";
// import { CARTOON_API } from "http";
// import { List } from "antd";
import { connect } from "dva";
import PropTypes from "prop-types";
// import { withRouter } from 'dva/router';

@connect(
  (state) => {
    return {
      sectionList: state.cartoon.sectionList,
      queryCartoonDetailParams: state.cartoon.queryCartoonDetailParams
    };
  },
  (dispatch) => ({
    dispatchGetSectionList(payload) {
      dispatch({
        type: "cartoon/getCartoonDeatil",
        payload
      });
    },
    dispatchGetSectionDeatil(payload){
      dispatch({
        type: 'cartoon/getSectionDeatil',
        payload
      })
    }
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
    const { sectionList } = this.props;
    return (
      <div>
        <ul className="section-list-wrapper">
          {sectionList.map((item) => (
            <li key={item.sectionId} className="section-item" onClick={() => {
              this.props.dispatchGetSectionDeatil({
                sectionId: item.sectionId
              })
              this.props.history.push({
                pathname: "/sectionDetail"
              })
            }}>
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
  queryCartoonDetailParams: PropTypes.object
};

export default CartoonDetail;
