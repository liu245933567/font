import React from "react";
// import { CARTOON_API } from "http";
import { List } from "antd";
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
    }
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
    this.props.dispatchGetSectionList({ id: "我是大神仙" });
    console.log(this.props);
  }

  render() {
    const { sectionList } = this.props;

    return (
      <div>
        <List
          size="large"
          header={<div>Header</div>}
          footer={<div>Footer</div>}
          bordered
          dataSource={sectionList}
          renderItem={(item) => (
            <List.Item
              onClick={() => {
                console.log("准备跳转");
                this.props.history.push({
                  pathname: "/sectionDetail",
                  query: { sectionId: item.sectionId },
                });
              }}
            >
              {item.sectionTitle}
            </List.Item>
          )}
        />
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
