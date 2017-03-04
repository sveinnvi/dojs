import React from 'react'
import NavLink from './NavLink'

export default React.createClass({

  contextTypes: {
    router: React.PropTypes.object
  },

  handleSubmit(e) {
    e.preventDefault()
    const userName = e.target.elements[0].value
    const repo = e.target.elements[1].value
    const path = `/repos/${userName}/${repo}`
    console.log(path);
    this.context.router.push(path)
  },

  render() {
    return (
      <div>
        <h2>Ég er h2 í Repos!</h2>
        <ul>
          <li><NavLink to="/repos/abc/abc123">RepoLinkur abc</NavLink></li>
          <li><NavLink to="/repos/qwe/qwe123">RepoLinkur qwe</NavLink></li>
          <li>
            <form onSubmit={this.handleSubmit}>
              <input type="text" placeholder="userName PlaceHolder"/> {' '}
              <input type="text" placeholder="repo PlaceHolder"/> {' '}
              <button type="submit">Gogogo button that will submit</button>
            </form>
          </li>
        </ul>
        {this.props.children}
      </div>
    )
  }
})
