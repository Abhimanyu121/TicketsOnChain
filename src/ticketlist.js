import React from "react";
import { Container,Row,Col, Card,CardHeader,CardTitle,CardBody,CardImg } from "shards-react";
export default class CreateToken extends React.Component<{}, State> {
  render(){
    return(
      <div>
        <Container className="main-container">
          <Row>
            <Col sm="12" md="12">
              <div>
                <h3>Your Tickets</h3><hr/> <br />
                <Card>
                  <CardHeader>Ticket</CardHeader>
                  
                  <CardBody className="Ticket">
                    <CardImg></CardImg>
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

}