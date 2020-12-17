import React from "react";
import { Container,Row, FormInput, Button,Col, Card,CardHeader,CardTitle,CardBody,FormTextarea } from "shards-react";
import { Marker, Popup } from 'react-leaflet';
import {openIDXSpace} from "./idx";

const Box = require('3box')
export default class CreateReview extends React.Component{
  
  constructor(props){
    super(props);
    if (this.props.web3===undefined){
      let path = `/profile`;
      this.props.history.push(path);
    }
    this.state = {
      superWeb3 : this.props.web3,
      superContract :this.props.contract,
      subject: '',
      email: '',
      phone: '',

    }
    this.handleInput = this.handleInput.bind(this);
  }
 

  setOpenBoxData= async()=>{
    alert("Please press okay and wait for a while");
    const acc = await this.state.superWeb3.eth.getAccounts();
    const box = await Box.openBox(acc[0], this.state.superWeb3.currentProvider)
    
    let space = await box.openSpace("ToC");
    await  space.public.setMultiple(["name","phone","email"],[this.state.subject,this.state.phone,this.state.email]);
    alert("Updated");
  }
  idx = async() =>{
    let _provider = this.state.superWeb3.currentProvider;
    console.log(_provider)
    let accounts = await this.state.superWeb3.eth.getAccounts();
    // let idx = await openIDXSpace(provider, accounts)
    //     await idx.set("basicProfile", {
    //     Name: this.state.subject,
    //     email: this.state.email,
    //     phoneNumber: this.state.phone,
    //   });
    let idx = await openIDXSpace(_provider, accounts)
        await idx.set("basicProfile", {
        Name: "Abhi",
        email: "abhi@gmail.com",
        phoneNumber: "7894561230",
      });
  }
  handleInput(event) {
    const target = event.target;
    if (target.name == "subject"){
      this.setState(Object.assign({}, this.state, {subject: target.value}));
    }
    else if (target.name == "email") {
      this.setState(Object.assign({}, this.state, {email: target.value}));
    }
    else {
      this.setState(Object.assign({}, this.state, {phone: target.value}));
    }
  
  }
  render(){
    return(
      <div style={{fontFamily: "Cambria, Cochin, Georgia, Times, 'Times New Roman', serif"}}>
        <Container className="main-container">
          <Row>
            <Col sm="12" md="12">
              <div>
                <h3>Edit Profile</h3><hr/> <br />
                <Card>
                  <CardBody>
                    <CardTitle>New Name</CardTitle>
                    <FormInput name="subject" value={this.state.subject} onChange={this.handleInput} />
                    <br />
                    
                    <CardTitle>Add Email</CardTitle>
                    <FormInput  name="email" value={this.state.email} onChange={this.handleInput} />
                    <br />
                    <CardTitle>Add Phone No.</CardTitle>
                    <FormInput type="number" name="phone" value={this.state.phone} onChange={this.handleInput} />
                    <br />
                    
                    <center><Button outline pill onMouseUp={()=>{this.idx()}}>Save Changes</Button></center>
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
