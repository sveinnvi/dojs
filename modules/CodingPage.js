import React from 'react';
import CodeEditor from './CodeEditor'

export default React.createClass({

  contextTypes: {
    router: React.PropTypes.object
  },

  handleUpdatePath(lesson) {
    const nextLesson = lesson;
    const path = `/CodingPage/${nextLesson}`;
    this.context.router.push(path);
  },

  render() {
    return (
      <div>
        <CodeEditor onUpdatePath={this.handleUpdatePath} lessonInPath={this.props.params.lesson}/>
      </div>
    );
  }

})
