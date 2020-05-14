import React from "react";
import {
  routerRedux,
  Switch,
  Route,
} from "dva/router";
import { Spin } from "antd";
import PropTypes from "prop-types";
import dynamic from "dva/dynamic";

import Home from './Home';
import CartoonDetail from './CartoonDetail';
import SectionDetail from './SectionDetail';

dynamic.setDefaultLoadingComponent(() => {
  return <Spin size="large" className="loading" />;
});
const { ConnectedRouter } = routerRedux;

function RouterConfig({ history }) {
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
