import React from "react";
import {
  routerRedux,
  // Router,
  Switch,
  Route,
} from "dva/router";
import { Spin } from "antd";
import PropTypes from "prop-types";
import dynamic from "dva/dynamic";

dynamic.setDefaultLoadingComponent(() => {
  return <Spin size="large" className="loading" />;
});
const { ConnectedRouter } = routerRedux;

function RouterConfig({ history, app }) {
  const Home = dynamic({
    app,
    models: () => [import("../models/cartoon")],
    component: () => import("./Home"),
  });
  const CartoonDetail = dynamic({
    app,
    models: () => [import("../models/cartoon")],
    component: () => import("./CartoonDetail/index"),
  });
  const SectionDetail = dynamic({
    app,
    models: () => [import("../models/cartoon")],
    component: () => import("./SectionDetail/index"),
  });
  history.listen(({ pathname, search }) => {
    console.log(`pathname...: ${pathname}`);
    console.log(search);
  });
  return (
    <ConnectedRouter history={history}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/cartoonDetail" component={CartoonDetail} />
        <Route exact path="/sectionDetail" component={SectionDetail} />
      </Switch>
    </ConnectedRouter>
  );
}
RouterConfig.propTypes = {
  history: PropTypes.object,
  app: PropTypes.object,
};
export default RouterConfig;
