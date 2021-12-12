import { useState, useEffect } from "react";
import QuizEdit from "../../Quiz-Edit";
import QuestionEdit from "../QuestionEdit";

const Question = ({ index, questionData, onEdit, onDelete, total }) => {
  const [question, setQuestion] = useState(questionData);
  const [showOptions, setShowOptions] = useState(false);
  const [showEditOptions, setShowEditOptions] = useState(false);

  useEffect(() => {
    setQuestion(questionData);
  }, [questionData]);
  return (
    <div className={index != total - 1 && "bb-1"}>
      <div className="question-item">
        <p>
          <span style={{ fontWeight: "bold" }}>{`Q.${index + 1}: `}</span>
          {question.questionText}
        </p>
        <div className="tools">
          <img
            src="/assets/img/edit.png"
            style={
              showEditOptions
                ? {
                    background: "#2ecc71",
                    borderRadius: "6px",
                    padding: "6px",
                    width: "32px",
                    height: "32px",
                  }
                : {}
            }
            onClick={() => setShowEditOptions(!showEditOptions)}
          />
          <img src="/assets/img/delete.png" onClick={() => onDelete(index)} />
          <div className="vertical-divider"></div>
          <img
            className={showOptions ? "flip-vertical" : "animate-change"}
            src="/assets/img/down-arrow.png"
            onClick={() => setShowOptions(!showOptions)}
          />
        </div>
      </div>
      {showOptions && (
        <>
          <p style={{ fontWeight: "bold" }}>Answer Options</p>
          <div className="question-options-choice">
            {question &&
              question.answerOptions.map((item, index) => (
                <span className="options-choice">
                  <span style={{ fontWeight: "bold", marginRight: "8px" }}>{`${
                    index + 1
                  }) `}</span>
                  {item.answerText}
                  {question.answerIndex == index + 1 && (
                    <img
                      className="correct-option-icon"
                      src="/assets/img/check.png"
                    />
                  )}
                </span>
              ))}
          </div>
        </>
      )}
      {showEditOptions && (
        <QuestionEdit
          index={index}
          data={question}
          controlled={true}
          onAdd={() => {}}
          onUpdate={(index, data) => {
            onEdit(index, data);
            setShowEditOptions(false);
          }}
          showLabel={false}
          className="question-edit-card"
          type="update"
        />
      )}
    </div>
  );
};

export default Question;
