import dva from 'dva';
import cartoon from './models/cartoon';
import RouterConfig from './routes';
import './style/main.scss';


// 1. 创建应用，返回 dva 实例
const app = dva();

app.model(cartoon);

app.router(RouterConfig);

app.start('#root');