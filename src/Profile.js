import React from "react";
import Box from "3box";
import {
  Row,
  Col,
  Container,
  Card,
  CardBody,
  CardTitle,
  CardHeader,
  CardImg,
  ListGroup,
} from 'shards-react';
import EditProfile from '3box-profile-edit-react';
export default class Profile extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      superWeb3:this.props.web3,
      superContract:this.props.contract,
      space:null,
      account:null,
      box:null

    }
    
  }
  fetchProfile=async ()=>{
      const acc = await this.state.superWeb3.eth.getAccounts();
    console.log(this.state.superWeb3.currentProvider);
    const box = await Box.openBox(acc[0], this.state.superWeb3.currentProvider);
    await box.public.set("name","fuckingname");
    let ac= await box.public.get("name");
    console.log(ac);
    const space = await box.getSpace(acc[0], 'spacesdemo')  
    this.setState({box:box,space:space,account:acc[0]});
  }
  render() {
 
   
  
 if(this.state.superWeb3!= null && this.state.superContract !=null){
  
      return (
        <div style={{fontFamily: "Cambria, Cochin, Georgia, Times, 'Times New Roman', serif"}}>
          <Container className="main-container">
          <Row>
           
          <Col sm="12" md="12">
      <ProfileView></ProfileView>
          </Col>
          </Row>
          </Container>
        </div>
      );
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

class ProfileView extends React.Component {
  constructor(props) {
    super(props);
   
    this.state = {
      superWeb3:this.props.web3,
      superContract:this.props.contract,
    };
  }
  
  render(){
  //  if(this.state.superWeb3!= null && this.state.superContract !=null){
      if(1){
  //     const cbox = ({ customFields, box, "space", "0x2Ee331840018465bD7Fe74aA4E442b9EA407fBBE", myProfile, redirectFn }) => (
  //       <EditProfile
  //            // required
  //            box={box}
  //            space={space}
  //            currentUserAddr={myAddress}
  //            // optional
          
  //       />
  //  );
    return(
      <div>
        <Row>
          <Col sm="12" md="3">
              <CardImg width="200" src="https://c.gitcoin.co/avatars/0357f94b529985a8a898ab338add0edf/djrosenbaum.png" /> <br /> <br/>
              <h3><b>Daniel</b></h3>
              <h5><b><a href="/#/edit-profile" style={{color: "white"}}>Edit Profile</a></b></h5>
          </Col>
          <Col sm="12" md="9">
            <div>
              <Card>
                <CardHeader>Details</CardHeader>
                <CardBody>
                  <p>Total Tickets :- {"asd"}</p>
                  <p>Total Events Attended/Attending :- {"asd"}</p>
        
                  </CardBody>
                </Card>
            </div>
          </Col>
        </Row>
        <br />
        <br />
      <hr />
        <h5>Events You have Added</h5>
        <Row>
          <ListGroup>
            
          </ListGroup>
        </Row>

        <br />
          <hr />
            <h5>Your Tickets</h5>
            <Row>

             
            </Row>
        <Row>

        </Row>
      </div>
    );
    }  else {
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
