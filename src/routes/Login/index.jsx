import React from "react";
import { connect } from "dva";
import PropTypes from "prop-types";
// import LoginForm from "../../components/LoginForm";
import RegisterForm from "../../components/RegisterForm";

@connect(
  (state) => {
    return {
      sectionList: state.cartoon.sectionList,
      queryCartoonDetailParams: state.cartoon.queryCartoonDetailParams,
    };
  },
  (dispatch) => ({
    dispatchGetSectionList(payload) {
      dispatch({
        type: "cartoon/getCartoonDeatil",
        payload,
      });
    },
    dispatchGetSectionDeatil(payload) {
      dispatch({
        type: "cartoon/getSectionDeatil",
        payload,
      });
    },
  })
)
class Account extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatchGetSectionList();
  }

  render() {
    // const { sectionList } = this.props;
    return (
      <div className="Account-page-wrapper">
        {/* <LoginForm /> */}
        <RegisterForm/>
      </div>
    );
  }
}

Account.propTypes = {
  sectionList: PropTypes.array,
  dispatchGetSectionList: PropTypes.func,
  dispatchGetSectionDeatil: PropTypes.func,
  history: PropTypes.object,
  queryCartoonDetailParams: PropTypes.object,
};

export default Account;
