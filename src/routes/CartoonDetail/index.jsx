import React from "react";
// import { CARTOON_API } from "http";
// import { List } from "antd";
import { connect } from "dva";
import PropTypes from "prop-types";
// import { withRouter } from 'dva/router';

@connect(
  (state) => {
    console.log("state ----- ", state);
    return {
      sectionList: state.cartoon.sectionList,
    };
  },
  (dispatch) => ({
    dispatchGetSectionList(payload) {
      dispatch({
        type: "cartoon/getCartoonDeatil",
        payload,
      });
    },
  })
)
class CartoonDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sectionList: [],
    };
  }

  componentDidMount() {
    console.log("this.props ------ ", this.props);
    this.props.dispatchGetSectionList({
      collectionTag: 'woshidashenxian',
      sortType: 1,
      pageIndex: 1,
      pageSize: 40
    });
  }

  render() {
    const { sectionList } = this.props;

    return (
      <div>
        <ul className="section-list-wrapper">
          {sectionList.map((item) => (
            <li key={item.sectionId} className="section-item">
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
  history: PropTypes.object,
};

// export default withRouter(connect()(CartoonDetail));
export default CartoonDetail;
