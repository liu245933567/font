import React from "react";
import { routerRedux, Switch, Route } from "dva/router";
import { Spin } from "antd";
import PropTypes from "prop-types";
import dynamic from "dva/dynamic";

dynamic.setDefaultLoadingComponent(() => {
  return <Spin size="large" className="loading" />;
});
const { ConnectedRouter } = routerRedux;

function RouterConfig({ history, app }) {
  history.listen(({ pathname, search }) => {
    console.log(`pathname...: ${pathname}`);
    console.log(search);
  });
  console.log(history);
  const Home = dynamic({
    app,
    component: () => import("./Home"),
  });
  const CartoonDetail = dynamic({
    app,
    component: () => import("./CartoonDetail"),
  });
  const SectionDetail = dynamic({
    app,
    component: () => import("./SectionDetail"),
  });
  const Login = dynamic({
    app,
    component: () => import("./Login"),
  });
  const Resume = dynamic({
    app,
    component: () => import("./Resume"),
  });
  return (
    <ConnectedRouter history={history}>
      <div className="wrapper">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/cartoonDetail" component={CartoonDetail} />
          <Route exact path="/sectionDetail" component={SectionDetail} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/resume" component={Resume} />
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
