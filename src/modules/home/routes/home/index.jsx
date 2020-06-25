import React from "react";
import { connect } from "dva";
import { Grid, TabBar } from "antd-mobile";
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
    this.state = {
      selectedTab: "redTab",
      hidden: false,
      fullScreen: false,
    };
  }

  componentDidMount() {
    this.props.dispatchGetCartoonList({});
  }
  renderContent(pageText) {
    return (
      <div
        style={{
          backgroundColor: "white",
          height: "100%",
          textAlign: "center",
        }}
      >
        <div style={{ paddingTop: 60 }}>
          Clicked “{pageText}” tab， show “{pageText}” information
        </div>
        <a
          style={{
            display: "block",
            marginTop: 40,
            marginBottom: 20,
            color: "#108ee9",
          }}
          onClick={(e) => {
            e.preventDefault();
            this.setState({
              hidden: !this.state.hidden,
            });
          }}
        >
          Click to show/hide tab-bar
        </a>
        <a
          style={{ display: "block", marginBottom: 600, color: "#108ee9" }}
          onClick={(e) => {
            e.preventDefault();
            this.setState({
              fullScreen: !this.state.fullScreen,
            });
          }}
        >
          Click to switch fullscreen
        </a>
      </div>
    );
  }

  render() {
    const { cartoonList } = this.props;
    return (
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

        <TabBar
          unselectedTintColor="#949494"
          tintColor="#33A3F4"
          barTintColor="white"
          tabBarPosition="bottom"
          hidden={this.state.hidden}
        >
          <TabBar.Item
            title="Life"
            key="Life"
            icon={{
              uri: 'https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg'
            }}
            selectedIcon={{
              uri: 'https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg'
            }}
            selected={this.state.selectedTab === "blueTab"}
            badge={1}
            onPress={() => {
              this.setState({
                selectedTab: "blueTab",
              });
            }}
            data-seed="logId"
          >
          </TabBar.Item>
          <TabBar.Item
            icon={{
              uri: 'https://gw.alipayobjects.com/zos/rmsportal/BTSsmHkPsQSPTktcXyTV.svg'
            }}
            selectedIcon={{
              uri: 'https://gw.alipayobjects.com/zos/rmsportal/ekLecvKBnRazVLXbWOnE.svg'
            }}
            title="Koubei"
            key="Koubei"
            badge={"new"}
            selected={this.state.selectedTab === "redTab"}
            onPress={() => {
              this.setState({
                selectedTab: "redTab",
              });
            }}
            data-seed="logId1"
          >
          </TabBar.Item>
          <TabBar.Item
            icon={{
              uri: 'https://zos.alipayobjects.com/rmsportal/psUFoAMjkCcjqtUCNPxB.svg'
            }}
            selectedIcon={{
              uri: 'https://zos.alipayobjects.com/rmsportal/IIRLrXXrFAhXVdhMWgUI.svg'
            }}
            title="Friend"
            key="Friend"
            dot
            selected={this.state.selectedTab === "greenTab"}
            onPress={() => {
              this.setState({
                selectedTab: "greenTab",
              });
            }}
          >
          </TabBar.Item>
          <TabBar.Item
            icon={{
              uri:
                "https://zos.alipayobjects.com/rmsportal/asJMfBrNqpMMlVpeInPQ.svg",
            }}
            selectedIcon={{
              uri:
                "https://zos.alipayobjects.com/rmsportal/gjpzzcrPMkhfEqgbYvmN.svg",
            }}
            title="My"
            key="my"
            selected={this.state.selectedTab === "yellowTab"}
            onPress={() => {}}
          ></TabBar.Item>
        </TabBar>
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
