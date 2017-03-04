import React from 'react'
import FootballMatch from './FootballMatch'
import HandballMatch from './HandballMatch'

import Grid from 'react-bootstrap/lib/Grid'
import Row from 'react-bootstrap/lib/Row'

export default React.createClass({

  getInitialState() {
    return(this.state = {
      path: this.props.path
    })
  },

  createList (listItem, sportType) {

    if(this.props.path === "/football") {
      return (
        <FootballMatch singleMatch={listItem}></FootballMatch>
      );
    }
    else {
      return (
        <HandballMatch singleMatch={listItem}></HandballMatch>
      )
    }
  },

  render() {
    // console.log(this.props.path);
    // console.log(this.props.handballData);
    if(this.props.path === "/football" && this.props.isFootballDataRecieved) {
      return (
        <div>
          <Grid>
             <Row>
                {this.props.footballData.map(this.createList, "asdf")}
                {this.props.children}
              </Row>
          </Grid>
        </div>
      )
    } else if(this.props.path === "/handball" && this.props.isHandballDataRecieved) {
      return (
        <div>
          <Grid>
             <Row>
                {this.props.handballData.map(this.createList, "asdf")}
                {this.props.children}
              </Row>
          </Grid>
        </div>
      )
    } else {
        return(
          <div>
            <h1 className="waiting-msg">...Sæki gögn...</h1>
          </div>
        )

      }
  }
})
