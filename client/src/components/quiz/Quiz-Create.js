import React, { Component } from 'react';
import PropTypes from "prop-types";
import { correct } from "react-redux";
import classNames from "classnames";
import { connect } from "react-redux";
import { Quiz_Create } from "../../actions/authActions";
class QuizCreate extends Component {
    constructor() {
        super();
        this.state = {
            name: "",
            description: "",
            //platform_ID: "", //todo
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
        this.props.createQuiz(newQuiz, this.props.history);
    };
        render() {
            const { errors } = this.state;
            return (
                <h4>
                    <b>Quiz-Create</b>
                </h4>
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