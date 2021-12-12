import React, { Component } from "react";
// import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
// import { correct } from "react-redux";
// import classnames from "classnames";
import { connect } from "react-redux";
import { Quiz_Create } from "../../actions/QuizActions";
class QuizCreate extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      description: "",
      platform_ID: "",
      time_limit: "",
      questions: [],
      errors: {
        name: null,
        description: null,
        time_limit: null,
      },
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      });
    }
  }

  onChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
      errors: { name: null, description: null, time_limit: null },
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const isNameValid = this.state.name && this.state.name.trim().length > 0;
    const isDescriptionValid =
      this.state.description && this.state.description.trim().length > 0;
    const isTimeLimitValid =
      this.state.time_limit && this.state.time_limit.trim().length > 0;

    if (isNameValid && isDescriptionValid && isTimeLimitValid) {
      const newQuiz = {
        name: this.state.name,
        description: this.state.description,
        time_limit: this.state.time_limit,
        questions: this.state.questions,
        ownerId: this.props.auth.user.id,
      };
      this.props.Quiz_Create(newQuiz, this.props.history);
    } else {
      const errorsMap = {
        name: isNameValid ? null : "Please enter a valid name",
        description: isDescriptionValid
          ? null
          : "Please enter a valid description",
        time_limit: isTimeLimitValid ? null : "Please enter a valid time limit",
      };
      this.setState({ ...this.state, errors: errorsMap });
    }
  };

  render() {
    return (
      <div className="container mt-12">
        <div className="row">
          <div className="col s8 offset-s2 profile-card p-8 mt-12">
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4>Create a Quiz!</h4>
            </div>
            <form noValidate onSubmit={this.onSubmit}>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.name}
                  id="name"
                  type="text"
                />
                <label htmlFor="name">Name</label>
                <span className="red-text">
                  {this.state.errors && this.state.errors.name}
                </span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.description}
                  id="description"
                  type="text"
                />
                <label htmlFor="description">Description</label>
                <span className="red-text">
                  {this.state.errors && this.state.errors.description}
                </span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.time_limit}
                  id="time_limit"
                  type="text"
                />
                <label htmlFor="time_limit">time limit</label>
                <span className="red-text">
                  {this.state.errors && this.state.errors.time_limit}
                </span>
              </div>
              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem",
                  }}
                  disabled={
                    this.state.errors.name ||
                    this.state.errors.description ||
                    this.state.errors.time_limit
                  }
                  type="submit"
                  className={`btn btn-large waves-effect waves-light hoverable accent-3 blue`}
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

QuizCreate.propTypes = {
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { Quiz_Create })(QuizCreate);
