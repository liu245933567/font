import React from "react";
import { connect } from "dva";
import PropTypes from "prop-types";

@connect(
  (state) => {
    return {
      cartoonList: state.cartoon.cartoonList,
    };
  },
  (dispatch) => ({
    dispatchGetCartoonList(payload) {
      dispatch({
        type: "cartoon/getCartoonList",
        payload,
      });
    },
  })
)
export default class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatchGetCartoonList({});
  }

  render() {
    const CartoonItem = ({
      coverImage,
      cartoonName,
      updataTime,
      toCheckDetail,
    }) => (
      <div className="cartoon-item" onClick={toCheckDetail}>
        <img src={coverImage} />
        <div className="cartoon-info-item">{cartoonName}</div>
        <div className="cartoon-info-item">{updataTime}</div>
      </div>
    );
    return (
      <div className="Home-wrapper">
        <div className="list-wrapper">
          {this.props.cartoonList.map((item) => (
            <CartoonItem
              key={item._id}
              {...item}
              toCheckDetail={() => {
                console.log("点击跳转");
                this.props.history.push({
                  pathname: "/cartoonDetail",
                  query: { collectionTag: item.collectionTag },
                });
                // this.props.history.push(`/cartoonDetail?collectionTag=${item.collectionTag}`)
              }}
            />
          ))}
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  cartoonList: PropTypes.array,
  dispatchGetCartoonList: PropTypes.func,
  history: PropTypes.object,
};
