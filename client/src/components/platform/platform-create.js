import React, { Component } from "react";
// import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";
// import { correct } from "react-redux";
// import classnames from "classnames";
import { connect } from "react-redux";
import { Platform_Update } from "../../actions/PlatformActions";
class platform extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      description: "",
      tags: "",
    };
  }

  componentDidMount() {
    axios
      .get(`/api/Platforms/${this.props.match.params.id}`)
      .then((res) => {
        const platform = res.data;
        this.setState({
          ...this.state,
          name: platform.name,
          description: platform.description,
          tags: platform.tags,
        });
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
  onSubmit = (e) => {
    e.preventDefault();
    const platform = {
      description: this.state.description,
      tags: this.state.tags,
    };
    this.props.Platform_Update(
      this.props.match.params.id,
      platform,
      this.props.history
    );
  };

  render() {
    //const { errors } = this.state;
    return (
      <div className="container mt-12">
        <div className="row profile-card mt-12">
          <div className="col s8 offset-s2">
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4>Edit Platform Settings</h4>
            </div>
            <form noValidate onSubmit={this.onSubmit}>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.name}
                  disabled={true}
                  id="name"
                  type="text"
                />
                <label htmlFor="name" className="active">
                  Name
                </label>
              </div>

              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.description}
                  id="description"
                  type="text"
                />
                <label htmlFor="description" className="active">
                  Description
                </label>
              </div>

              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.tags}
                  id="tags"
                  type="text"
                />
                <label htmlFor="tags" className="active">
                  Tags
                </label>
              </div>

              <div
                className="col s12"
                style={{ paddingLeft: "11.250px", marginBottom: "1rem" }}
              >
                <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem",
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
      </div>
    );
  }
}

platform.propTypes = {
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { Platform_Update })(platform);
