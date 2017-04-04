import React from 'react';

export default React.createClass({

  getInitialState() {
    return(this.state = {
      results: "",
      feedback: "",
      instructions: "",
      errorMsg: ""
    })
  },

  breakText(data) {

    let feedbacks = data.feedback;
    let errorMsg = "";

    if(data.feedback.indexOf("<errorfeedback>") >= 0) {
      console.log("indexOf");
      feedbacks = data.feedback.split("<errorfeedback>");
      errorMsg = feedbacks[0];
      feedbacks = feedbacks[1];
    }

    feedbacks = feedbacks.split("\r\n");

    const pFeedbacks = feedbacks.map((feedback) => <p>{feedback}</p>);
    const instructions = data.instructions.split("\r\n");
    const pInstructions = instructions.map((instr) => <p>{instr}</p>);

    console.log("pFEEDBACKS");
    console.log(pFeedbacks);
    if(errorMsg) {
      // pFeedbacks.unshift(<p className="errorMsg">{errorMsg}</p>);

    }
    console.log("pFEEDBACKS");
    console.log(pFeedbacks);

    return {pFeedb: pFeedbacks, pInstr: pInstructions, error: errorMsg};
  },

  componentWillReceiveProps(nextProps) {
    var pElements = this.breakText(nextProps);
    console.log("Component will mount >");
    console.log("< Component will mount");
    this.setState({
      results: nextProps.results,
      feedback: pElements.pFeedb,
      instructions: pElements.pInstr,
      errorMsg: pElements.error
    })
  },

  render() {
    return (
      <div>
        <h4>Keyrsluniðurstöður</h4>
        <div className="compilation-output-container">
          <p className="compilation-output" >{this.state.results}</p>
        </div>
        <div className="message-feedback">
          <p className="errorMsg">{this.state.errorMsg}</p>
          <p>{this.state.feedback}</p>
        </div>
        <div className="message-feedback">
          <p>{this.state.instructions}</p>
        </div>
        {this.props.children}
      </div>
    );
  }
});
