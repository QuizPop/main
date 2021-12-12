import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const Platform = (props) => {
  const myId = props.match.params.id;

  console.log(myId, "<===my id");

  const [platform, setPlatform] = useState({});
  const [quizes, setQuizes] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/Platforms/${myId}`, {})
      .then((res) => {
        const data = res.data;
        axios
          .get(`/api/Platforms/${data.owner_ID}/Quizzes`)
          .then((quizzesData) => {
            const quizzesParsed = quizzesData.data;
            setQuizes(quizzesParsed);
            setPlatform(data);
          })
          .catch((err) => console.log(err));

        console.log(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div style={{ height: "75vh" }} className="">
      <div className="container mt-12">
        <div className="row profile-card mt-12">
          <div className="col s12">
            <h4>
              <b>Platform : </b>
              <p className="flow-text grey-text text-darken-1">
                <span style={{ fontFamily: "monospace" }}></span>
              </p>

              <p className="flow-text grey-text text-darken-1">
                <span className="field-label">Name:</span> {platform.name}
                <span style={{ fontFamily: "monospace" }}></span>
              </p>

              <p className="flow-text grey-text text-darken-1">
                <span className="field-label">Description:</span>{" "}
                {platform.description}
                <span style={{ fontFamily: "monospace" }}></span>
              </p>

              <p className="flow-text grey-text text-darken-1">
                <span className="field-label">Tag:</span>{" "}
                {platform.tags &&
                  platform.tags.split(",").map((item) => (
                    <span
                      style={{
                        backgroundColor: "#95a5a6",
                        color: "#FFF",
                        padding: "4px 10px",
                        borderRadius: "10px",

                        marginRight: "4px",
                      }}
                    >
                      {item}
                    </span>
                  ))}
                <span style={{ fontFamily: "monospace" }}></span>
              </p>
            </h4>
          </div>
        </div>
      </div>
      <h5 style={{ marginTop: "3rem", marginLeft: "3rem" }}>
        Quizzes by {platform.name}
      </h5>
      <div className="quiz-board" style={{ paddingTop: "1rem" }}>
        {quizes.map((quiz) => (
          <Link
            to={
              props.auth.user.isPlatform
                ? `/quiz-edit/${quiz._id}`
                : `/quiz/${quiz._id}`
            }
            key={quiz._id}
          >
            <div className="quiz-card" key={quiz._id}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <p
                  style={{
                    fontSize: "18px",
                    fontWeight: "600",
                    marginTop: 0,
                    color: "#34495e",
                  }}
                >
                  {quiz.name}
                </p>
                {props.auth.user.isPlatform && (
                  <button
                    style={{
                      width: "60px",
                      borderRadius: "3px",
                      letterSpacing: "1.5px",
                    }}
                    onClick={() => {}}
                    className="btn btn-small waves-effect waves-light hoverable green accent-5"
                  >
                    Edit
                  </button>
                )}
              </div>
              <p>Description: {quiz.description}</p>
              <p className="time-label">
                <img className="timer-icon mr-2" src="/assets/img/timer.png" />{" "}
                {("0" + Math.floor(quiz.time_limit / 60)).slice(-2) +
                  ":" +
                  ("0" + Math.floor(quiz.time_limit % 60)).slice(-2)}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(Platform);
