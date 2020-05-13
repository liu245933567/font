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
    const CartoonItem = ({ coverImage, cartoonName, updataTime }) => (
      <div className="cartoon-item">
        <img src={coverImage} />
        <div className="cartoon-info-item">{cartoonName}</div>
        <div className="cartoon-info-item">{updataTime}</div>
      </div>
    );
    return (
      <div className="Home-wrapper">
        {this.props.cartoonList.map((item) => (
          <CartoonItem key={item._id} {...item}/>
        ))}
      </div>
    );
  }
}

Home.propTypes = {
  cartoonList: PropTypes.array,
  dispatchGetCartoonList: PropTypes.func,
  history: PropTypes.object,
};
