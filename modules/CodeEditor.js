import React from 'react'
import axios from 'axios'

import DialogWindow from './DialogWindow'
import Grid from 'react-bootstrap/lib/Grid'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'


export default React.createClass({

  // contextTypes: {
  //   router: React.PropTypes.object
  // },

  getInitialState() {
    // this.setCodeEditor();
    return (this.state = {
      isResultsReturned: false,
      results: "Hér munu keyrsluniðurstöður úr forritinu koma óbreyttar. Þar á meðal villumeldingar ef einhvað er vitlaust gert.",
      feedback: "Vekomin/n. Til hamingju með að taka þín fyrstu skref í forritun. \r\n Til eru nokkrar týpur af breytum sem er gott að hafa í huga. Til eru heiltölur (int), fleytitölur (double), strengir (string), sanngildi (boolean) og fleira. \r\n Einnig eru til nokkrar týpur af virkjum, einfaldir virkjar sem við þekkjum vel eins og plús +, mínus -, margfölun *, og deiling /, og fleiri virkjar sem við munum sjá síðar.",
      path: "start",
      instructions: " Prófaðu að beita einhverjum virkja (+ - * /) á tvær tölur (heiltölur eða fleytitölur), til dæmis 1+5.",
      codeMirror: {}
    });
  },

  setCodeEditor() {
    var myCodeMirror = CodeMirror.fromTextArea(this.refs.coder,{theme: "base16-dark"});
    this.setState({
      codeMirror: myCodeMirror
    })
  },

  handleSubmit(e) {
    e.preventDefault();
    // console.log(e.target.elements[0].value);
    console.log(this.state.codeMirror.getValue());
    // var input = e.target.elements[0].value;
    var input = this.state.codeMirror.getValue();
    var currentLesson = this.props.lessonInPath;
    console.log(currentLesson);
    this.sendCode(input, currentLesson);
  },


  handleResponse(res) {
    console.log("HANDLE RESPONSE");

    let instructionsToUse;
    let feedbackToUse;
    const oldInstructions = this.state.instructions;
    const oldFeedback = this.state.feedback;

    if(!res.data.userPassed) {
      instructionsToUse = oldInstructions;
      feedbackToUse = res.data.feedback + " <errorfeedback> \r\n" + oldFeedback;
    } else {
      instructionsToUse = res.data.instructions;
      feedbackToUse = res.data.feedback;
    }

    this.setState({
      isResultsReturned: true,
      results: res.data.results,
      feedback: feedbackToUse,
      instructions: instructionsToUse
    });

    if(res.data.userPassed) {
      this.setState({
        path: res.data.path
      });
      this.props.onUpdatePath(res.data.path);
      this.state.codeMirror.setValue("");
    }
  },

  sendCode (data, lesson) {
    axios.post('/CodingPage', {
      codeFromUser: data,
      currentLesson: lesson
    })
      .then(function(res) {
        console.log(res.data);
        this.handleResponse(res);

      }.bind(this))
      .catch(function (err){
        console.log(err);
      });
    },

    componentDidMount() {
      this.setCodeEditor();
    },


  render() {
    return (
      <div className="code-editor">
        <Grid>
          <Row>
            <Col md={6}>
            <h4>Hér fer kóðinn þinn</h4>
              <form onSubmit={this.handleSubmit} method="post" action="/CodingPage">
                <div className="window-body">

                  <textarea ref="coder" value={this.state.textAreaValue} className="code-input language-javascript" name="codeFromUser" spellCheck="false" type="text" cols="40" rows="10" />

                </div>
                <button type="submit" >Try code!</button>
              </form>
            </Col>
            <Col md={6}>
              <DialogWindow results = {this.state.results} feedback = {this.state.feedback} instructions = {this.state.instructions}>
              </DialogWindow>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
});
