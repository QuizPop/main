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
            <ul className="row">
              <Link
                to="/quiz"
                        >
                Quiz 1
              </Link>
          </ul>
            <ul> Quiz 2</ul>
            <ul> Quiz 3</ul>
            <ul> Quiz 4</ul>
            <div className="col s6">
              <Link
                to="/dashboard"
                style={{
                  width: "150px",
                  borderRadius: "2px",
                  letterSpacing: "1.5px"
                }}
                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
              >
             Dashboard
              </Link>
            </div>
            
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