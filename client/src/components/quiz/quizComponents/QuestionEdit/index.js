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
  const handleAddQuestion = () => {
    onAdd && onAdd(question);
    setQuestion(data);
    setActive(false);
  };
  const handleUpdateQuestion = () => {
    onUpdate && onUpdate(index, question);
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
          <span className="quiz-field-label">Hint</span>
          <input
            id="hint"
            type="text"
            onChange={onChange}
            value={question.hint || ""}
          />
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
          {/* <input type="checkbox" style={{opacity: 1}} checked={check4}  onChange={this.handleCheck}  checked={check4} name="check4"/> */}
          <span className="quiz-field-label">Answer Index</span>
          <input
            id="answerIndex"
            type="text"
            onChange={onChange}
            value={question.answerIndex}
          />
          <button
            type="button"
            className="btn btn-large waves-effect waves-light hoverable blue accent-3 mt-4"
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
