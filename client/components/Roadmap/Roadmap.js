import React, { Component } from "react";
import { connect } from "react-redux";
import RoadmapArrow from "./RoadmapArrow";
import RoadmapQuestion from "./RoadmapQuestion";
import { switchUserActive } from "../../store";

class Roadmap extends Component {
  constructor() {
    super();
    this.state = {
      activeQ: "--",
      selectedQs: [],
    };
  }

  formatQualifyingQs = (questions, userQs) => {
    const doneQs = new Set();
    userQs.forEach((q) => doneQs.add(q.question.id));

    const output = questions.filter((q) => !doneQs.has(q.id));
    output.sort((a, b) => {
      if (a.tag.ranking === b.tag.ranking) {
        return a.difficulty - b.difficulty;
      }
      return a.tag.ranking - b.tag.ranking;
    });

    return output.slice(0, 3);
  };

  getTopics = (questions) => {
    const topics = new Set();

    questions.forEach((q) => topics.add(q.tag.name));

    return [...topics];
  };

  componentDidUpdate() {
    const { questions, likes } = this.props;
    if (this.state.activeQ === "--" && questions.length && likes.length) {
      const input = this.formatQualifyingQs(questions, likes);
      this.setState({
        activeQ: input[0].name,
      });
    }
  }

  setActive = (evt) => {
    const activeName = evt.target.innerText;
    evt.persist();

    if (activeName === this.state.activeQ) this.setState({ activeQ: "--" });
    else this.setState({ activeQ: activeName });
  };

  render() {
    const { questions, likes } = this.props,
      orderedQs = this.formatQualifyingQs(questions, likes),
      topics = this.getTopics(orderedQs);

    return (
      <div className="roadmapFullDiv mainDiv">
        {topics.length === 0 ? (
          <span className="roadMapHeader">You're done with every topic!</span>
        ) : (
          <span className="roadMapHeader">
            <span className="roadmapNextFill">Current Topic of Focus:</span>

            {topics.map((t, i) => (
              <span key={i} className="roadmapNextTopic">
                &nbsp;{i === topics.length - 1 ? t : `${t},`}
              </span>
            ))}
          </span>
        )}

        <div className="roadMapFlowDiv">
          {orderedQs
            ? orderedQs.map((q, i) => (
                <div key={i} className="roadMapIndDiv">
                  <RoadmapQuestion key={i} question={q} questionNum={i + 1} />

                  <RoadmapArrow
                    key={i + orderedQs.length}
                    currQ={q}
                    nextQ={orderedQs[i + 1]}
                  />
                </div>
              ))
            : null}
        </div>
      </div>
    );
  }
}

const mapState = (state) => ({
  questions: state.questions,
  likes: state.likes,
});

const mapDispatch = (dispatch) => ({
  switchUserActive: () => dispatch(switchUserActive()),
});

export default connect(mapState, mapDispatch)(Roadmap);
