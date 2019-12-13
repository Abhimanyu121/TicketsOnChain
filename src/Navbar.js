import React from "react";
import Web3Connect from "web3connect";
import Torus from "@toruslabs/torus-embed";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3 from "web3";
import TickesOnChain from "./contracts/TicketsOnChain.json";
import {
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  
  Collapse
} from "shards-react";
import {
  HashRouter,
  NavLink
} from "react-router-dom";

import './index.css'

export default class NavExample extends React.Component {
  constructor(props) {
    super(props);
    
    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.navclick = this.navclick.bind(this);
    
    this.state = {
      superWeb3: this.props.web3,
      collapseOpen: false,
      value: 0,
      account:null
    };
  }
  

  toggleNavbar() {
    this.setState({
      ...this.state,
      ...{
        collapseOpen: !this.state.collapseOpen
      }
    });
  }
   navclick(){
     this.setState({value: Math.random()});
   }
   sendprop(){
     if(this.state.superWeb3!==undefined&&this.props.superWeb3===undefined){
        this.props.setSuperWeb3(this.state.superWeb3);
        this.props.setSuperContract(this.state.superContract);

     }
   }
   getAcc= async()=>{
     let w3 = this.superWeb3;
     w3.eth.Contract = this.superContract;
    this.state.account = await w3.eth.getAccounts()[0];
   }
  render() {
    //this.sendprop();
    let accountButton =       <Web3Connect.Button
    network="kovan" // optional
    providerOptions={{
      walletconnect: {
        package: WalletConnectProvider, // required
        options: {
          infuraId: "311ef590f7e5472a90edfa1316248cff" // required
        }
      },
      torus: {
        package: Torus, // required
        options: {
          enableLogging: false, // optional
          buttonPosition: "bottom-left", // optional
          buildEnv: "production", // optional
          showTorusButton: true, // optional
          enabledVerifiers: { // optional
            google: false // optional
          }
        }
      },
    }}
    onConnect={async (provider) => {
      const web3 = new Web3(provider);
      let acc = await web3.eth.getAccounts();
      this.state.superWeb3 = web3;
      const deployedNetwork = TickesOnChain.networks[42];
      const instance = new web3.eth.Contract(
        TickesOnChain.abi,
        deployedNetwork && deployedNetwork.address,
      );
      
      this.props.setSuperWeb3(web3);
      this.props.setSuperContract(instance);
      this.props.setSuperAccount(acc);
      console.log(acc);
      this.setState({superContract: instance, superWeb3: web3, account:acc})
    }}
    onClose={() => {
      console.log("Web3Connect Modal Closed"); // modal has closed
    }}
  />;
    let toShow = null;
    if(this.state.superWeb3==null){
      toShow= accountButton;
    }
    else{
        console.log("web3 here");
      
     console.log(this.state.account);
    toShow= this.state.account;
    }
    return (
      <div>
      <HashRouter>
      <Navbar type="dark" theme="primary" expand="md" className="navbar-class">

        <NavbarToggler onClick={this.toggleNavbar} />

        <Collapse open={this.state.collapseOpen} navbar>
          <Nav navbar>
            <NavItem>
              <NavLink onClick={this.navlink} active to="/" className="nav-link">
                
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink onClick={this.navlink} to="/event-list" className="nav-link">
              Events
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink onClick={this.navlink} to="/new-event" className="nav-link">
              Add Events
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink onClick={this.navlink} to="/ticket-list" className="nav-link">
              Tickets               </NavLink>
            </NavItem>
          </Nav>

          <Nav navbar className="ml-auto">
            <NavItem>
              <NavLink className="ml-auto">
              {toShow}
              </NavLink>
     
            </NavItem>
            <NavItem>
              <NavLink to="/profile" className="nav-link">
              Daniel
              </NavLink>

            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
      </HashRouter>
      </div>
    );
  }
}
