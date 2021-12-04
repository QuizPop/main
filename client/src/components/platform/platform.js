import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Platform(props) {
  const myId = props.match.params.id;

  console.log(myId, "<===my id");

  const [platform, setPlatform] = useState({});

  // const handleAnswerOptionClick = (isCorrect) => {
  // 	if (isCorrect) {
  // 		setScore(score + 1);
  // 	}

  // 	const nextQuestion = currentQuestion + 1;
  // 	if (nextQuestion < answerOptions.length) {
  // 		setCurrentQuestion(nextQuestion);
  // 	} else {
  // 		setShowScore(true);
  // 	}
  // };

  useEffect(() => {
    axios
      .get(`/api/Platforms/${myId}`, {})
      .then((res) => {
        const data = res.data;
        setPlatform(data);
        console.log(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div style={{ height: "75vh" }} className="container valign-wrapper">
      <div className="row profile-card">
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
              {platform.tags && platform.tags.split(",").map((item) => (
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
  );
}