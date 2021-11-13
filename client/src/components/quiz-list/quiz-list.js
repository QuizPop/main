import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { Link } from "react-router-dom";

class quizList extends Component {

render() {
    
    const { user } = this.props.auth;
return (
    
      <div  className="container valign-wrapper">
        <div className="row">
          <div className="col s12 center-align">
            <h4>
              <b>Hey there,</b> {user.name.split(" ")[0]}
              <p className="flow-text grey-text text-darken-1">
                Here are the List of Quizzes you can take{" "}
                <span style={{ fontFamily: "monospace" }}></span>
              </p>
            </h4>
            <ul> List Item 1</ul>
            <ul> List Item 1</ul>
            <ul> List Item 1</ul>
            <ul> List Item 1</ul>
          </div>
        </div>
      </div>
      
    );
  }
}
quizList.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { logoutUser }
)(quizList);