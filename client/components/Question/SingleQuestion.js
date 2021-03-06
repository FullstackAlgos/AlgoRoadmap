import React, { Component } from "react";
import { connect } from "react-redux";
import { switchUserActive } from "../../store";
import { difficultMap } from "../../utils/utilities";

class SingleQuestion extends Component {
  numLikes = (likesArr, like) => {
    return likesArr.reduce((a, v) => {
      if (like) {
        if (v.status === "like") a++;
      } else if (v.status === "dislike") a++;

      return a;
    }, 0);
  };

  likedQuest = (user, likes, status) => {
    if (!user.id || !likes) return false;

    for (const q of likes) {
      if (q.userId === user.id && q.status === status) return true;
    }

    return false;
  };

  render() {
    const { show, setActive, done, switchUserActive, q, user } = this.props,
      { id, name, description, difficulty, link, likes } = q,
      liked = this.likedQuest(user, likes, "like"),
      disliked = this.likedQuest(user, likes, "dislike");

    return (
      <div className={`questionFullDiv qFullDiv${!!link}`}>
        <div className="questNameDiv">
          <h3
            className={`questionName qName${show} qNameHover${!!link}`}
            onClick={link ? setActive : null}
          >
            {name}
          </h3>

          {done ? <span className="questNameSymbol">&#10004;</span> : null}

          <span className={`diffMarker difficulty${difficulty}`}>&#9673;</span>
        </div>

        {show ? (
          <div className="questionContent">
            <h4 className="questionDesc">{description}</h4>

            <div className="questionRateDiv">
              <p className="questionRate">
                Completed: <strong>{done ? "Yes" : "No"}</strong>
              </p>

              <p className="questionRate">
                Difficulty: <strong>{difficultMap[difficulty]}</strong>
              </p>

              <p className={`questionRate qRate${liked}`}>
                Likes: <strong>{this.numLikes(likes, true)}</strong>
              </p>

              <p className={`questionRate qRate${disliked}`}>
                Dislikes: <strong>{this.numLikes(likes, false)}</strong>
              </p>
            </div>

            <a
              href={link}
              target="_blank"
              className="questionLink linkText"
              onClick={() => switchUserActive(id, name)}
            >
              &#x3e;&#x3e;&nbsp;&nbsp; Explore the Question
              &nbsp;&nbsp;&#x3c;&#x3c;
            </a>
          </div>
        ) : null}
      </div>
    );
  }
}

const mapState = (state) => ({ user: state.user });

const mapDispatch = (dispatch) => ({
  switchUserActive: (qId, qName) => dispatch(switchUserActive(qId, qName)),
});

export default connect(mapState, mapDispatch)(SingleQuestion);
