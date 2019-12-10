import React from "react";
import { Button, Card,CardTitle,CardBody,CardImg } from "shards-react";
import getContractInstance from './utils.js';
export default class CreateToken extends React.Component<{}, State> {
   
  

  
  handleInput(event) {
    const target = event.target;
    if (target.name == "name"){
      this.setState(Object.assign({}, this.state, {name: target.value}));
    }
    else if (target.name == "details") {
      this.setState(Object.assign({}, this.state, {details: target.value}));
    }
    else if (target.name == "Eth") {
      this.setState(Object.assign({}, this.state, {eth: target.value}));
    }
    else if (target.name == "Dai") {
      this.setState(Object.assign({}, this.state, {dai: target.value}));
    }
    else if (target.name == "Date") {
      this.setState(Object.assign({}, this.state, {date: target.value}));
    }
    else {
      this.setState(Object.assign({}, this.state, {name: target.value}));
    }


  }
  render(){
    return(
    <div style={{paddingLeft: "10%",paddingTop: "30px"}}>
        <Card style={{ maxWidth: "300px"}}>
      
      <CardImg src="https://indianghumakkad.files.wordpress.com/2015/02/8c.jpg?w=256&h=256&crop=1" />
      <CardBody>
        <CardTitle>Event Name</CardTitle>
        <p>Event description </p>
        <h6> Date:</h6>
        <h6> Time:</h6>
        <h6> Venue:</h6>
        <h6> Price(in Eth):</h6>
        <h6> Price(in Dai):</h6>
<center><Button>Buy Using Eth</Button></center>
<br></br>
       <center><Button>Buy Using Dai</Button></center> 
        


    
      </CardBody>

    </Card>
    </div>
    );
  }
}
