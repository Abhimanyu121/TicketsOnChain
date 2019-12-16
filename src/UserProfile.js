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
    console.log(props);
    this.state ={
      superWeb3:this.props.location.aboutProps.superWeb3,
      superContract:this.props.location.aboutProps.superContract,
      account: this.props.location.aboutProps.account,
      space:null,
      box:null,
      contractProfile:null,
      boxProfile:{},
      load:false
    }
    this.fetchContract();
    
  }
  isEmpty=(obj) =>{
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            return false;
    }

    return true;
}

  fetchContract=async()=>{
    const{account,superContract} = this.state;
    //const accounts = await superWeb3.eth.getAccounts();
    let response = await superContract.methods.UserProfile().call({from:account});
    console.log(this.state.superWeb3)
    let  spaceList = await Box.getSpace(this.state.account,"ToC");
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
    console.log(this.state.account);
    this.setState({boxProfile:spaceList,contractProfile:response,load:true})
  }
  fetchProfile=async ()=>{
    //const acc = await this.state.superWeb3.eth.getAccounts();
    console.log(this.state.superWeb3)
    let  spaceList = await Box.getSpace(this.state.account,"ToC");
    //const box = await Box.openBox(acc[0], this.state.superWeb3.currentProvider)
    
    
    console.log(spaceList);
    if(this.isEmpty(spaceList)){
      console.log("flying")
      spaceList={
        name:"User did not set this",
        phone :"User did not set this",
        email : "User did not set this"
      }
    }
    console.log(this.state.account);
    this.setState({boxProfile:spaceList,loadState2:this.state.loadState2+1});
  }
  render() {
 
   
  
 if(this.state.superWeb3!= null && this.state.superContract !=null){
   if(this.state.load){
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
                <Link to = {{
                  pathname: this.props.location.aboutProps.path,
                  aboutProps:{
                    id: this.props.location.aboutProps.id,
                    superContract: this.state.superContract,
                    superWeb3: this.state.superWeb3
                  }
                }}>
                <Button outline pill  >Go Back</Button>
                </Link>
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
    
    //this.fetchContract();
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

