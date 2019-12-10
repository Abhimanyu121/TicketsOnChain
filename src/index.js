// Imports -----------------------------
import React from 'react';
import ReactDOM from 'react-dom';
import getWeb3 from "./utils/getWeb3";

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
import {config} from './utils.js'

const NodeCache = require( "node-cache" );
const myCache = new NodeCache();
// -------------------------------------

class Main extends React.Component {
  state = { storageValue: 0, web3: null, accounts: null, contract: null };

  render(){
    return(
      <div>
      <NavExample />
      <HashRouter>
        <Route path="/new-event" component={NewEvent}/>
        <Route path="/ticket-list" component={TicketList}/>
        <Route path="/event-list" component={EventList}/>
        <Route path="/profile" component={Profile}/>
        <Route path="/edit-profile" component={EditProfile}/>
      </HashRouter>
      <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/leaflet.css" />
      </div>
    );
  }

  
}


ReactDOM.render(
  <Main />,
  document.getElementById('root')
);
