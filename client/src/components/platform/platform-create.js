import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { correct } from "react-redux";
import classnames from "classnames";
import { connect } from "react-redux";
import { Platform_Create } from "../../actions/PlatformActions";
class platform extends Component {
    constructor() {
        super();
        this.state = {
            name: "",
            owner_ID: "",
            description: "", 
            tags: ""
        };
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
        const newPlatform = {
            name: this.state.name,
            owner_ID: this.state.owner_ID,
            description: this.state.description,
            tags: this.state.tags
        };
        this.props.Platform_Create(newPlatform, this.props.history);
    };
  
        render() {
            //const { errors } = this.state;
            return (
                <div className="container">
                  <div className="row">
                    <div className="col s8 offset-s2">
                     
                      <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                        <h4>
                          Create a Platform!
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
                            value={this.state.owner_ID}
                            id="owner_ID"
                            type="text"
                          />
                          <label htmlFor="owner_ID">Owner ID</label>
                        </div>


                        <div className="input-field col s12">
                          <input
                            onChange={this.onChange}
                            value={this.state.description}
                            id="description"
                            type="text"
                          />
                          <label htmlFor="description">description</label>
                        </div>

                        <div className="input-field col s12">
                          <input
                            onChange={this.onChange}
                            value={this.state.tags}
                            id="tags"
                            type="text"
                          />
                          <label htmlFor="tags">tags</label>
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
                </div>
                
            );
        }
}

platform.propTypes = {
    errors: PropTypes.object.isRequired
  };

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
  });

export default connect(
    mapStateToProps,
    { Platform_Create }
  )(platform);