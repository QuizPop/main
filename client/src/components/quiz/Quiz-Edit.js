import React, { Component } from "react";
// import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
// import { correct } from "react-redux";
// import classnames from "classnames";
import { connect } from "react-redux";
import Question from "./quizComponents/Question";
import QuizDetails from "./quizComponents/QuizDetails";
import QuestionEdit from "./quizComponents/QuestionEdit";
import {
  Quiz_Create,
  Quiz_Update,
  Quiz_Delete,
} from "../../actions/QuizActions";
import axios from "axios";
class QuizEdit extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      description: "",
      platform_ID: "",
      time_limit: "",
      questions: [],
      check1: false,
      check2: false,
      check3: false,
      check4: false,
    };
  }

  componentDidMount() {
    axios
      .get(`/api/Quizzes/${this.props.match.params.id}`, {})
      .then((res) => {
        const data = res.data;
        if (!res.data) {
          this.props.history.push("/quiz-list");
        } else {
          this.setState({
            ...this.state,
            name: data.name,
            description: data.description,
            time_limit: data.time_limit,
            questions: data.questions,
          });
          window.M.updateTextFields();
        }
      })
      .catch((err) => console.log(err));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      });
    }
  }
  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };
  onSubmit = () => {
    const quiz = {
      name: this.state.name,
      description: this.state.description,
      hint: this.state.hint,
      time_limit: this.state.time_limit,
      questions: this.state.questions,
    };
    this.props.Quiz_Update(
      this.props.match.params.id,
      quiz,
      this.props.history
    );
  };

  onDelete = () => {
    this.props.Quiz_Delete(this.props.match.params.id, this.props.history);
  };

  onDeleteQuestion = (index) => {
    const currentQuestions = [...this.state.questions];
    currentQuestions.splice(index, 1);
    this.setState({ ...this.state, questions: currentQuestions });
  };

  onEditQuestion = (index, updatedQuestion) => {
    const currentState = [...this.state.questions];
    currentState[index] = updatedQuestion;
    this.setState({ ...this.state, questions: currentState });
  };

  onUpdateDetails = (data) => {
    this.setState({ ...this.state, ...data });
  };

  addQuestion = (data) => {
    const newQuestion = data;
    const currentQuestions = [...this.state.questions];
    currentQuestions.push(newQuestion);
    this.setState({ ...this.state, questions: currentQuestions });
  };

  handleCheck = (e) => {
    // this.setState({[e.target.name]: e.target.checked})
    console.log(e.target.checked);
  };

  render() {
    //const { errors } = this.state;

    //   console.log(document.getElementById("check1").checked, "checked < ====")
    const { check1, check2, check3, check4 } = this.state;
    console.log(check1, check2, " <+===checks");
    return (
      <div className="container">
        <div
          className="col s12 right-align mt-12"
          style={{ paddingLeft: "11.250px" }}
        >
          <button
            style={{
              width: "150px",
              borderRadius: "3px",
              letterSpacing: "1.5px",
              marginTop: "1rem",
              marginRight: "1rem",
            }}
            onClick={() => this.onSubmit()}
            className="btn btn-small waves-effect waves-light hoverable green accent-5"
          >
            Save Changes
          </button>
          <button
            style={{
              width: "150px",
              borderRadius: "3px",
              letterSpacing: "1.5px",
              marginTop: "1rem",
            }}
            onClick={() => this.onDelete()}
            className="btn btn-small waves-effect waves-light hoverable red accent-6"
          >
            Delete Quiz
          </button>
        </div>
        <div>
          <h5 style={{ marginTop: "3rem", marginBottom: "1rem" }}>
            Quiz Details
          </h5>
          <div className="row">
            <QuizDetails
              quiz={{
                name: this.state.name,
                description: this.state.description,
                time_limit: this.state.time_limit,
              }}
              onUpdate={(data) => this.onUpdateDetails(data)}
            />
          </div>
        </div>
        <div>
          <h5 style={{ marginTop: "3rem", marginBottom: "1rem" }}>Questions</h5>
          <div className="questions-list">
            {this.state.questions.map((question, index) => (
              <Question
                index={index}
                total={this.state.questions.length}
                questionData={question}
                onEdit={(index, data) => this.onEditQuestion(index, data)}
                onDelete={(index) => this.onDeleteQuestion(index)}
              />
            ))}
          </div>
        </div>
        <div>
          <QuestionEdit
            data={{
              questionText: "",
              answerIndex: "",
              hint: "",
              answerOptions: [
                { answerText: "", isCorrect: false },
                { answerText: "", isCorrect: false },
                { answerText: "", isCorrect: false },
                { answerText: "", isCorrect: false },
              ],
            }}
            onAdd={(data) => this.addQuestion(data)}
          />
        </div>
      </div>
    );
  }
}

QuizEdit.propTypes = {
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, {
  Quiz_Create,
  Quiz_Update,
  Quiz_Delete,
})(QuizEdit);
