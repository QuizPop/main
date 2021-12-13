import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  logoutUser,
  updateAvatar,
  updateUser,
} from "../../actions/authActions";
import classnames from "classnames";
import axios from "axios";
// import Quiz from "../quiz/quiz"
// import { Link } from "react-router-dom";

class Dashboard extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    password2: "",
    bio: "",
    isEditMode: false,
    errors: {
      name: "",
      email: "",
      password: "",
      password2: "",
      bio: "",
    },
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
        name: nextProps.auth.user.name,
        email: nextProps.auth.user.email,
        bio: nextProps.auth.user.bio,
      });
    }
  }

  componentDidMount() {
    this.setState({ ...this.state, ...this.props.auth.user });
  }

  onLogoutClick = (e) => {
    e.preventDefault();
    this.props.logoutUser();
  };

  onSubmit = (e) => {
    e.preventDefault();

    const user = {
      name: this.state.name,
      email: this.state.email,
      bio: this.state.bio,
      id: this.props.auth.user.id,
    };
    this.props.updateUser(user, this.props.history);
    this.setState({ ...this.state, editMode: false });
  };

  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  selectAvatar = (avatarId) => {
    this.props.updateAvatar({ ...this.props.auth.user, avatarId: avatarId });
    this.setState({ ...this.state, showAvatarSelector: false });
    axios
      .put(`/api/users/${this.props.auth.user.id}/update-avatar`, {
        avatarId: avatarId,
      })
      .then((res) => {
        //   const data = res.data;
        this.props.updateAvatar({
          ...this.props.auth.user,
          avatarId: res.data.avatarId,
        });
      })
      .catch((err) => console.log(err));
  };

  state = {
    showAvatarSelector: false,
  };

  render() {
    const { user } = this.props.auth;
    const { errors } = this.state;
    // user.name.split(" ")[0]
    console.log(user);
    console.log();
    return (
      <>
        {this.state.editMode && (
          <form
            noValidate
            onSubmit={this.onSubmit}
            className="profile-card container mt-12 p-8"
          >
            <h5>Edit Profile</h5>
            <div className="input-field col s12">
              <input
                onChange={this.onChange}
                value={this.state.name}
                error={errors ? errors.name : ""}
                id="name"
                type="text"
                className={classnames("", {
                  invalid: errors && errors.name,
                })}
              />
              <label htmlFor="name" className="active">
                Name
              </label>
              <span className="red-text">{errors && errors.name}</span>
            </div>
            <div className="input-field col s12">
              <input
                onChange={this.onChange}
                value={this.state.email}
                error={errors ? errors.email : ""}
                id="email"
                type="email"
                className={classnames("", {
                  invalid: errors && errors.email,
                })}
              />
              <label htmlFor="email" className="active">
                Email
              </label>
              <span className="red-text">{errors && errors.email}</span>
            </div>

            <div className="input-field col s12">
              <input
                onChange={this.onChange}
                value={this.state.bio}
                error={errors ? errors.bio : ""}
                id="bio"
                type="text"
                className={classnames("", {
                  invalid: errors && errors.bio,
                })}
              />
              <label htmlFor="bio" className="active">
                Bio
              </label>
              <span className="red-text">{errors && errors.bio}</span>
            </div>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <button
                style={{
                  width: "150px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                  marginTop: "1rem",
                }}
                type="submit"
                className="btn btn-large waves-effect waves-light hoverable dark-cyan accent-3"
              >
                Update
              </button>
            </div>
          </form>
        )}
        {this.state.showAvatarSelector && (
          <div className="overlay">
            <div className="avatar-selector">
              <div className="avatar-selector-header">
                <p>Select Avatar</p>
                <img
                  src="/assets/img/close.png"
                  className="close-button"
                  onClick={() =>
                    this.setState({ ...this.state, showAvatarSelector: false })
                  }
                />
              </div>
              <div className="avatar-selector-grid">
                <img
                  src="/assets/img/avatars/avatar-1.png"
                  onClick={() => this.selectAvatar(1)}
                />
                <img
                  src="/assets/img/avatars/avatar-2.png"
                  onClick={() => this.selectAvatar(2)}
                />
                <img
                  src="/assets/img/avatars/avatar-3.png"
                  onClick={() => this.selectAvatar(3)}
                />
                <img
                  src="/assets/img/avatars/avatar-4.png"
                  onClick={() => this.selectAvatar(4)}
                />
                <img
                  src="/assets/img/avatars/avatar-5.png"
                  onClick={() => this.selectAvatar(5)}
                />
                <img
                  src="/assets/img/avatars/avatar-6.png"
                  onClick={() => this.selectAvatar(6)}
                />
                <img
                  src="/assets/img/avatars/avatar-7.png"
                  onClick={() => this.selectAvatar(7)}
                />
                <img
                  src="/assets/img/avatars/avatar-8.png"
                  onClick={() => this.selectAvatar(8)}
                />
                <img
                  src="/assets/img/avatars/avatar-9.png"
                  onClick={() => this.selectAvatar(9)}
                />
                <img
                  src="/assets/img/avatars/avatar-10.png"
                  onClick={() => this.selectAvatar(10)}
                />
              </div>
            </div>
          </div>
        )}
        {!this.state.editMode && (
          <div
            style={{ height: "75vh", marginTop: "4rem" }}
            className="container valign-wrapper"
          >
            <div className="row profile-card">
              {!this.props.auth.user.isPlatform && (
                <div className="score-bubble">{user.score || 0}</div>
              )}
              {!this.props.auth.user.isPlatform && (
                <img
                  src={
                    this.props.auth.user.avatarId > 0
                      ? `/assets/img/avatars/avatar-${
                          this.props.auth.user.avatarId || "1"
                        }.png`
                      : "/assets/img/user.png"
                  }
                  className="avatar"
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    this.setState({ ...this.state, showAvatarSelector: true })
                  }
                />
              )}
              <div className="col s12">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <h4>
                    <b>Account Information: </b>
                  </h4>
                  <div
                    className="col s6 right-align"
                    style={{ paddingLeft: "11.250px" }}
                  >
                    <button
                      style={{
                        width: "150px",
                        borderRadius: "3px",
                        letterSpacing: "1.5px",
                        marginTop: "1rem",
                      }}
                      onClick={() =>
                        this.setState({ ...this.state, editMode: true })
                      }
                      type="button"
                      className="btn btn-large waves-effect waves-light hoverable dark-cyan accent-3"
                    >
                      Edit Profile
                    </button>
                  </div>
                </div>
                <p className="flow-text grey-text text-darken-1">
                  <span style={{ fontFamily: "monospace" }}></span>
                </p>

                <p className="flow-text grey-text text-darken-1">
                  <span className="field-label">Name:</span> {user.name}
                  <span style={{ fontFamily: "monospace" }}></span>
                </p>

                <p className="flow-text grey-text text-darken-1">
                  <span className="field-label"> Email:</span> {user.email}
                  <span style={{ fontFamily: "monospace" }}></span>
                </p>

                <p className="flow-text grey-text text-darken-1">
                  <span className="field-label">Bio:</span> {user.bio}
                  <span style={{ fontFamily: "monospace" }}></span>
                </p>

                <p className="flow-text grey-text text-darken-1">
                  <span className="field-label">Member since:</span>{" "}
                  {user.date.slice(0, 10)}
                  <span style={{ fontFamily: "monospace" }}></span>
                </p>

                {!this.props.auth.user.isPlatform &&
                  this.props.auth.user.badges && (
                    <p
                      className="flow-text grey-text text-darken-1"
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <span className="field-label"> Badges:</span>
                      <span style={{ fontFamily: "monospace" }}></span>
                      {this.props.auth.user.badges.includes(
                        "badge-brainiac"
                      ) && (
                        <img
                          src="/assets/img/idea.png"
                          className="badge-icon"
                          title="Brainiac"
                        />
                      )}
                      {this.props.auth.user.badges.includes("badge-pro") && (
                        <img
                          src="/assets/img/badge.png"
                          className="badge-icon"
                          title="Pro"
                        />
                      )}
                      {this.props.auth.user.badges.includes(
                        "badge-swift-finish"
                      ) && (
                        <img
                          src="/assets/img/lightning.png"
                          title="Swift Finish"
                          className="badge-icon"
                        />
                      )}
                    </p>
                  )}
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}
Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});
export default connect(mapStateToProps, {
  logoutUser,
  updateAvatar,
  updateUser,
})(Dashboard);
