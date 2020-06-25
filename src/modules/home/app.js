import dva from 'dva';
import cartoon from './models/cartoon';
import video from './models/video';
import RouterConfig from './routes';
import './style/main.scss';
window.HELP_IMPROVE_VIDEOJS = false;

// 1. 创建应用，返回 dva 实例
const app = dva();

app.model(cartoon);
app.model(video);

app.router(RouterConfig);

app.start('#root');