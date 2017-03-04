import React from 'react'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'
import Thumbnail from 'react-bootstrap/lib/Thumbnail'
import Button from 'react-bootstrap/lib/Button'

export default React.createClass({

  splitTeamsString (teamString) {
    var teamsArray = teamString.split(" - ");
    return (teamsArray);
  },

  render() {
    return (
      <div>
        <div>
         <Col xs={12} md={6}>
           <Thumbnail className="custom-thumbnail">
            <Row>
              <Col md={6} xs={12}>
              <div>
              <h3>{this.splitTeamsString(this.props.singleMatch.Teams)[0]}</h3>
              </div>
              </Col>
              <Col md={6} xs={12}>
              <div>
              <h3>{this.splitTeamsString(this.props.singleMatch.Teams)[1]}</h3>
              </div>
              </Col>
            </Row>
             <p><i className="fa fa-map-marker"></i>{this.props.singleMatch.Venue}</p>
             <p><i className="fa fa-calendar"></i>{this.props.singleMatch.Date}<i className="fa fa-clock-o"></i>{this.props.singleMatch.Time}</p>
           </Thumbnail>
         </Col>
        </div>
        {this.props.children}
      </div>
    )
  }
})
