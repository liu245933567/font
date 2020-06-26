import React from "react";
import PropTypes from "prop-types";
import BScroll from "better-scroll";

class Scroll extends React.Component {
  constructor(props) {
    super(props);
    /** scroll 实例 */
    this.scroll = null;
    this.wrapper = React.createRef();
    this.state = {
      pullDownStyle: { top: "-50px" },
      pullUpStyle: { top: "0px" },
      // 是否处于上拉请求状态
      isPullupLoading: false,
      /**
       * 下拉加载状态
       * HIDDEN: 隐藏
       * DOWN: "下拉加载"文字提示
       * RELEASE: "释放刷新"文字提示
       * LOADING: 显示 loading 动画
       * SUCCESS: "刷新成功"文字提示
       */
      pulldownStatus: "SUCCESS",
    };
    this.initScroll = this.initScroll.bind(this);
  }

  componentDidMount() {
    // 保证在DOM渲染完毕后初始化better-scroll
    setTimeout(() => {
      this.initScroll();
    }, 20);
  }

  /** 初始化 scroll 方法 */
  initScroll() {
    const {
      probeType,
      click,
      scrollX,
      scrollY,
      pulldown,
      pullupDistance,
      pullup,
      scrollbar,
    } = this.props;
    this.scroll = new BScroll(this.wrapper.current, {
      probeType,
      click,
      scrollX,
      scrollY,
      // pc端同样能滑动
      mouseWheel: {
        speed: 20,
        invert: false,
      },
      // 防止iphone微信滑动卡顿
      useTransition: false,
      // 是否开启下拉刷新
      pullDownRefresh: pulldown && {
        threshold: pullupDistance,
        stop: pullupDistance,
      },
      // 是否开启上拉加载
      pullUpLoad: pullup && {
        threshold: -pullupDistance,
      },
      //是否显示滚动条
      scrollbar,
    });
  }

  /** 下拉信息 */
  get pulldownText() {
    const { pulldownStatus } = this.state;
    const { loadingText } = this.props;
    const statusEnum = {
      DOWN: "下拉加载",
      RELEASE: "释放刷新",
      LOADING: loadingText,
      SUCCESS: "加载成功",
    };
    return statusEnum[pulldownStatus];
  }

  render() {
    const {
      pulldown,
      pullup,
      scrollX,
      loadingText,
      hasMore,
      pullUpText,
      noMoreText,
      children,
    } = this.props;
    const {
      pullUpStyle,
      isPullupLoading,
      pulldownStatus,
      pullDownStyle,
    } = this.state;
    const { pulldownText } = this;
    return (
      <div ref={this.wrapper} className="Scroll_Component_wrapper">
        <div
          className={`content-wrapper ${pulldown && "content-wrapper-full"} ${
            scrollX && "content-wrapper-scrollX"
          }`}
        >
          {/* 上拉加载更多提示 */}
          {pullup && (
            <div className="pullup-wrapper" style={pullUpStyle}>
              {pulldownStatus === "HIDDEN" && (
                <div>
                  {isPullupLoading
                    ? loadingText
                    : hasMore
                    ? pullUpText
                    : noMoreText}
                </div>
              )}
            </div>
          )}

          {/* 数据列表 */}
          {children}

          {/* 下拉刷新提示 */}
          {pulldown && (
            <div className="pulldown-wrapper" style={pullDownStyle}>
              {pulldownText}
            </div>
          )}
        </div>
      </div>
    );
  }
}

Scroll.propTypes = {
  /**
   * 1 滚动的时候会派发scroll事件，会截流。
   * 2 滚动的时候实时派发scroll事件，不会截流。
   * 3 除了实时派发scroll事件，在swipe的情况下仍然能实时派发scroll事件
   */
  probeType: PropTypes.number,
  /** 是否显示滚动条 */
  scrollbar: PropTypes.bool,
  /** 点击列表是否派发click事件 */
  click: PropTypes.bool,
  /** 是否开启横向滚动 */
  scrollX: PropTypes.bool,
  /** 是否开启竖向滚动 */
  scrollY: PropTypes.bool,
  /** 是否派发滚动事件 */
  listenScroll: PropTypes.bool,
  /** 列表的数据 */
  data: PropTypes.array,
  /** 是否派发滚动到底部的事件，用于上拉加载 */
  pullup: PropTypes.bool,
  /** 是否派发顶部下拉的事件，用于下拉刷新 */
  pulldown: PropTypes.bool,
  /** 是否派发列表滚动开始的事件 */
  beforeScroll: PropTypes.bool,
  /** 当数据更新后，刷新scroll的延时 */
  refreshDelay: PropTypes.number,
  /** 下拉刷新距离 */
  pullupDistance: PropTypes.number,
  /** 上拉请求后是否有更多数据 */
  hasMore: PropTypes.bool,
  /** 加载中显示的文字 */
  loadingText: PropTypes.string,
  /** 下拉加载提示文案 */
  pullDownText: PropTypes.string,
  /** 上拉加载提示文字 */
  pullUpText: PropTypes.string,
  /** 没有更多了提示 */
  noMoreText: PropTypes.string,
  /** 插槽内容 */
  // children: PropTypes.elementType,
  /** input className */
  inputClassName: PropTypes.string,
};

Scroll.defaultProps = {
  probeType: 1,
  scrollbar: false,
  click: true,
  scrollX: false,
  scrollY: true,
  listenScroll: false,
  data: null,
  pullup: false,
  pulldown: false,
  beforeScroll: false,
  refreshDelay: 20,
  pullupDistance: 50,
  hasMore: true,
  loadingText: "努力加载中...",
  pullDownText: "下拉刷新",
  pullUpText: "上拉加载更多",
  noMoreText: "没有更多了",
  // children: null,
  inputClassName: ''
};

export default Scroll;
