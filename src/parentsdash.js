import React from "react";
import { Collapse,Container,Row, FormInput, Button,Col, Card,CardHeader,CardTitle,CardBody,FormTextarea,FormSelect,Badge } from "shards-react";

export default class parentsdash extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      latestArtifact: 'Application 1',
      new : Math.random(),
    };
  }
  getNewArtifact(hash){
    const latestArtifact = this.state.latestArtifact;
    const latestArtifactNew = hash;
    console.log('Changes  new artifact ');
    console.log(hash);
    this.setState({latestArtifact:latestArtifactNew, new:Math.random()});
  }

  render(){
    return(
      <div>
        <Container className="main-container">
        <Row>
        <Col sm="12" md="12">
        <CreatedArtifacts key={this.state.new} latestOne={this.state.latestArtifact} ></CreatedArtifacts>
        </Col>
        </Row>
        </Container>
      </div>
    );
  }
}

class NewArtifact extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      reciever: '',
      coordinates: '',
      name: '',
    };

    this.handleInput = this.handleInput.bind(this);
    this.addArtifact = this.addArtifact.bind(this);
  }

  addArtifact(){
    return '';
  }

  handleInput(event) {
    const target = event.target;
    if (target.name == "reciever"){
      this.setState(Object.assign({}, this.state, {reciever: target.value}));
    }
    else if (target.name == "coordinates") {
      this.setState(Object.assign({}, this.state, {coordinates: target.value}));
    }
    else {
      this.setState(Object.assign({}, this.state, {name: target.value}));
    }
  }
  render(){
    return(
      <div>
      <h3>Enter New Application</h3><hr/> <br />
      <Card>
      <CardHeader>Enter The Details Of Application</CardHeader>
      <CardBody>
        <CardTitle>Subject</CardTitle>
        <FormInput name="reciever" placeholder="Subject" value={this.state.reciever} onChange={this.handleInput} />
        <br />
        <CardTitle>Application Details</CardTitle>
        <FormTextarea placeholder="Enter Application Details"/>

        <br />

        <CardTitle>Application From:</CardTitle>
        <FormInput name="name" placeholder="Application From" value={this.state.name} onChange={this.handleInput}/>
        <br />
        <CardTitle>Application To:</CardTitle>
        <FormSelect>
      <option value="first">HOD</option>
      <option value="second">Teacher Guardian</option>
      <option value="third"> Parents</option>

    </FormSelect>
    <br /> <br />
        <Button onClick={this.addArtifact}></Button>
      </CardBody>

    </Card>
      </div>
    );
  }
}

class CreatedArtifacts extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = { collapse: false, 'num':2, history: [] };
    var tx = this.props.latestOne;
    console.log('Tx is');
    console.log(tx);
    const history = this.state.history;
    console.log('History Before Adding');
    console.log(history);
    if(tx){
      history.push(tx);
    }
    console.log('New History');
    console.log(history);
    var newState = Object.assign({}, this.state , {history: history});
    this.state = newState;
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  render(){
    const listItems = this.state.history.map((item) =>
      <li key={item.txId} className="list-items-artifacts">
      <br/ >
      <Card>
      <CardHeader>Latest Application Id:-{item.txId} </CardHeader>
      <CardBody>
        <p>Application Name :- </p>
        <p>Current status</p>

        <Button onClick={this.toggle}>See The Status</Button>
        <Button>Approve</Button>
        <Collapse open={this.state.collapse}>

        <br/ >
            <span>
            <Badge theme="success">Parents</Badge>
       <Badge theme="danger">Teacher Guardian</Badge>
      <Badge theme="danger">HOD</Badge>

            </span>

        </Collapse>
      </CardBody>
    </Card>
      </li>
    )
    return(
        <div>
        <h3>Previously Created Application</h3><hr/> <br />
        {listItems}
      </div>
    );
  }
}
