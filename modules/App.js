import React from 'react'
import NavLink from './NavLink'
import Nav from 'react-bootstrap/lib/Nav'
import NavItem from 'react-bootstrap/lib/NavItem'

import Grid from 'react-bootstrap/lib/Grid'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'

export default React.createClass({

  render() {
      return (
        <div>
          <div className='header-div'>
            <Nav bsStyle="pills" role="nav">
              <Grid>
                <Row>
                  <Col md={6}>
                    <div className="nav-selection-container">
                      <NavItem><NavLink to="/football"><h2 className="custom-h2">Fótbolti</h2></NavLink></NavItem>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="nav-selection-container">
                      <NavItem><NavLink to="/handball"><h2 className="custom-h2">Handbolti</h2></NavLink></NavItem>
                    </div>
                  </Col>
                </Row>
              </Grid>
            </Nav>
          </div>
          {this.props.children /*|| <Home/>*/}
        </div>
      )

  }
})
