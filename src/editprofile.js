import React from "react";
import { Container,Row, FormInput, Button,Col, Card,CardHeader,CardTitle,CardBody,FormTextarea } from "shards-react";
import { Marker, Popup } from 'react-leaflet';



export default class CreateReview extends React.Component<{}, State> {

  constructor(props){
    super(props);
    this.state = {
      subject: '',
      email: '',
      phone: '',

    }
  };
    

    

  handleInput(event) {
    const target = event.target;
    if (target.name == "subject"){
      this.setState(Object.assign({}, this.state, {subject: target.value}));
    }
    else if (target.name == "email") {
      this.setState(Object.assign({}, this.state, {email: target.value}));
    }
    else if (target.name == "phone") {
      this.setState(Object.assign({}, this.state, {phone: target.value}));
    }
    else {
      this.setState(Object.assign({}, this.state, {name: target.value}));
    }
  }
  render(){
    return(
      <div>
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
                    <FormInput name="email" value={this.state.email} onChange={this.handleInput} />
                    <br />
                    <CardTitle>Add Phone No.</CardTitle>
                    <FormInput name="phone" value={this.state.phone} onChange={this.handleInput} />
                    <br />
                    
                    <center><Button outline pill onClick={this.runExample}>Save Changes</Button></center>
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
