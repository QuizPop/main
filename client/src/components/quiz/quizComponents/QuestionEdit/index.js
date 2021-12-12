import { useState } from "react";

const QuestionEdit = ({
  data,
  onAdd,
  onUpdate,
  showLabel = true,
  className = "profile-card p-8 mb-8",
  type = "add",
  index,
  controlled = false,
}) => {
  const [question, setQuestion] = useState(data || {});
  const [active, setActive] = useState(controlled);
  const [errors, setErrors] = useState({
    questionText: null,
    hint: null,
    answerOption1: null,
    answerOption2: null,
    answerOption3: null,
    answerOption4: null,
    answerIndex: null,
  });

  const isValidInput = () => {
    const isQuestionTextValid =
      question.questionText && question.questionText.trim().length > 0;
    const isHintValid = question.hint && question.hint.trim().length > 0;
    const isAnswerOption1Valid =
      question.answerOptions[0] &&
      question.answerOptions[0].answerText.trim().length > 0;
    const isAnswerOption2Valid =
      question.answerOptions[1] &&
      question.answerOptions[1].answerText.trim().length > 0;
    const isAnswerOption3Valid =
      question.answerOptions[2] &&
      question.answerOptions[2].answerText.trim().length > 0;
    const isAnswerOption4Valid =
      question.answerOptions[3] &&
      question.answerOptions[3].answerText.trim().length > 0;
    const isAnswerIndexValid =
      question.answerIndex && question.answerIndex.trim().length > 0;

    const isValid =
      isQuestionTextValid &&
      isHintValid &&
      isAnswerOption1Valid &&
      isAnswerOption2Valid &&
      isAnswerOption3Valid &&
      isAnswerOption4Valid &&
      isAnswerIndexValid;

    if (isValid) {
      return true;
    } else {
      const errorsMap = {
        questionText: isQuestionTextValid ? null : "Question cannot be empty",
        hint: isHintValid ? null : "Hint cannot be empty",
        answerOption1: isAnswerOption1Valid
          ? null
          : "Choice 1 value cannot be empty",
        answerOption2: isAnswerOption2Valid
          ? null
          : "Choice 2 value cannot be empty",
        answerOption3: isAnswerOption3Valid
          ? null
          : "Choice 3 value cannot be empty",
        answerOption4: isAnswerOption4Valid
          ? null
          : "Choice 4 value cannot be empty",
        answerIndex: isAnswerIndexValid
          ? null
          : "Answer index value cannot be empty",
      };
      setErrors(errorsMap);
      return false;
    }
  };
  const handleAddQuestion = () => {
    if (isValidInput()) {
      onAdd && onAdd(question);
      setQuestion(data);
      setActive(false);
    }
  };
  const handleUpdateQuestion = () => {
    if (isValidInput()) {
      onUpdate && onUpdate(index, question);
    }
  };
  const onChange = (e) => {
    const update = { ...question };
    switch (e.target.id) {
      case "answerOption1":
        update.answerOptions[0].answerText = e.target.value;
        update.answerOptions[0].isCorrect = update.answerIndex == 1;
        break;
      case "answerOption2":
        update.answerOptions[1].answerText = e.target.value;
        update.answerOptions[1].isCorrect = update.answerIndex == 2;
        break;
      case "answerOption3":
        update.answerOptions[2].answerText = e.target.value;
        update.answerOptions[1].isCorrect = update.answerIndex == 3;
        break;
      case "answerOption4":
        update.answerOptions[3].answerText = e.target.value;
        update.answerOptions[3].isCorrect = update.answerIndex == 4;
        break;

      default:
        update[e.target.id] = e.target.value;
    }

    setQuestion(update);
    setErrors({
      questionText: null,
      hint: null,
      answerOption1: null,
      answerOption2: null,
      answerOption3: null,
      answerOption4: null,
      answerIndex: null,
    });
  };
  if (!active)
    return (
      <button
        type="button"
        className="btn btn-large waves-effect waves-light hoverable blue accent-3 mt-4"
        onClick={() => setActive(true)}
      >
        Add Question
      </button>
    );
  return (
    <>
      {showLabel && (
        <h5 style={{ marginTop: "3rem", marginBottom: "1rem" }}>
          Add Question
        </h5>
      )}
      <div className={className}>
        <form id="myform" noValidate onSubmit={() => handleAddQuestion()}>
          <span className="quiz-field-label">Question</span>
          <input
            id="questionText"
            label="question"
            value={question.questionText || ""}
            onChange={onChange}
            type="text"
          />
          <span className="red-text">{errors && errors.questionText}</span>
          <span className="quiz-field-label">Hint</span>
          <input
            id="hint"
            type="text"
            onChange={onChange}
            value={question.hint || ""}
          />
          <span className="red-text">{errors && errors.hint}</span>
          <span className="quiz-field-label">Choice 1</span>
          <input
            id="answerOption1"
            type="text"
            onChange={onChange}
            value={
              question && question.answerOptions
                ? question.answerOptions[0].answerText
                : ""
            }
          />
          <span className="red-text">{errors && errors.answerOption1}</span>
          {/* <input type="checkbox" style={{opacity: 1}} onChange={this.handleCheck}  checked={check1} name="check1"/> */}
          <span className="quiz-field-label">Choice 2</span>
          <input
            id="answerOption2"
            type="text"
            onChange={onChange}
            value={
              question && question.answerOptions
                ? question.answerOptions[1].answerText
                : ""
            }
          />
          <span className="red-text">{errors && errors.answerOption2}</span>

          {/* <input type="checkbox" style={{opacity: 1}} onChange={this.handleCheck} checked={check2} name="check2"/> */}
          <span className="quiz-field-label">Choice 3</span>
          <input
            id="answerOption3"
            type="text"
            onChange={onChange}
            value={
              question && question.answerOptions
                ? question.answerOptions[2].answerText
                : ""
            }
          />
          <span className="red-text">{errors && errors.answerOption3}</span>

          {/* <input type="checkbox" style={{opacity: 1}} onChange={this.handleCheck} checked={check3} name="check3"/> */}
          <span className="quiz-field-label">Choice 4</span>
          <input
            id="answerOption4"
            type="text"
            onChange={onChange}
            value={
              question && question.answerOptions
                ? question.answerOptions[3].answerText
                : ""
            }
          />
          <span className="red-text">{errors && errors.answerOption4}</span>

          {/* <input type="checkbox" style={{opacity: 1}} checked={check4}  onChange={this.handleCheck}  checked={check4} name="check4"/> */}
          <span className="quiz-field-label">Answer Index</span>
          <input
            id="answerIndex"
            type="text"
            onChange={onChange}
            value={question.answerIndex}
          />
          <span className="red-text">{errors && errors.answerIndex}</span>

          <button
            type="button"
            className="btn btn-large waves-effect waves-light hoverable blue accent-3 mt-4"
            disabled={
              errors.questionText ||
              errors.hint ||
              errors.answerOption1 ||
              errors.answerOption2 ||
              errors.answerOption3 ||
              errors.answerOption4 ||
              errors.answerIndex
            }
            onClick={() =>
              type == "add" ? handleAddQuestion() : handleUpdateQuestion()
            }
          >
            {type == "add" ? "Add" : "Update"}
          </button>
        </form>
      </div>
    </>
  );
};

export default QuestionEdit;
