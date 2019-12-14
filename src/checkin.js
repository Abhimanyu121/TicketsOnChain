import React from "react";
import { Button, Card,CardTitle,CardBody } from "shards-react";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import {
  Row,
  Col,
  Container
} from 'shards-react';



export default class CreateToken extends React.Component{
  
  render(){
    return (
        <div>
        <Container className="main-container">
          <Row>
            <Col sm="12" md="12">
              <div>
                <h3>Check-In</h3><hr/> <br />
        <Card>
          <CardBody>
            <CardTitle>Event name</CardTitle>
            <CardTitle>Number of tickets:</CardTitle>
           <center><Button theme="success"> Check-In</Button></center>
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
