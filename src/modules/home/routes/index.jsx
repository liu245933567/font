import React from "react";
import { routerRedux, Switch, Route } from "dva/router";
import PropTypes from "prop-types";
import dynamic from "dva/dynamic";
import HomeCom from "./home";
import { NavBar, Icon } from "antd-mobile";

dynamic.setDefaultLoadingComponent(() => {
  return <div>ewfewf</div>;
});
const { ConnectedRouter } = routerRedux;

function RouterConfig({ history, app }) {
  history.listen(({ pathname, search }) => {
    console.log(`pathname...: ${pathname}`);
    console.log(search);
    console.log(app);
  });
  console.log("有没有触发", history);
  const Home = dynamic({
    app,
    component: () => HomeCom,
  });
  return (
    <ConnectedRouter history={history}>
      <div className="wrapper">
        <NavBar
          mode="light"
          icon={<Icon type="left" />}
          onLeftClick={() => console.log("onLeftClick")}
          rightContent={[
            <Icon key="0" type="search" style={{ marginRight: "16px" }} />,
            <Icon key="1" type="ellipsis" />,
          ]}
        >
          烟雨阁
        </NavBar>
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </div>
    </ConnectedRouter>
  );
}
RouterConfig.propTypes = {
  history: PropTypes.object,
  app: PropTypes.object,
};
export default RouterConfig;
