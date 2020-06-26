import React from "react";
import NavTab from "../../components/NavTab";
import Home from "./Home";
import Cartoon from "./Cartoon";
import Movie from "./Movie";
import User from "./User";

import NormalPage from "../../components/NormalPage";

export default class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      curNavTab: "home",
    };
    this.chooseTab = this.chooseTab.bind(this);
  }

  chooseTab(tabId) {
    this.setState({
      curNavTab: tabId,
    });
  }

  render() {
    const { curNavTab } = this.state;
    const Content = () => {
      switch (curNavTab) {
        case "home":
          return <Home />;
        case "movie":
          return <Movie />;
        case "cartoon":
          return <Cartoon />;
        case "user":
          return <User />;
        default:
          return <Home />;
      }
    };
    return (
      <NormalPage
        customFooter={
          <NavTab curNavTab={curNavTab} pressCallBack={this.chooseTab} />
        }
        showFooter
        showHeader={false}
      >
        <Content />
      </NormalPage>
    );
  }
}

Index.propTypes = {};
