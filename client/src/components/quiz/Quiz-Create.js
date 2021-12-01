import React, { Component } from 'react';
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
            check1: false,
            check2: false,
            check3: false,
            check4: false
        }
       
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

    addQuestion = e => {
      e.preventDefault();
      const test=[false,false,false,false]

      test[document.getElementById("answerIndex").value-1]= true;

      const newQuestion = {
        questionText : document.getElementById("questionText").value,
        hint: document.getElementById("hint").value,
        answerIndex: document.getElementById("answerIndex").value,
        answerOptions:[
          { answerText: document.getElementById("answerOption1").value, isCorrect: test[0] },
				{ answerText:document.getElementById("answerOption2").value, isCorrect: test[1] },
				{ answerText: document.getElementById("answerOption3").value, isCorrect: test[2]},
				{ answerText: document.getElementById("answerOption4").value, isCorrect: test[3] },
        ]
      };
      this.state.questions.push(newQuestion);
      document.getElementById('myform').reset();

    }

    handleCheck = e => {
     // this.setState({[e.target.name]: e.target.checked})
     console.log(e.target.checked)
    }
   

        render() {
            //const { errors } = this.state;

      //   console.log(document.getElementById("check1").checked, "checked < ====")
      const {check1, check2, check3, check4} = this.state
      console.log(check1, check2, " <+===checks")
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
                  <h5>Questions</h5>
                      <form id = "myform" noValidate onAdd = {this.onAdd}>
                          Question
                          <input id="questionText" label="question" type="text" />
                          Hint
                          <input id="hint" type="text" />
                          Choice 1
                          <input id="answerOption1" type="text" />
                          {/* <input type="checkbox" style={{opacity: 1}} onChange={this.handleCheck}  checked={check1} name="check1"/> */}
                          Choice 2
                          <input id="answerOption2" type="text" />
                          {/* <input type="checkbox" style={{opacity: 1}} onChange={this.handleCheck} checked={check2} name="check2"/> */}
                          Choice 3
                          <input id="answerOption3"  type="text" />
                          {/* <input type="checkbox" style={{opacity: 1}} onChange={this.handleCheck} checked={check3} name="check3"/> */}
                          Choice 4
                          <input id="answerOption4" type="text" />
                          {/* <input type="checkbox" style={{opacity: 1}} checked={check4}  onChange={this.handleCheck}  checked={check4} name="check4"/> */}
                          Answer Index
                          <input id="answerIndex" type="text" />
                         
                          <button
                            type="button"
                            className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                            onClick={this.addQuestion}
                          >
                            add
                          </button>
                        </form>
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