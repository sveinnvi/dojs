import React from 'react'

export default React.createClass({
  render() {
    return (
      <div>
        <h2>
        repoName er {this.props.params.repoName+". "}
        userName er {this.props.params.userName}
        </h2>
      </div>
    )
  }
})
