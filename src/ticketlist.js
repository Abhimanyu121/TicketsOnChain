import React from "react";
import { Container,Row,Col, Card,CardHeader,CardTitle,CardBody,CardImg } from "shards-react";
export default class CreateToken extends React.Component{
  constructor(props){
    super(props);
    this.state ={
      events:[],
      flag:false,
      accounts: this.props.account,
      superWeb3: this.props.web3,
      superContract:this.props.contract
    }
  }
  fetchHostedNetwork = async ()=>{
   
    const {superWeb3,superContract} = this.state;
    console.log("tickets");
    //console.log(superContract);
    let _events =[];
    const accounts = await superWeb3.eth.getAccounts();
    let response = await superContract.methods.UserProfile().call({from:accounts[0]});
    console.log(response[0].length);
    for(let i =0; i<response[0].length;i++){
      let event = await superContract.methods.eventMapping(response[0][i]).call();
      _events.push(event);
    }
    console.log(_events);
    this.setState({events:_events,flag:true});
  }
  render(){
  
    
    if(this.state.superWeb3!= null && this.state.superContract !=null){
      if(!this.state.flag)
        {this.fetchHostedNetwork();}
      return(
        <div>
          <Container className="main-container">
            <Row>
              <Col sm="12" md="12">
                <div>
                  <h3>Events you are hosting</h3><hr/> <br />
                  <Card>
                    <CardHeader>Ticket</CardHeader>
                    <CardBody className="Ticket">
                      <CardTitle>Place:</CardTitle>
                      <CardTitle>Date:</CardTitle>
                      <CardTitle>Purchased in:</CardTitle>
                    </CardBody>
                  </Card>
                </div>
              </Col>
            </Row>
          </Container>
          <Container className="main-container">
            <Row>
              <Col sm="12" md="12">
                <div>
                  <h3>Your Tickets</h3><hr/> <br />
                  <Card>
                    <CardHeader>Ticket</CardHeader>
                    <CardBody className="Ticket">
                      <CardTitle>Place:</CardTitle>
                      <CardTitle>Date:</CardTitle>
                      <CardTitle>Purchased in:</CardTitle>
                    </CardBody>
                  </Card>
                </div>
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
        this.state.accounts=this.props.account;
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