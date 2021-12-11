import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const Leaderboard = (props) => {
  const [quizes, setQuizes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  quizes.sort((a, b) => {
    return b["score"] - a["score"];
  });

  const fetchLeaderBoard = async (pageNum) => {
    setLoading(true);

    axios
      .get(`/api/users?page=${pageNum}`)
      .then((res) => {
        axios.get(`/api/users/count`).then((count) => {
          const data = res.data;
          setQuizes(data.data);
          setTotal(count.data);
          setLoading(false);
        });
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const handlePagination = async (pageNum) => {
    setPage(pageNum);
    fetchLeaderBoard(pageNum);
  };

  useEffect(() => {
    fetchLeaderBoard(page);
  }, []);

  if (loading)
    return (
      <div
        style={{
          textAlign: "center",
          width: "100vw",
          height: "90vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src="/assets/img/loader.svg"
          style={{ width: "60px", margin: "0 auto" }}
        />
      </div>
    );
  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      {quizes.map((quiz, index) => (
        <div className="leaderboard-card mb-8" key={quiz._id}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <img
              src={
                quiz.avatarId > 0
                  ? `/assets/img/avatars/avatar-${quiz.avatarId || "1"}.png`
                  : "/assets/img/user.png"
              }
              className="avatar"
            />
            <p
              style={{
                fontSize: "24px",
                width: "60px",
                height: "60px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "600",
                marginLeft: "2rem",
                marginTop: 0,
                borderRadius: "50%",
                backgroundColor: "#9b59b6",
                marginBottom: 0,
                color: "white",
              }}
            >
              #{index + 1 + (page == 1 ? 0 : page - 1) * size}
            </p>
            <p
              style={{
                fontSize: "18px",
                fontWeight: "600",
                marginLeft: "2rem",
                marginTop: 0,
                marginBottom: 0,
                color: "#34495e",
              }}
            >
              {quiz.name}
            </p>
          </div>
          {/* <p>Score: {quiz.score}</p> */}
          {!quiz.isPlatform && quiz.badges && (
            <p
              className="flow-text grey-text text-darken-1"
              style={{ display: "flex", alignItems: "center" }}
            >
              {quiz.badges.includes("badge-brainiac") && (
                <img
                  src="/assets/img/idea.png"
                  className="badge-icon"
                  title="Brainiac"
                />
              )}
              {quiz.badges.includes("badge-pro") && (
                <img
                  src="/assets/img/badge.png"
                  className="badge-icon"
                  title="Pro"
                />
              )}
              {quiz.badges.includes("badge-swift-finish") && (
                <img
                  src="/assets/img/lightning.png"
                  className="badge-icon"
                  title="Swift Finish"
                />
              )}
            </p>
          )}
          <div className="score-bubble-inline">{quiz.score || 0}</div>
        </div>
      ))}
      <div className="pagination">
        {[...Array(Math.ceil(total / size)).keys()].map((item) => (
          <span
            className={page == item + 1 ? "page current" : "page"}
            onClick={() => handlePagination(item + 1)}
          >
            {item + 1}
          </span>
        ))}
      </div>
    </div>
  );
};

Leaderboard.propTypes = {
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: {},
});

export default connect(mapStateToProps, {})(Leaderboard);
