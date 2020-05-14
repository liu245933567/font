import '@babel/polyfill';
import dva from 'dva';
import 'moment/locale/zh-cn';
const browserHistory = require("history").createBrowserHistory;
// import { createLogger } from 'redux-logger';
import { message } from 'antd';
// import './rollbar';
import './style/main.less';
import RouterConfig from './routes';
import global from './models/global'

// 1. 创建应用，返回 dva 实例
const app = dva({
  history: browserHistory(),
  onError(e) {
    message.error(e.message, /* duration */3);
  },
  // onAction: createLogger({}),
});

// 2. 配置 hooks 或者注册插件
// app.use({});

// 3. 注册 model
app.model(global);

// 4. 注册路由表
app.router(RouterConfig);

// 5. 启动应用
app.start('#root');
