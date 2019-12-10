import React from "react";
import getContractInstance from './utils.js';

import {
  Row,
  Col,
  Container,
  Button,
  Card,
  CardFooter,
  CardBody,
  CardTitle,
  CardHeader,
  CardImg,
  ListGroup,
  ListGroupItem,
} from 'shards-react';
import { Link } from "react-router-dom/cjs/react-router-dom.min";

export default class Profile extends React.Component {
  render() {
    return (
      <div>
        <Container className="main-container">
        <Row>
        <Col sm="12" md="12">
        <TrackHistory></TrackHistory>
        </Col>
        </Row>
        </Container>
      </div>
    );
  }
}

class TrackHistory extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.runExample = this.runExample.bind(this);
    this.state = {
      posts : [],
      contract : null,
      accounts: null,
      web3: null,
      profile: {},
      kudos: [],
    };
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  runExample = async () => {

    const { accounts, contract } = this.state;
    let count = await contract.methods.getPostCount().call({ from: accounts[0] });
    let responses = [];
    for(let i=0;i<count;i++){
      let response = await contract.methods.getPosts(i).call({from: accounts[0]});
      responses.push(response);
    }
    let profile = await contract.methods.myProfile().call({ from: accounts[0] });
    console.log(responses);
    console.log(profile);
    let kudos = [];
    let kcount = await contract.methods.tokenid().call({ from: accounts[0] });
    for(let k=0; k<kcount; k++){
      let owner = await contract.methods.ownerOf(k).call({ from: accounts[0] });
      if(owner == accounts[0]){
        let tokenurli = await contract.methods.tokenURI(k).call({from:accounts[0]});
        kudos.push(tokenurli);
      }
    }
    console.log('Kudos is ');
    console.log(kudos);
    this.setState({posts:responses, profile:profile, kudos:kudos});
  };

  componentDidMount = async () => {
    const obj = await getContractInstance();
    this.setState({ web3:obj.web3, accounts:obj.accounts, contract: obj.contract});
    this.runExample();
  };

  render(){

    const myprofile = this.state.profile;
    console.log(myprofile);
    const kudosList = this.state.kudos.map((item, index) =>

      <Col sm="12" md="3">
        <Card>
        <CardHeader>{JSON.parse(item).name}</CardHeader>
        <CardImg width="285" src={JSON.parse(item).image}/>
        <CardBody>
          <p>{JSON.parse(item).description}</p>
          </CardBody>
      </Card>
      </Col>

  )
    const listItems = this.state.posts.map((item) =>

      <Col sm="12" md="12">
        <ListGroupItem>
          <CardImg width="50" src="https://c.gitcoin.co/avatars/0357f94b529985a8a898ab338add0edf/djrosenbaum.png" />
          <CardImg width="50" src={"https://ipfs.io/ipfs/" +(JSON.parse(item.content).ipfsId)} />
          <Row>
            <Col sm="4" md="6">
              <p>Reviewer Name :- {item.addr}</p>
            </Col>
            <Col sm="4" md="6">
              <p>Place Location :- </p>
            </Col>
          </Row>
          <Row>
            <Col sm="4" md="6">
              <p >Subject :- {JSON.parse(item.content).subject}</p>
            </Col>
            <Col sm="4" md="6">
              <Button theme="success">See More</Button>
            </Col>

          </Row>
        </ListGroupItem>
      </Col>

  )
    return(
      <div>
        <Row>
          <Col sm="12" md="3">
              <CardImg width="200" src="https://c.gitcoin.co/avatars/0357f94b529985a8a898ab338add0edf/djrosenbaum.png" /> <br /> <br/>
              <h3><b>Daniel</b></h3>
              <h5><b><a href="/#/edit-profile">Edit Profile</a></b></h5>
          </Col>
          <Col sm="12" md="9">
            <div>
              <Card>
                <CardHeader>Details</CardHeader>
                <CardBody>
                  <p>Total Tickets :- {this.state.profile.tickets}</p>
                  <p>Total Events Attended/Attending :- {this.state.profile.events}</p>
        
                  </CardBody>
                </Card>
            </div>
          </Col>
        </Row>
        <br />
        <br />
      <hr />
        <h5>Events You have Added</h5>
        <Row>
          <ListGroup>
        {listItems}
          </ListGroup>
        </Row>

        <br/ >
          <hr />
            <h5>Your Tickets</h5>
            <Row>

            {kudosList}

            </Row>
        <Row>

        </Row>
      </div>
    );
  }
}
