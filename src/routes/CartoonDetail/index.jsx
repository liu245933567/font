import React from "react";
import { connect } from "dva";
import { List, Button, Pagination } from "antd";
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
    this.state = {
      currentPage: 1,
      pageSize: 40
    };
  }

  componentDidMount() {
    this.props.dispatchGetSectionList();
  }

  render() {
    const { sectionList, selectedCartoon } = this.props;
    const { currentPage, pageSize } = this.state;
    const  pageStart = (currentPage -1) * pageSize;
    const pageEnd = currentPage * pageSize;
    return (
      <div className="Cartoon-Detail-page">
        {/* 页头 */}
        {selectedCartoon.cartoonName && (
          <div className="page-header">
            <div className="header-image-wrapper">
              <img src={selectedCartoon.coverImage} />
            </div>
            <div className="header-content">
              <div className="cartoon-name">{selectedCartoon.cartoonName}</div>
              <div className="cartoon-update">
                上次更新：{selectedCartoon.updataTime}
              </div>
              <div className="cartoon-description">
                简介：{selectedCartoon.description}
              </div>
            </div>
          </div>
        )}
        {/* 章节列表 */}
        <List
          className="section-list-wrapper"
          grid={{
            gutter: 16,
            column: 4,
          }}
          dataSource={sectionList.slice(pageStart, pageEnd)}
          renderItem={(item) => (
            <List.Item>
              <Button className="section-item-btn">{item.sectionTitle}</Button>
            </List.Item>
          )}
        />
        {/* 分页 */}
        <Pagination
          className="Cartoon-Detail-Pagination"
          total={sectionList.length}
          pageSize={pageSize}
          showTotal={(total) => `共${total}章`}
          defaultCurrent={currentPage}
          showSizeChanger={false}
          showQuickJumper
          onChange={(currentPage, pageSize) => {
            this.setState({
              currentPage,
              pageSize
            });
          }}
        />
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
