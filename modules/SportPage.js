import React from 'react'
import Table from './Table'

import axios from 'axios'

import FormGroup from 'react-bootstrap/lib/FormGroup'
import FormControl from 'react-bootstrap/lib/FormControl'

export default React.createClass({

  getInitialState() {
    return (this.state = {
      footballData:[],
      isFootballDataRecieved:false,
      handballData:[],
      isHandballDataRecieved:false,
      searchedHandballData:[],
      searchedFootballData:[]
    })
  },

  loadData () {
    axios.get('https://apis.is/sports/football')
    .then(function(res) {
      this.setState({
        footballData: res.data.results,
        isFootballDataRecieved: true,
        searchedFootballData: res.data.results
      })
      // console.log('res.data.results from loadData FOOTBALL : ');
      // console.log(res.data.results);
    }.bind(this))
    .catch(function (err){

      console.log(err);
    });
    axios.get('https://apis.is/sports/handball')
    .then(function(res) {
      this.setState({
        handballData: res.data.results,
        isHandballDataRecieved: true,
        searchedHandballData: res.data.results
      })
      // console.log('res.data.results from loadData HANDBALL : ');
      // console.log(res.data.results);
    }.bind(this))
    .catch(function (err){

      console.log(err);
    })

  },

  componentDidMount() {
    this.loadData();
  },

  handleKeyUp (e) {
    // console.log("KEY UP");
    e.preventDefault();
    if(this.props.location.pathname === "/football") {
      var tempSearchFootball = [];
      for(var i=0; i<this.state.footballData.length; i++) {
        var teamNames = this.state.footballData[i].homeTeam +" "+ this.state.footballData[i].awayTeam;
        if(teamNames.toLowerCase().search(e.target.value.toLowerCase())!=-1) {
          // console.log("ITS A MATCH");
          tempSearchFootball.push(this.state.footballData[i]);
        }
      }
      this.setState({
        searchedFootballData:tempSearchFootball
      });
      // console.log(this.state.searchedFootballData);
    } else if(this.props.location.pathname === "/handball") {
      var tempSearchHandball = [];
      for(var i=0; i<this.state.handballData.length; i++) {
        var teamNames = this.state.handballData[i].Teams;
        if(teamNames.toLowerCase().search(e.target.value.toLowerCase())!=-1) {
          // console.log("ITS A MATCH");
          tempSearchHandball.push(this.state.handballData[i]);
        }
      }
      this.setState({
        searchedHandballData:tempSearchHandball
      });
      // console.log(this.state.searchedHandballData);
    }
  },

  render() {

    return (
        <div className='gray-div'>
        <form>
          <FormGroup bsSize="large">
            <FormControl className="custom-input" onKeyUp={this.handleKeyUp} type="text" placeholder="...Leitaðu að liði..." />
          </FormGroup>
        </form>
          <Table
            path = {this.props.location.pathname}
            handballData={this.state.searchedHandballData}
            isHandballDataRecieved={this.state.isHandballDataRecieved}
            footballData={this.state.searchedFootballData}
            isFootballDataRecieved={this.state.isFootballDataRecieved}/>
        </div>
    )
  }
})
