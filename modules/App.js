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
                  <Col md={12}>
                    <div className="nav-selection-container">
                      <NavItem><NavLink to="/CodingPage/start"><h1 className="custom-h2">start</h1></NavLink></NavItem>
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
