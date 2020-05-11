import React from 'react';
import {
  routerRedux, 
  // Router,
  Switch,
  Route
} from 'dva/router';
import {Spin} from 'antd';
// import CartoonDetail from "./CartoonDetail";
import SectionDetail from "./SectionDetail";
import dynamic from 'dva/dynamic';
import 'antd/dist/antd.css';

dynamic.setDefaultLoadingComponent(() => {
  return <Spin size="large" className="loading" />;
});
const { ConnectedRouter } = routerRedux;
export default function RouterConfig({ history, app }) {
  const CartoonDetail = dynamic({
    app,
    models: () => [import('../models/cartoon')],
    component: () => import('./CartoonDetail/index')
  })
  return (
    <ConnectedRouter history={history}>
      <Switch>
        <Route path="/" component={CartoonDetail} />
        <Route path="/aaa" component={SectionDetail} />
      </Switch>
    </ConnectedRouter>
  );
}
