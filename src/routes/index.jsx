import React from 'react';
import {
  routerRedux, 
  // Router,
  Switch,
  Route
} from 'dva/router';
import {Spin} from 'antd';
import PropTypes from 'prop-types';
// import CartoonDetail from "./CartoonDetail";
// import SectionDetail from "./SectionDetail";
import dynamic from 'dva/dynamic';
import 'antd/dist/antd.css';

dynamic.setDefaultLoadingComponent(() => {
  return <Spin size="large" className="loading" />;
});
const { ConnectedRouter } = routerRedux;
function RouterConfig({ history, app }) {
  console.log(history);
  // const CartoonDetail = dynamic({
  //   app,
  //   models: () => [import('../models/cartoon')],
  //   component: () => import('./CartoonDetail/index')
  // })
  const SectionDetail = dynamic({
    app,
    models: () => [import('../models/cartoon')],
    component: () => import('./SectionDetail/index')
  })
  return (
    <ConnectedRouter history={history}>
      <Switch>
        <Route path="/" component={SectionDetail} />
        <Route path="/sectionDetail" component={SectionDetail} />
      </Switch>
    </ConnectedRouter>
  );
}
RouterConfig.propTypes = {
  history: PropTypes.object,
  app: PropTypes.object
}
export default RouterConfig;
