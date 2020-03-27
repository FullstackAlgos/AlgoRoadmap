import React, { Component } from "react";
import { connect } from "react-redux";
import { adminChange, deleteUser } from "../../store";

class AdminUser extends Component {
  changeAdmin = update => {
    const { u, adminChange } = this.props;
    adminChange(u.id, update);
  };

  removeUser = () => {
    const { u, deleteUser } = this.props;
    deleteUser(u.id);
  };

  render() {
    const { u } = this.props;

    return (
      <div className="adminUserDiv">
        <div className="adminUserRow">
          <h3 className="adminQuestName">{u.name}</h3>

          {u.isAdmin ? (
            <button
              type="button"
              onClick={() => this.changeAdmin(false)}
              className="adminQuestBtn gBtn"
            >
              Remove Admin
            </button>
          ) : (
            <button
              type="button"
              onClick={() => this.changeAdmin(true)}
              className="adminQuestBtn gBtn"
            >
              Grant Admin
            </button>
          )}

          <button
            type="button"
            onClick={this.removeUser}
            className="adminQuestBtn gBtn"
          >
            Remove User
          </button>
        </div>

        <div className="adminUserRow">
          <p className="adminUserText">Admin: {u.isAdmin ? "Yes" : "No"}</p>

          <p className="adminUserText">
            Completed Questions: {u.questions.length}
          </p>
        </div>
      </div>
    );
  }
}

const mapDispatch = dispatch => {
  return {
    adminChange: (userId, update) => dispatch(adminChange(userId, update)),
    deleteUser: userId => dispatch(deleteUser(userId))
  };
};

export default connect(null, mapDispatch)(AdminUser);
