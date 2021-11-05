import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { correct } from "react-redux";
import classnames from "classnames";
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
            questions: []

        };
    }
    
    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }
    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };
    onSubmit = e => {
        e.preventDefault();
        const newQuiz = {
            name: this.state.name,
            description: this.state.description,
            time_limit: this.state.time_limit,
            questions: this.state.questions
        };
        this.props.Quiz_Create(newQuiz, this.props.history);
    };
        render() {
            //const { errors } = this.state;
            return (
                <div className="container">
                  <div className="row">
                    <div className="col s8 offset-s2">
                     
                      <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                        <h4>
                          Create a Quiz!
                        </h4>
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
                        </div>
                        <div className="input-field col s12">
                          <input
                            onChange={this.onChange}
                            value={this.state.description}
                            id="description"
                            type="text"
                          />
                          <label htmlFor="description">Description</label>
                        </div>
                        <div className="input-field col s12">
                          <input
                            onChange={this.onChange}
                            value={this.state.time_limit}
                            id="time_limit"
                            type="text"
                          />
                          <label htmlFor="time_limit">time limit</label>
                        </div>
                        Questions WIP
                        <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                          <button
                            style={{
                              width: "150px",
                              borderRadius: "3px",
                              letterSpacing: "1.5px",
                              marginTop: "1rem"
                            }}
                            type="submit"
                            className="btn btn-large waves-effect waves-light hoverable blue accent-3"
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
    errors: PropTypes.object.isRequired
  };

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
  });

export default connect(
    mapStateToProps,
    { Quiz_Create }
  )(QuizCreate);