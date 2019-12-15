import React from "react";
import { Container,Row, FormInput, Button,Col, Card,CardHeader,CardTitle,CardBody,FormTextarea } from "shards-react";
import { Marker, Popup } from 'react-leaflet';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from 'react-loader-spinner'
var ipfsClient = require('ipfs-http-client');

export default class CreateReview extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      name: '',
      description: '',
      dai: '',
      eth: '',
      date: '',
      place: '',
      seats: '',
      web3: null,
      contract: null,
      added_file_hash: null,
      accounts: this.props.account,
      superWeb3: this.props.web3,
      superContract:this.props.contract
    }
    this.handleInput = this.handleInput.bind(this);
    this.captureFile = this.captureFile.bind(this);

  };
    

  captureFile (event) {
    event.stopPropagation()
    event.preventDefault()
    this.setState({added_file_hash: event.target.files});
  }

  handleInput(event) {
    const target = event.target;
    if (target.name == "Name"){
      this.setState(Object.assign({}, this.state, {name: target.value}));
    }
    else if (target.name == "description") {
      this.setState(Object.assign({}, this.state, {description: target.value}));
    }
    else if (target.name == "Place"){
      this.setState(Object.assign({}, this.state, {place: target.value}));
    }
    else if (target.name == "Date") {
      this.setState(Object.assign({}, this.state, {date: target.value}));
    }
    else if (target.name == "Eth") {
      this.setState(Object.assign({}, this.state, {eth: target.value}));
    }
    else if (target.name == "Dai") {
      this.setState(Object.assign({}, this.state, {dai: target.value}));
    }
    else if (target.name == "Seats") {
      this.setState(Object.assign({}, this.state, {seats: target.value}));
    }
    else {
      this.setState(Object.assign({}, this.state, {name: target.value}));
    }
  }
  
  createEvent = async ()=>{
    
    const {superContract, name, description, dai,eth, date, place,seats } = this.state;
    var ipfs = ipfsClient('ipfs.infura.io', '5001', { protocol: 'https' });
    let ipfsId;
    
    ipfs.add([...this.state.added_file_hash], { progress: (prog) => console.log(`received: ${prog}`) })
      .then((response) => {
        console.log(response);
        ipfsId = response[0].hash;
        console.log(ipfsId);
        ( async () => {
            const {  contract ,superWeb3} = this.state;
            let content = JSON.stringify(
              {
                "description": "This is an Event Token.",
                "image": "https://ipfs.io/ipfs/" + ipfsId,
                "name": this.state.name,
              }
            );
            const accounts = await superWeb3.eth.getAccounts();
            let desc = description +"\n\tDate: "+date+"\n\tPlace: "+place;
            await superContract.methods.createEvent(eth,dai,content,name,desc,seats).send({ from: accounts[0] });
            
        })();
        
        this.setState({});
        
      }).catch((err) => {
        console.error(err);
      });
      // if(this.state.createEvent.length==0){
      //   return(<center> <h6> Transaction <Loader
      //     type="Puff"
      //     color="#00BFFF"
      //     height={100}
      //     width={100}
      //     timeout={3000} //3 secs
    
      //  /></h6></center>);
      // } 
  }

  render(){
    if(this.state.superWeb3==null||this.state.superContract ==null){
      this.state.superWeb3= this.props.web3;
      this.state.superContract=this.props.contract;
      this.state.accounts=this.props.account;
    }
    console.log(this.state.superWeb3);    
    if(this.state.superWeb3!= null ){
      console.log("bleh");
      console.log(this.state.superWeb3);
      return(
       
      <div>
         
    <Container className="main-container">
      <Row>
        <Col sm="12" md="12">
          <div>
            <h3>Add New Event</h3><hr/> <br />
            <Card>
              <CardHeader>Enter The Details Of Event</CardHeader>
              <CardBody>
                <CardTitle>Title</CardTitle>
                <FormInput name="Name" value={this.state.name} onChange={this.handleInput} />
                <br />
                <CardTitle>Description of Event</CardTitle>
                <FormTextarea name="description" value={this.state.description} onChange={this.handleInput} placeholder="Max 200 Words"/>
                <br />
                <CardTitle>Where Is It</CardTitle>
                <FormInput name="Place" value={this.state.place} onChange={this.handleInput} />
              
                <br />
                <CardTitle>When Is It</CardTitle>
                <FormInput name="Date" value={this.state.date} onChange={this.handleInput} />
              
                <br />
                <CardTitle>Price(In Eth)</CardTitle>
                <FormInput name="Eth" type="number"  value={this.state.eth} onChange={this.handleInput} />
              
                <br />
                <CardTitle>Price(In Dai)</CardTitle>
                <FormInput name="Dai" type="number" value={this.state.dai} onChange={this.handleInput} />
              
                <br />
                <CardTitle>Number of Seats</CardTitle>
                <FormInput name="Seats" type="number" value={this.state.seats} onChange={this.handleInput} />
              
                <br />
                <CardTitle>Give Us an Image</CardTitle>
                <FormInput type="file" theme="danger" onChange={this.captureFile} placeholder="Upload an Image" className="form-control"/>
                <br /> <br />
                <center><Button outline pill onClick={this.createEvent} >Submit </Button></center>
              </CardBody>
            </Card>
          </div>
        </Col>
      </Row>
    </Container>
  </div>);}
  else{return(<div>
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
   )}
  
  }
}
