import React from "react";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from 'react-loader-spinner'
import TickesOnChain from "./contracts/TicketsOnChain.json";
import { Container,Row,Col, Card,CardHeader,CardTitle,CardBody,CardImg, Button } from "shards-react";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3 from "web3";
import Web3Connect from "web3connect";

export default class CheckIn extends React.Component{
  
  constructor(props){
    super(props);
    console.log("loca props")
    console.log(props);
    if (this.props.location.aboutProps===undefined){
      let path = `/hostedEvents`;
      this.props.history.push(path);
    }
    this.state={
      superWeb3 : this.props.location.aboutProps.superWeb3,
      superContract :this.props.location.aboutProps.superContract,
      eventId: this.props.location.aboutProps.id,
      addresses: [],
      event:null,
      fetching:true,
      zero:false
    }

    console.log(this.state.eventId);
    this.fetchEventData();
    
  }
 
  mountStuff = async ()=>{
    let {superWeb3,superContract,eventId} = this.state;
    if (this.props.location.aboutProps===undefined){
      let path = `/hostedEvents`;
       this.props.history.push(path);
    }
    try{
      superWeb3 = this.props.location.aboutProps.superWeb3;
      superContract =this.props.location.aboutProps.superContract;
      eventId= this.props.location.aboutProps.id;
      this.setState({superContract:superContract,superWeb3:superWeb3,eventId:eventId});
  
    }
    catch(e){
      console.error(e);
    }

   }
  fetchEventData = async ()=>{
    const {superWeb3,superContract,eventId} = this.state;
    let event = await superContract.methods.checkInList(eventId).call();
    console.log(event);
    let addresses=[];
    for(let i =0; i<event["attendees"].length;i++){
      if(event["attendees"][i]!="0x0000000000000000000000000000000000000000")
      addresses.push(event["attendees"][i]);
    }
    let zero =false
    if(addresses.length==0){
      zero =true;
    }
    console.log(addresses);
    console.log("zero "+zero)
    this.setState({event:event,addresses:addresses,fetching :false,zero:zero });
  }
  checkIn = async(id)=>{
   let flag =true;
    while(flag){
      try{
        let  provider = await Web3Connect.ConnectToInjected();
        console.log("injected");
        console.log(provider);
         provider = await Web3Connect.ConnectToWalletConnect(
          WalletConnectProvider,
          {
            infuraId: "311ef590f7e5472a90edfa1316248cff", // required
            bridge: "https://bridge.walletconnect.org" // optional
          }
        );
        console.log(provider);
        if(provider.wc.connected){
         await provider.close();
         provider =  new WalletConnectProvider({
          infuraId: "311ef590f7e5472a90edfa1316248cff"
         });
       
        }
        await provider.enable()
        // await provider.close();
         console.log(provider);
         
         console.log("enabled");
         console.log(provider);
         const web3 = new Web3(provider);
          let acc = await web3.eth.getAccounts();
          const deployedNetwork = TickesOnChain.networks[42];
          const instance = new web3.eth.Contract(
            TickesOnChain.abi,
            deployedNetwork && deployedNetwork.address,
          );
          console.log(acc);
         
          const  response = await instance.methods.checkIn(id).send({from: acc[0] });
          console.log(response);
          await provider.close();
          flag =false;
          }
      catch(e){
        console.error(e);
        flag = false;
      }
    }
   }
 
  
  render(){

    if(this.state.fetching){
      return(
        <center> <h6> Loading..: <Loader
          type="Puff"
          color="black"
          height={100}
          width={100}
          timeout={3000} //3 secs
  
       /></h6></center>
      );
    }
    if(this.state.zero){
      return (
       <div style={{fontFamily: "Cambria, Cochin, Georgia, Times, 'Times New Roman', serif"}}>
          
        <Container className="main-container">
        <Col>
          <Row> 
            <Col sm="12" md="12">
              <div>
                <h3>Check-In</h3><hr/> <br />
                <Card>
                  <CardBody>
                    <CardTitle>Event name: {this.state.event["name"]}</CardTitle>
                    <CardTitle>Number of tickets: {parseInt(this.state.event["_totalTickets"])}</CardTitle>
                    <CardTitle>Number of Check-In: {parseInt(this.state.event["totalCheckin"])}</CardTitle>
                    <center><Button outline pill onClick={()=>{this.checkIn(this.state.eventId)}}> Check-In</Button></center><br/><br/>
                    <center><Button outline pill onClick={()=>{this.fetchEventData()}}> Refresh</Button></center>

                  </CardBody>
                </Card>
               </div>
              </Col>
          </Row>
          <br/><br/><br/><br/>
          <br/>
          <Row>
            <Col sm="12" md="12">
              <div>
        
                <Card>
                 
                  
                  <CardBody className="WEB3">
                 <center>   <CardTitle>No Check-In Yet</CardTitle>
                    </center>
                  </CardBody>
                </Card>
              </div>
            </Col>
          </Row>
          </Col> 
       </Container>


        </div>
      );

    }
    else{
      let checkInList = this.state.addresses.map((item, index)=>
     
      <CardTitle>{item}</CardTitle>);
      return (
        <div style={{fontFamily: "Cambria, Cochin, Georgia, Times, 'Times New Roman', serif"}}>
          <Container className="main-container">
            <Col>
              <Row>
                <Col sm="12" md="12">
                  <div>
                    <h3>Check-In</h3><hr/> <br />
                    <Card>
                      <CardBody>
                        <CardTitle>Event name: {this.state.event["name"]}</CardTitle>
                        <CardTitle>Number of tickets: {parseInt(this.state.event["_totalTickets"])}</CardTitle>
                        <CardTitle>Number of Check-In: {parseInt(this.state.event["totalCheckin"])}</CardTitle>
                      <center><Button outline pill onMouseUp={()=>{this.checkIn(this.state.eventId)}} > Check-In</Button></center><br/><br/>
                      <center><Button outline pill onMouseUp={()=>{this.fetchEventData()}}> Refresh</Button></center>
                      </CardBody>
                    </Card>
                </div>
              </Col>
            </Row>
            <br/><br/><br/><br/>
            <Card style={{marginTop: "30px"}}>
              <CardHeader>Check-In</CardHeader>
                <CardBody className="Ticket">
                {checkInList}
              </CardBody>
            </Card>
          </Col>
          </Container>
        </div>
      );

    
    } 
  }
    
}
