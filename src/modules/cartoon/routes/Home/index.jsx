import React from "react";
import { connect } from "dva";
import { List, Card, Divider } from "antd";
import PropTypes from "prop-types";

@connect(
  (state) => {
    return {
      cartoonList: state.cartoon.cartoonList,
    };
  },
  (dispatch) => ({
    dispatchGetCartoonList(payload) {
      dispatch({
        type: "cartoon/getCartoonList",
        payload,
      });
    },
    dispatchSaveCartoonDetail(payload) {
      dispatch({
        type: "cartoon/saveCartoonDetail",
        payload,
      });
    },
    dispatchChangeQueryCartoonDetailParams(payload) {
      dispatch({
        type: "cartoon/changeQueryCartoonDetailParams",
        payload,
      });
    },
  })
)
export default class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatchGetCartoonList({});
  }

  render() {
    const { cartoonList } = this.props;
    return (
      <div className="Home-wrapper">
        <List
          className="cartoon-list-wrapper"
          grid={{
            gutter: 16,
            column: 4,
          }}
          dataSource={cartoonList}
          renderItem={(item) => (
            <List.Item
              onClick={() => {
                this.props.dispatchSaveCartoonDetail(item);
                this.props.dispatchChangeQueryCartoonDetailParams({
                  collectionTag: item.collectionTag,
                });
                this.props.history.push({
                  pathname: "/cartoonDetail",
                });
              }}
            >
              <Card
                hoverable
                style={{ width: 210 }}
                cover={<img width={210} height={280} src={item.coverImage} />}
              >
                <Card.Meta
                  title={item.cartoonName}
                  description={`更新时间：${item.updataTime}`}
                />
              </Card>
            </List.Item>
          )}
        />

        <Divider>欢迎提出宝贵意见</Divider>
        <div className="footer-wrapper">我的QQ: 245933567 </div>
      </div>
    );
  }
}

Home.propTypes = {
  cartoonList: PropTypes.array,
  dispatchGetCartoonList: PropTypes.func,
  dispatchChangeQueryCartoonDetailParams: PropTypes.func,
  dispatchSaveCartoonDetail: PropTypes.func,
  history: PropTypes.object,
};
