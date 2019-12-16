import React from "react";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from 'react-loader-spinner'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {
  Row,
  Col,
  Container,
  Card,
  CardBody,
  CardTitle,
  CardHeader,
  CardImg,
  Button,
  ListGroup,
} from 'shards-react';

const Box = require('3box')
export default class Profile extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      superWeb3:this.props.web3,
      superContract:this.props.contract,
      space:null,
      account:null,
      box:null,
      contractProfile:null,
      boxProfile:{},
      loadState:0
    }
    
    
  }
  isEmpty=(obj) =>{
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            return false;
    }

    return true;
}

  fetchContract=async()=>{
    const{superWeb3,superContract} = this.state;
    const accounts = await superWeb3.eth.getAccounts();
    let response = await superContract.methods.UserProfile().call({from:accounts[0]});
    this.setState({contractProfile:response,loadState:this.state.loadState+1})
  }
  fetchProfile=async ()=>{
    const acc = await this.state.superWeb3.eth.getAccounts();
    console.log(this.state.superWeb3)
    let  spaceList = await Box.getSpace(acc[0],"ToC");
    //const box = await Box.openBox(acc[0], this.state.superWeb3.currentProvider)
    
    
    console.log(spaceList);
    if(this.isEmpty(spaceList)){
      console.log("flying")
      spaceList={
        name:"You need to set Profile",
        phone :"You need to set profile",
        email : "You need to se Profile"
      }
    }
    this.setState({boxProfile:spaceList,loadState:this.state.loadState+1});
  }
  render() {
 
   
  
 if(this.state.superWeb3!= null && this.state.superContract !=null){
   if(this.state.loadState >=2&&this.state.contractProfile!=null){
    return (
        
      <div style={{fontFamily: "Cambria, Cochin, Georgia, Times, 'Times New Roman', serif"}}>
        <Container className="main-container">
        <Row>
         
        <Col sm="12" md="12">
        <div>
      <Row>
        <Col sm="12" md="3">
            <CardImg width="200" src="https://c.gitcoin.co/avatars/0357f94b529985a8a898ab338add0edf/djrosenbaum.png" /> <br /> <br/>
    <h3><b>{this.state.boxProfile.name}</b></h3>
            <h5><b><Link to = {{
                  pathname: '/edit-profile',
                  aboutProps:{
                    superContract: this.state.superContract,
                    superWeb3: this.state.superWeb3
                  }
                }}><Button  pill>Edit Profile</Button></Link></b></h5>
        </Col>
        <Col sm="12" md="9">
          <div>
            <Card>
              <CardHeader>Details</CardHeader>
              <CardBody>
              <p>Phone Number :- {this.state.boxProfile.phone}</p>
              <p>Email :- {this.state.boxProfile.email}</p>
    <p>Total Tickets :- {this.state.contractProfile[1].length}</p>
                <p>Events Hosted :-  {this.state.contractProfile[0].length}</p>
      
                </CardBody>
              </Card>
          </div>
        </Col>
      </Row>
      <br />
      <br />
    
    </div>
        </Col>
        </Row>
        </Container>
      </div>
    );
   }else {
    this.fetchProfile();
    this.fetchContract();
    return (<center> <h6> Loading..: <Loader
    type="Puff"
    color="black"
    height={100}
    width={100}
    timeout={3000} //3 secs

    /></h6></center>);
   }
  
      
    }
  else{
    
      if((this.state.superWeb3==null||this.state.superContract ==null)&&(this.props.web3!=null)){
        this.state.superWeb3= this.props.web3;
        this.state.superContract=this.props.contract;
        //this.state.accounts=this.props.account;
      }
      return(<div>
        <Container className="main-container">
          <Row>
            <Col sm="12" md="12">
              <div>
        
                <Card>
                 
                  
                  <CardBody className="WEB3">
                 <center>   <CardTitle>Please Connect to Web3</CardTitle>
                    </center>
                  </CardBody>
                </Card>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
     );
 
    }
  }
}

