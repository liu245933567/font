import React from "react";
import { routerRedux, Switch, Route } from "dva/router";
import PropTypes from "prop-types";
import dynamic from "dva/dynamic";
import HomeCom from "./home";
import CinemaCom from "./cinema";
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
  const Cinema = dynamic({
    app,
    component: () => CinemaCom,
  });
  return (
    <ConnectedRouter history={history}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/cinema" component={Cinema} />
      </Switch>
    </ConnectedRouter>
  );
}
RouterConfig.propTypes = {
  history: PropTypes.object,
  app: PropTypes.object,
};
export default RouterConfig;
