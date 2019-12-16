import React from "react";
import { Button, Card,CardTitle,CardBody,CardImg } from "shards-react";
import Popup from "reactjs-popup";
import Web3Connect from "web3connect";
import Torus from "@toruslabs/torus-embed";
import WalletConnectProvider from "@walletconnect/web3-provider";
import TickesOnChain from "./contracts/TicketsOnChain.json";
import Web3 from "web3";
import { useAlert } from 'react-alert'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from 'react-loader-spinner'
import {
  Row,
  Col,
  Container,
  FormInput,
  Collapse,
  CardFooter,
  CardHeader,
  ListGroup,
  ListGroupItem,
} from 'shards-react';
import { isWhiteSpaceLike } from "typescript";



export default class CreateToken extends React.Component{
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.runExample = this.fetchEvent.bind(this);
    this.state = {
      contract : null,
      web3: null,
      eventList :[],
      disabledEvents:[],
      superWeb3: this.props.web3,
      superContract:this.props.contract,
      superAccount: this.props.account,

    };
    
    console.log(this.props._web3);
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }
  fetchEvent = async ()  => {
    let disabled=[];
    let responses = [];
    const {contract,superContract } = this.state;
    if(superContract != null && superContract!==undefined){
      let count = await superContract.methods.eventCount().call();
      console.log("here");
      console.log(count);
      
      for(let i=0;i<count;i++){
        let response = await superContract.methods.eventMapping(i).call();
        //console.log(JSON.parse(response[3]).image);
        if(response[5]){
          console.log(response);
          responses.push(response);
        }else{
          disabled.push(response);
        }
      }
    }
    else{
      let count = await contract.methods.eventCount().call();
    console.log("here");
    console.log(count);
    for(let i=0;i<count;i++){
      let response = await contract.methods.eventMapping(i).call();
      //console.log(JSON.parse(response[3]).image);
      if(response[5]){
        console.log(response);
        responses.push(response);
      }else{
        disabled.push(response);
      }
      
    }
    }
    

    this.setState({eventList:responses,disabledEvents:disabled});
  }
   
  componentDidMount = async () => {
    // const s3 = this.props.superWeb3;
    // const sC  = this.props.superContract;
    // this.setState({superWeb3:s3, superContract:sC});
    //const provider = await Web3Connect.ConnectToInjected();
      // Get network provider and web3 instance.
      const{superWeb3,superContract} = this.state;
      if(this.state.superWeb3== null && this.state.superContract ==null){
        const _web3 = new  Web3(new Web3.providers.WebsocketProvider("wss://kovan.infura.io/ws"));
        const networkId = await _web3.eth.net.getId();
        const deployedNetwork = TickesOnChain.networks[networkId];
        console.log(deployedNetwork.address);
        const instance = new _web3.eth.Contract(
          TickesOnChain.abi,
          deployedNetwork && deployedNetwork.address,
        );
        // let _superWeb3= this.props.web3;
        // let _superContract=this.props.contract;
        // let _superAccount= this.props.superAccount;
      this.setState({ web3:_web3, contract: instance});
      }
     
    this.fetchEvent();
  };

  

  
  buyWithEth = async (_value, id,) =>{
    const {contract,web3} = this.props;
    console.log(id);
    console.log("web3 not  available");
    if(this.state.superWeb3!= null){
      console.log("web3 available");
     const superAccount = await web3.eth.getAccounts();
       let response = await contract.methods.buyTicketsEth(id).send({from: superAccount[0], value: _value})
       alert("Done\n"+response);
    }
  
  }
  buyWithDai = async ( id) =>{
    const {superContract,superWeb3} = this.state;
    console.log(id);
    console.log("web3 not  available");
    if(this.state.superWeb3!= null){
      console.log("web3 available");
     const superAccount = await superWeb3.eth.getAccounts();
  // console.log(superAccount[0]);
      //console.log(this.state.superWeb3.utils.toChecksumAddress(this.state.superAccount[0]));
       let response = await superContract.methods.buyTicketsDAi(id).send({from: superAccount[0]})
    }
  
  }
  render(){
    if(this.state.superWeb3==null||this.state.superContract ==null){
      this.state.superWeb3= this.props.web3;
      this.state.superContract=this.props.contract;
      this.state.accounts=this.props.account;
    }
    
    if(this.state.eventList.length==0){
      return(<center> <h6> Loading..: <Loader
        type="Puff"
        color="black"
        height={100}
        width={100}
        timeout={3000} //3 secs

     /></h6></center>);
    }
    else if(this.state.superWeb3== null && this.state.superContract ==null){
      const disabledItems = this.state.disabledEvents.map((item , index) =>
     
<div style={{paddingLeft: "16%",paddingRight:"16%", paddingTop: "3%", fontFamily: "Cambria, Cochin, Georgia, Times, 'Times New Roman', serif"
  }}>
   <Card style={{maxHeight:"330px"}}>
    <CardHeader>Event</CardHeader>
      <script>console.log(item);</script>
        <container><Row><Col>
    <CardImg src={JSON.parse(item[3]).image} style = {{maxHeight:"230px",marginLeft:"20%"}}/>
    </Col>
    <Col>
    <CardBody style={{marginBottom: "10px"}}>
    <CardTitle>{item[4]}</CardTitle>
    <p>{item[9]}</p>
    <h6> {"Price(in ETH):  "+this.state.web3.utils.fromWei(item[0].toString())+" ETH"}</h6>
    <h6> {"Price(in Dai):  "+this.state.web3.utils.fromWei(item[1].toString())+" DAI"}</h6>
    </CardBody>
    </Col></Row></container>
   </Card>
</div>
    );
      
    

const listItems = this.state.eventList.map((item , index) =>
<div style={{paddingLeft: "16%",paddingRight:"16%", paddingTop: "3%", fontFamily: "Cambria, Cochin, Georgia, Times, 'Times New Roman', serif"
  }}>
  <Card style={{maxHeight:"350px"}}>
  <CardHeader>Event</CardHeader>
  <script>console.log(item);</script>
  <container><Row><Col>
  <CardImg src={JSON.parse(item[3]).image} style = {{maxHeight:"230px",marginLeft:"20%"}}/>
  </Col>
  <Col>
  <CardBody style={{marginBottom: "10px"}}>
  <CardTitle>{item[4]}</CardTitle>
  <p>{item[9]}</p>
  <h6> {"Price(in ETH):  "+this.state.web3.utils.fromWei(item[0].toString())+" ETH"}</h6>
  <h6> {"Price(in Dai):  "+this.state.web3.utils.fromWei(item[1].toString())+" DAI"}</h6>
  <Row>
  <Col>
  <CardTitle>You need to connect to web3 to buy tickets</CardTitle>
  </Col>
  </Row>
  </CardBody>
  </Col></Row></container>
  </Card>
</div>
    );
    
return(
    <div>
    <br />
    <center><h3>Active Events</h3></center> 
    <ListGroup>
      {listItems}
    </ListGroup>
   <br />
   <br />
    <center><h3>Disabled Events</h3></center> 
    <ListGroup>
     {disabledItems}
    </ListGroup>
   
    </div>
  );
    }
    else {
    const disabledItems = this.state.disabledEvents.map((item , index) =>
  <div style={{paddingLeft: "16%",paddingRight:"16%", paddingTop: "3%", fontFamily: "Cambria, Cochin, Georgia, Times, 'Times New Roman', serif"
  }}>
  <Card style={{maxHeight:"310px"}}>
  <CardHeader>Event</CardHeader>
  <script>console.log(item);</script>
  <container><Row><Col>
  <CardImg src={JSON.parse(item[3]).image} style = {{maxHeight:"230px",marginLeft:"20%"}}/>
  </Col>
  <Col>
  <CardBody style={{marginBottom: "10px"}}>
  <CardTitle>{item[4]}</CardTitle>
  <p>{item[9]}</p>
  <Row>
  <Col>
  <h6> {"Price(in ETH):  "+this.state.web3.utils.fromWei(item[0].toString())+" ETH"}</h6></Col>
  <Col>
  <h6> {"Price(in Dai):  "+this.state.web3.utils.fromWei(item[1].toString())+" DAI"}</h6>
  </Col>
  </Row>
  </CardBody>
  </Col></Row></container>
  </Card>
  </div>
  );
    
  const listItems = this.state.eventList.map((item , index) =>
  <div style={{paddingLeft: "16%",paddingRight:"16%", paddingTop: "3%", fontFamily: "Cambria, Cochin, Georgia, Times, 'Times New Roman', serif"
  }}>
  <Card style={{maxHeight:"310px"}}>
  <CardHeader>Event</CardHeader>
  <script>console.log(item);</script>
  <container><Row><Col>
  <CardImg src={JSON.parse(item[3]).image} style = {{maxHeight:"230px",marginLeft:"20%"}}/>
  </Col>
  <Col>
  <CardBody style={{marginBottom: "10px"}}>
  <CardTitle>{item[4]}</CardTitle>
  <p>{item[9]}</p>
  <h6> {"Price(in ETH):  "+ this.state.web3.utils.fromWei(item[0].toString())+" ETH"}</h6>
  <h6> {"Price(in Dai):  "+this.state.web3.utils.fromWei(item[1].toString())+" DAI"}</h6>
  <Row>
  <Col>
  <Button outline pill value="yes"  onMouseUp={()=>{
      if((this.state.superWeb3==null||this.state.superContract ==null)&&(this.props.web3==null)){
        //const alert = useAlert()
        //alert.show("Please connect to web3");
        alert("Please connect to web3");
        console.log("please connect to web3")
      }
      else if(this.state.superWeb3!=null||this.state.superContract !=null){
        this.buyWithEth(item[0],item[10])}
      }}> Buy With ETH</Button>   
  </Col>
  <Col>
    <Button outline pill onMouseUp = {()=>{
      if((this.state.superWeb3==null||this.state.superContract ==null)&&(this.props.web3==null)){
        //const alert = useAlert()
        //alert.show("Please connect to web3");
        alert("Please connect to web3");
        console.log("please connect to web3")
      }
      else if(this.state.superWeb3!=null||this.state.superContract !=null){
        this.buyWithDai(item[10])}
      }}> Buy With DAI</Button>
 </Col>
 </Row>
   </CardBody>
   </Col></Row></container>
   </Card>
   </div>
  );
    
  return(
   <div>
  
    <br />
    <center><h3>Active Events</h3></center>
    <ListGroup>{listItems}</ListGroup>
    <br />
    <br />
    <center><h3>Disabled Events</h3></center>
    <ListGroup>{disabledItems} </ListGroup>
   </div>
      
      );
    }

  }
}
