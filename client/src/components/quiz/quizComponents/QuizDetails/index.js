import { useState, useEffect } from "react";
const QuizDetails = ({ quiz, onUpdate }) => {
  const [quizData, setQuizData] = useState(quiz);
  const [showEditOptions, setShowEditOptions] = useState(false);

  useEffect(() => {
    setQuizData(quiz);
  }, [quiz]);

  console.log(quizData);
  const onChange = (e) => {
    const update = { ...quizData };
    update[e.target.id] = e.target.value;
    setQuizData(update);
  };
  return (
    <div className="col s12 profile-card p-4" style={{ position: "relative" }}>
      {showEditOptions && (
        <>
          {" "}
          <img
            src="/assets/img/close.png"
            style={{
              position: "absolute",
              right: "2rem",
              top: "2rem",
              width: "24px",
              height: "24px",
              cursor: "pointer",
            }}
            onClick={() => setShowEditOptions(false)}
          />
          <div className="col s12" style={{ paddingLeft: "11.250px" }}>
            <h4>Edit Quiz</h4>
          </div>
          <form noValidate>
            <div className="input-field col s12">
              <input
                onChange={(e) => onChange(e)}
                value={quizData.name}
                id="name"
                type="text"
              />
              <label htmlFor="name" className="active">
                Name
              </label>
            </div>
            <div className="input-field col s12">
              <input
                onChange={(e) => onChange(e)}
                value={quizData.description}
                id="description"
                type="text"
              />
              <label htmlFor="description" className="active">
                Description
              </label>
            </div>
            <div className="input-field col s12">
              <input
                onChange={(e) => onChange(e)}
                value={quizData.time_limit}
                id="time_limit"
                type="text"
              />
              <label htmlFor="time_limit" className="active">
                Time limit
              </label>
            </div>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <button
                style={{
                  width: "150px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                  marginTop: "1rem",
                  marginBottom: "2rem",
                }}
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onUpdate(quizData);
                  setShowEditOptions(false);
                }}
                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
              >
                Update
              </button>
            </div>
          </form>
        </>
      )}
      {!showEditOptions && (
        <div style={{ position: "relative" }}>
          <img
            src="/assets/img/edit.png"
            style={{
              position: "absolute",
              right: "1rem",
              top: "0rem",
              width: "28px",
              height: "28px",
              cursor: "pointer",
            }}
            onClick={() => setShowEditOptions(true)}
          />
          <p className="quiz-detail-line">
            Name: <span className="quiz-detail-line-value">{quiz.name}</span>
          </p>
          <p className="quiz-detail-line">
            Description:{" "}
            <span className="quiz-detail-line-value">{quiz.description}</span>
          </p>
          <p className="quiz-detail-line">
            Time Limit:{" "}
            <span className="quiz-detail-line-value">{quiz.time_limit}</span>
          </p>
        </div>
      )}
    </div>
  );
};
export default QuizDetails;
