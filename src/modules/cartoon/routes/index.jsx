import React from "react";
import { routerRedux, Switch, Route } from "dva/router";
import { Spin } from "antd";
import PropTypes from "prop-types";
import dynamic from "dva/dynamic";
import Nav from "../components/Nav";

dynamic.setDefaultLoadingComponent(() => {
  return <Spin size="large" className="loading" />;
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
  return (
    <ConnectedRouter history={history}>
      <div className="wrapper">
        <Nav
          history={history}
          handleClick={(e) => {
            console.log(e);
            history.push(e.key);
          }}
          current={history.location.pathname}
        />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/cartoonDetail" component={CartoonDetail} />
          <Route exact path="/sectionDetail" component={SectionDetail} />
          <Route exact path="/login" component={Login} />
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
