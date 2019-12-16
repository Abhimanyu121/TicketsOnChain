
import React from 'react';
import ReactDOM from 'react-dom';

import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css";
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import {
  Route,
  HashRouter
} from "react-router-dom";

import './index.css';
import NavExample from './Navbar';
import NewEvent from './newevent';
import HostedEvents from './ticketlist';
import Profile from './Profile';
import EventList from './eventlist';
import EditProfile from './editprofile';
import CheckIn from './checkin';
import Tickets from './ticketsList2';
import Sales from './sales';
import UserProfile from './UserProfile';
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
      <NavExample web3 ={this.state.superWeb3} contract = {this.state.superContract} setSuperAccount = {this.setSuperAccount} setSuperWeb3 = {this.callbackFunction} setSuperContract={this.setSuperContract}/>
      <HashRouter>
        <Route exact path="/" render = {()=><EventList web3 ={this.state.superWeb3} account={this.state.superAccount} contract = {this.state.superContract} setSuperWeb3 = {this.callbackFunction} setSuperContract={this.setSuperContract}/>}/>
        <Route path="/new-event" render = {()=><NewEvent web3 ={this.state.superWeb3} account={this.state.superAccount} contract = {this.state.superContract} setSuperWeb3 = {this.callbackFunction} setSuperContract={this.setSuperContract}/>}/>
        <Route path="/hostedEvents" render = {()=><HostedEvents web3 ={this.state.superWeb3} account={this.state.superAccount} contract = {this.state.superContract} setSuperWeb3 = {this.callbackFunction} setSuperContract={this.setSuperContract}/>}/>
        <Route path="/event-list" render = {()=><EventList web3 ={this.state.superWeb3} account={this.state.superAccount} contract = {this.state.superContract} setSuperWeb3 = {this.callbackFunction} setSuperContract={this.setSuperContract}/>}/>
        <Route path="/profile" render = {()=><Profile web3 ={this.state.superWeb3} account={this.state.superAccount} contract = {this.state.superContract} setSuperWeb3 = {this.callbackFunction} setSuperContract={this.setSuperContract}/>}/>
        <Route path="/ticket-list" render = {()=><Tickets web3 ={this.state.superWeb3} account={this.state.superAccount} contract = {this.state.superContract} setSuperWeb3 = {this.callbackFunction} setSuperContract={this.setSuperContract}/>}/>
        <Route path="/edit-profile" render = {()=><EditProfile web3 ={this.state.superWeb3} account={this.state.superAccount} contract = {this.state.superContract} setSuperWeb3 = {this.callbackFunction} setSuperContract={this.setSuperContract}/>}/>
        <Route path="/check-in" component={CheckIn}/>}/>
        <Route path="/sales" component={Sales}/>}/>
        <Route path="/UserProfile" component={UserProfile}/>}/>
      </HashRouter> 
      <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/leaflet.css" />
      </div>
    );
  }

  
}

//<Route path="/event-list" component={EventList}/>
ReactDOM.render(
  <AlertProvider template={AlertTemplate}>
    <Main />
   </AlertProvider>,
  
  document.getElementById('root')
);
