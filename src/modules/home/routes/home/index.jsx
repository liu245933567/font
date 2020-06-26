import React from "react";
import { connect } from "dva";
import { Grid } from "antd-mobile";
import PropTypes from "prop-types";
import NavTab from "../../components/NavTab";
import NormalPage from "../../components/NormalPage";

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
      <NormalPage customFooter={<NavTab/>} showFooter showHeader={false}>
        <div className="Home_Page_Wrapper">
          <div>
            <Grid
              data={cartoonList}
              columnNum={3}
              renderItem={(cartoonItem) => (
                <div
                  onClick={() => {
                    this.props.history.push({
                      pathname: "/cinema",
                    });
                  }}
                >
                  <img
                    className="cartoon_coverImage"
                    src={cartoonItem.coverImage}
                  />
                  <div>
                    <span>{cartoonItem.cartoonName}</span>
                  </div>
                </div>
              )}
            />
          </div>
        </div>
      </NormalPage>
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
