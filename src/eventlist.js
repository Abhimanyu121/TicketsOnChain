import React from "react";
import { Button, Card,CardTitle,CardBody,CardImg } from "shards-react";
import Popup from "reactjs-popup";
import Web3Connect from "web3connect";
import Torus from "@toruslabs/torus-embed";
import WalletConnectProvider from "@walletconnect/web3-provider";
import TickesOnChain from "./contracts/TicketsOnChain.json";
import Web3 from "web3";
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



export default class CreateToken extends React.Component{
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.runExample = this.fetchEvent.bind(this);
    this.state = {
      contract : null,
      web3: null,
      eventList :[],
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
    
    const {contract } = this.state;
    let count = await contract.methods.eventCount().call();
    console.log("here");
    console.log(count);
    let responses = [];
    for(let i=0;i<count;i++){
      let response = await contract.methods.eventMapping(i).call();
      //console.log(JSON.parse(response[3]).image);
      console.log(response);
      responses.push(response);
    }

    this.setState({eventList:responses});
  }
   
  componentDidMount = async () => {
    //const provider = await Web3Connect.ConnectToInjected();
      // Get network provider and web3 instance.
      const _web3 = new  Web3(new Web3.providers.WebsocketProvider("wss://kovan.infura.io/ws"));
      const networkId = await _web3.eth.net.getId();
      const deployedNetwork = TickesOnChain.networks[networkId];
      console.log(deployedNetwork.address);
      const instance = new _web3.eth.Contract(
        TickesOnChain.abi,
        deployedNetwork && deployedNetwork.address,
      );
      let _superWeb3= this.props.web3;
      let _superContract=this.props.contract;
      let _superAccount= this.props.superAccount;
    this.setState({ web3:_web3, contract: instance,superAccount:_superAccount,superWeb3: _superWeb3, superContract:_superContract});
    this.fetchEvent();
  };

  

  
  buyWithEth = async (_value, id) =>{
    const {superContract,superWeb3} = this.state;
    console.log(id);
    console.log("web3 not  available");
    if(this.state.superWeb3!= null){
      console.log("web3 available");
     const superAccount = await superWeb3.eth.getAccounts();
  // console.log(superAccount[0]);
      //console.log(this.state.superWeb3.utils.toChecksumAddress(this.state.superAccount[0]));
       let response = await superContract.methods.buyTicketsEth(id).send({from: superAccount[0], value: _value})
    }
  
  }
  render(){
    let popup = <div>Transction in process</div>
    const conRequest = <p>Please Connect your web3 Wallet above</p>
    let toShow = null;
    if(this.state.superWeb3===undefined){
     toShow = conRequest;
    }
    else {
      toShow = popup;
    }
    if(this.state.eventList.length==0){
      return(<center> <h6> Loading..: <Loader
        type="Puff"
        color="#00BFFF"
        height={100}
        width={100}
        timeout={3000} //3 secs

     /></h6></center>);
    }
    else {
      const listItems = this.state.eventList.map((item , index) =>
    
    <div style={{paddingLeft: "3%",paddingRight:"3%", paddingTop: "3%"}}>
      
    <Card >
      <script>console.log(item);</script>
        <container><Row><Col>
     <CardImg src={JSON.parse(item[3]).image} style = {{maxHeight:"300px"}}/>
      </Col>
      <Col>
      <CardBody style={{marginBottom: "10px"}}>

        <CardTitle>{item[4]}</CardTitle>
        <p>{item[9]}</p>
        <Row>
          <Col>
        <h6> Date:</h6> </Col>
        <Col><h6> Time:</h6></Col>
       
        </Row>
        <h6> Venue:</h6>
       <Row>
         <Col>
        <h6> {"Pirce(in ETH):  "+item[0]+" ETH"}</h6></Col><Col>
        <h6> {"Price(in Dai):  "+item[1]+" DAI"}</h6>
        </Col>
        </Row>
        <br />
        <Row>
          <Col>
    <Button value="yes"  onClick={()=>{this.buyWithEth(item[0],item[10])}}style ={{background :"#007bff",height:"30px", width:"200px", color :"#fff", border: "#007bff",radius:"25px"}}>Buy With ETH</Button>
    </Col>
    <Col>
    <Button onClick = {this.buyWithEth(item[0],item[10])}style ={{background :"#007bff",height:"30px", width:"200px", color :"#fff", border: "#007bff",radius:"25px"}}> Buy Using DAI</Button>
    </Col>
    </Row>



      </CardBody>
      </Col></Row></container>
    </Card>
    
    </div>
    );
      return(
        <Row>
        <ListGroup>
      {listItems}
        </ListGroup>
      </Row>
      );
    }

  }
}
