import React from "react";
import { connect } from "dva";
import PropTypes from "prop-types";

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
      <div className="Cartoon-Detail-page">
        <div className="page-header">
          <div className="header-image-wrapper"><img src="http://i.zhongwei100.com/mh/cover/2019/11/19/10b64a5544.jpg/420"/></div>
          <div className="header-content">
            <div className="cartoon-name">一人之下</div>
            <div className="cartoon-update">上次更新：2020-09-18</div>
            <div className="cartoon-description">简介：2017年12月5日上线，每周二、四、六、日更新。↵此漫画由天蚕土豆热门小说《元尊》改编。少年执笔，龙蛇舞动；劈开乱世，点亮苍穹。气掌乾坤的世界里，究竟是蟒雀吞龙，还是圣龙崛起？！</div>
          </div>
        </div>
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
