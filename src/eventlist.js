import React from "react";
import { Button, Card,CardTitle,CardBody,CardImg } from "shards-react";
import Popup from "reactjs-popup";
import Web3Connect from "web3connect";
import Torus from "@toruslabs/torus-embed";
import WalletConnectProvider from "@walletconnect/web3-provider";
import TickesOnChain from "./contracts/TicketsOnChain.json";
import Web3 from "web3";
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
      posts : [],
      contract : null,
      accounts: this.props.superAccount,
      web3: null,
      eventList :[],
      superWeb3: this.props.web3,
      superContract:this.props.contract

    };
    
    console.log(this.props._web3);
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }
  fetchEvent = async ()  => {
    if(this.state.superWeb3!= undefined){
      this.state.accounts = await this.state.superWeb3.eth.getAccounts();
    }
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
    this.setState({ web3:_web3, contract: instance});
    this.fetchEvent();
  };

  

  
  buyWithEth = async (_value, id) =>{
    const {superContract,superWeb3,} = this.state;
    console.log(id);
    console.log("web3 not  available");
    if(this.state.superWeb3!= null){
      console.log("web3 available");
      const accounts = superWeb3.eth.getAccounts();
      //let response = await superContract.methods.buyTicketsEth(id).send({from: accounts[0], value: _value})
    }
  }
  render(){
    let popup = <div>Transction in process</div>
    // let w3c = <div><p>Please Connect Using a Wallet<br/><br/></p><Web3Connect.Button
    //   network="kovan" // optional
    //   providerOptions={{
    //     walletconnect: {
    //       package: WalletConnectProvider, // required
    //       options: {
    //         infuraId: "311ef590f7e5472a90edfa1316248cff" // required
    //       }
    //     },
    //     torus: {
    //       package: Torus, // required
    //       options: {
    //         enableLogging: false, // optional
    //         buttonPosition: "bottom-left", // optional
    //         buildEnv: "production", // optional
    //         showTorusButton: true, // optional
    //         enabledVerifiers: { // optional
    //           google: false // optional
    //         }
    //       }
    //     },
    //   }}
    //   onConnect={(provider) => {
    //     const web3 = new Web3(provider);
    //     this.props.parentCallback(web3);
    //     this.state.superWeb3 = web3;
    //     const deployedNetwork = TickesOnChain.networks[42];
    //     const instance = new web3.eth.contract(
    //       TickesOnChain.abi,
    //       deployedNetwork && deployedNetwork.address,
    //     );
    //   }}
    //   onClose={() => {
    //     console.log("Web3Connect Modal Closed"); // modal has closed
    //   }}
    // /></div>;
    const conRequest = <p>Please Connect your web3 Wallet above</p>
    let toShow = null;
    if(this.state.superWeb3===undefined){
     toShow = conRequest;
    }
    else {
      toShow = popup;
    }
    if(this.state.eventList.length==0){
      return(<h6> Loading..:</h6>);
    }
    else {
      const listItems = this.state.eventList.map((item , index) =>
      ////JSON.parse(item[3]).image
    <div style={{paddingLeft: "10%",paddingTop: "30px"}}>
    <Card style={{ maxWidth: "400px"}}>
      <script>console.log(item);</script>
      <CardImg src="https://storage.googleapis.com/opensea-prod.appspot.com/creature/50.png" style = {{maxHeight:"300px"}}/>
      <CardBody>
        <CardTitle>{item[4]}</CardTitle>
        <p>{item[9]}</p>
        <h6> Date:</h6>
        <h6> Time:</h6>
        <h6> Venue:</h6>
        <h6> {"Pirce(in ETH):  "+item[0]+" ETH"}</h6>
        <h6> {"Price(in Dai):  "+item[1]+" DAI"}</h6>
    <center><Button onClick={this.buyWithEth}>Buy With ETH</Button>
    </center>
    <br></br>
    <center><Popup trigger={<button onClick = {this.buyWithEth(item[0],item[12])}style ={{background :"#007bff",height:"30ox", width:"200px", color :"#fff", border: "#007bff",radius:"25px"}}> Buy Using DAI</button>}>
    <div>{toShow}</div>
    </Popup>
    </center>
    



      </CardBody>

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
