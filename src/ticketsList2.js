import React from "react";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from 'react-loader-spinner'
//import WalletConnect from "@walletconnect/browser";
//import WalletConnectQRCodeModal from "@walletconnect/qrcode-modal";
import TickesOnChain from "./contracts/TicketsOnChain.json";
import Web3Connect from "web3connect";
import Web3 from "web3";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { Container,Row,Col, Card,CardHeader,CardTitle,CardBody} from "shards-react";
export default class ticketsList extends React.Component{
  constructor(props){
    super(props);
    this.state ={
      events:[],
      flag:false,
      zero:false,
      web3: null,
      instance:null,
      accounts: this.props.account,
      superWeb3: this.props.web3,
      superContract:this.props.contract,
      
    }
    //this.state.walletConnector.killSession();
  }
  checkIn = async(id)=>{
   
     let provider = await Web3Connect.ConnectToWalletConnect(
      WalletConnectProvider,
      {
        infuraId: "311ef590f7e5472a90edfa1316248cff", // required
        bridge: "https://bridge.walletconnect.org" // optional
      }
    );
    console.log(provider);
    await provider.close();
    console.log(provider);
      provider =  new WalletConnectProvider(  {
        host: `https://data-seed-prebsc-1-s1.binance.org:8545`,
      }
    );
   
    await provider.enable()
    const web3 = new Web3(provider);
      let acc = await web3.eth.getAccounts();
      const deployedNetwork = TickesOnChain.networks[97];
      const instance = new web3.eth.Contract(
        TickesOnChain.abi,
        deployedNetwork && deployedNetwork.address,
      );
      console.log(acc);
     
      const  response = await instance.methods.checkIn(id).send({from: acc[0] });
      console.log(response);
      await provider.close();
      return true;
    
  }
  
  

  fetchHostedNetwork = async ()=>{
   
    const {superWeb3,superContract} = this.state;
    console.log("tickets");
    //console.log(superContract);
    let _events =[];
    const accounts = await superWeb3.eth.getAccounts();
    let response = await superContract.methods.UserProfile().call({from:accounts[0]});
    console.log("asdsad");
    console.log(response[2].length);
    if(response==null){
      this.setState({zero:true});
    }
    else if(response[1].length==0){
      this.setState({zero:true});
    }

    console.log(response);

    for(let i =0; i<response[1].length;i++){
      let event = await superContract.methods.eventMapping(response[1][i]).call();
      _events.push(event);
    }
    console.log(_events);
    this.setState({events:_events,flag:true});
  }
  render(){
  
    
    if(this.state.superWeb3!= null && this.state.superContract !=null){
      
      if(!this.state.flag)
        {
          this.fetchHostedNetwork();
          
        }
        let listHost;
        if(!this.state.flag){
          listHost = <center> <h6> Loading..: <Loader
          type="Puff"
          color="black"
          height={100}
          width={100}
          timeout={3000} //3 secs
  
       /></h6></center>;
        }
        else if(this.state.zero){
          listHost =  <Container className="main-container" style={{fontFamily: "Cambria, Cochin, Georgia, Times, 'Times New Roman', serif"}}>
          <Row>
            <Col sm="12" md="12">
              <div>
        
                <Card>
                 
                  
                  <CardBody className="WEB3">
                 <center>   <CardTitle>You dont have any Tickets</CardTitle>
                    </center>
                  </CardBody>
                </Card>
              </div>
            </Col>
          </Row>
        </Container>;
        }
        else {
          listHost = this.state.events.map((item, index)=>
              <Card style={{marginTop: "30px"}}>
              <CardHeader>Event</CardHeader>
              <CardBody className="Ticket">
                <CardTitle>{item[4]}</CardTitle>
                <CardTitle>{item[9]}</CardTitle>

              </CardBody>
            </Card>
        );
        }
       
        
      return(
        <div>
          <Container className="main-container">
            <Row>
              <Col sm="12" md="12">
                <div>
                  <h3>Your Tickets</h3><hr/> <br />
                  {listHost}
                </div>
              </Col>
            </Row>
          </Container>
          <Container className="main-container">
            
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