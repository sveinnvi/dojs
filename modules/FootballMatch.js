import React from 'react'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'
import Thumbnail from 'react-bootstrap/lib/Thumbnail'
import Button from 'react-bootstrap/lib/Button'

export default React.createClass({

  render() {
    return (
      <div>
        <div>
         <Col xs={12} md={6}>
           <Thumbnail className="custom-thumbnail">
            <Row>
              <Col md={6} xs={12}>
              <div>
              <h3>{this.props.singleMatch.homeTeam}</h3>
              </div>
              </Col>
              <Col md={6} xs={12}>
              <div>
              <h3>{this.props.singleMatch.awayTeam}</h3>
              </div>
              </Col>
            </Row>
             <p><i className="fa fa-map-marker"></i>{this.props.singleMatch.location}</p>
             <p><i className="fa fa-calendar"></i>{this.props.singleMatch.date}<i className="fa fa-clock-o"></i>{this.props.singleMatch.time}</p>
           </Thumbnail>
         </Col>
        </div>
        {this.props.children}
      </div>
    )
  }
})
