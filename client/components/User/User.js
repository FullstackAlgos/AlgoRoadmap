import React, { Component } from "react";
import { connect } from "react-redux";
import { getUserQuestThunk } from "../../store";
import AllQuestPie from "../Chart/AllQuestPie";

class User extends Component {
  componentDidMount() {
    const { getUserQuestThunk, user } = this.props;
    if (user) getUserQuestThunk(user.id);
  }

  componentDidUpdate(prevProps) {
    const { getUserQuestThunk, user } = this.props;
    if (user && user.id !== prevProps.user.id) getUserQuestThunk(user.id);
  }

  render() {
    const { user, questions, userQuestions, formFlip } = this.props;

    return (
      <div className="userFullDiv">
        {user.id ? (
          <>
            <h2 className="userHeader">Welcome, {user.name}!</h2>

            <AllQuestPie
              userLen={userQuestions.length}
              questLen={questions.length}
            />

            <button
              type="button"
              className="questionAddBtn gBtn"
              onClick={formFlip}
            >
              Add Question
            </button>
          </>
        ) : (
          <h2 className="userHeader">
            <a href="/SignIn" className="userSignInLink">
              Log In
            </a>{" "}
            to track your progress!
          </h2>
        )}
      </div>
    );
  }
}

const mapState = state => {
  return {
    user: state.user,
    questions: state.questions,
    userQuestions: state.userQuestions
  };
};

const mapDispatch = dispatch => {
  return {
    getUserQuestThunk: userId => dispatch(getUserQuestThunk(userId))
  };
};

export default connect(mapState, mapDispatch)(User);
