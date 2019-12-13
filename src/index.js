// Imports -----------------------------
import React from 'react';
import ReactDOM from 'react-dom';

import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css";

import {Container, Row, Col, FormInput, Button ,Card,CardHeader,CardTitle,CardBody,CardFooter } from "shards-react";
import {
  Route,
  HashRouter
} from "react-router-dom";

import './index.css';
import NavExample from './Navbar';
import NewEvent from './newevent';
import TicketList from './ticketlist';
import Profile from './Profile';
import EventList from './eventlist';
import EditProfile from './editprofile';

const NodeCache = require( "node-cache" );
const myCache = new NodeCache();
// -------------------------------------

class Main extends React.Component {
  state = { superWeb3: null, superAccount: null, superContract: null };
  callbackFunction = (web3) => {
    console.log("at CAllback");
    this.setState({superWeb3: web3})
  }
  setSuperContract =(contract)=>{
    this.setState({superContract: contract})
  }
  setSuperAccount = (acc)=>{
    this.setState({superAccount: acc})
  }
  check =async()=>{
    console.log("here");
    if(this.state.web3!==undefined){
      console.log("here");
      let acc = await this.state.superWeb3.eth.getAccounts();
      console.log(acc);
    }
  }
  render(){
    this.check();
    return (
      <div>
      <NavExample web3 ={this.state.superWeb3} contract = {this.state.superContract} setSuperAccount = {this.setSuperAccount}setSuperWeb3 = {this.callbackFunction} setSuperContract={this.setSuperContract}/>
      <HashRouter>
        <Route path="/new-event" component={NewEvent}/>
        <Route path="/ticket-list" component={TicketList}/>
        <Route path="/event-list" render = {()=><EventList web3 ={this.state.superWeb3} contract = {this.state.superContract} setSuperWeb3 = {this.callbackFunction} setSuperContract={this.setSuperContract}/>}/>
        <Route path="/profile" component={Profile}/>
        <Route path="/edit-profile" component={EditProfile}/>
      </HashRouter>
      <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/leaflet.css" />
      </div>
    );
  }

  
}

//<Route path="/event-list" component={EventList}/>
ReactDOM.render(
  <Main />,
  document.getElementById('root')
);
