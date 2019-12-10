import React from "react";
import { Container,Row, FormInput, Button,Col, Card,CardHeader,CardTitle,CardBody,FormTextarea } from "shards-react";
import { Marker, Popup } from 'react-leaflet';



export default class CreateReview extends React.Component<{}, State> {

  constructor(props){
    super(props);
    this.state = {
      subject: '',
      details: '',
      dai: '',
      eth: '',
      date: '',
      place: '',
      web3: null,
      accounts: null,
      contract: null,

    }
  };
    

    

  handleInput(event) {
    const target = event.target;
    if (target.name == "subject"){
      this.setState(Object.assign({}, this.state, {subject: target.value}));
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
    const marker = this.state.hasLocation ? (
      <Marker position={this.state.latlng}>
        <Popup>You are here</Popup>
      </Marker>
    ) : null
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
                    <FormInput name="subject" value={this.state.subject} onChange={this.handleInput} />
                    <br />
                    <CardTitle>Description of Event</CardTitle>
                    <FormTextarea name="details" value={this.state.details} onChange={this.handleInput} placeholder="Max 200 Words"/>
                    <br />
                    <CardTitle>Where Is It</CardTitle>
                    <FormInput name="Place" value={this.state.place} onChange={this.handleInput} />
                  
                    <br />
                    <CardTitle>When Is It</CardTitle>
                    <FormInput name="Date" value={this.state.date} onChange={this.handleInput} />
                  
                    <br />
                    <CardTitle>Price(In Eth)</CardTitle>
                    <FormInput name="Eth" value={this.state.eth} onChange={this.handleInput} />
                  
                    <br />
                    <CardTitle>Price(In Dai)</CardTitle>
                    <FormInput name="Dai" value={this.state.dai} onChange={this.handleInput} />
                  
                    <br />
                    <CardTitle>Give Us an Image</CardTitle>
                    <FormInput type="file" theme="danger" onChange={this.captureFile} placeholder="Upload an Image" className="form-control"/>
                    <br /> <br />
                    <center><Button theme="success" onClick={this.runExample}>Submit</Button></center>
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
