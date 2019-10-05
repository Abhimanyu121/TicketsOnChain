import React from "react";
import {
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  FormInput,
  Collapse
} from "shards-react";
import {
  HashRouter,
  NavLink
} from "react-router-dom";

import './index.css'

export default class NavExample extends React.Component {
  constructor(props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.navclick = this.navclick.bind(this);

    this.state = {
      collapseOpen: false,
      value: 0,
    };
  }

  toggleNavbar() {
    this.setState({
      ...this.state,
      ...{
        collapseOpen: !this.state.collapseOpen
      }
    });
  }
   navclick(){
     this.setState({value: Math.random()});
   }

  render() {
    return (
      <div>
      <HashRouter>
      <Navbar type="dark" theme="primary" expand="md" className="navbar-class">

        <NavbarToggler onClick={this.toggleNavbar} />

        <Collapse open={this.state.collapseOpen} navbar>
          <Nav navbar>
            <NavItem>
              <NavLink onClick={this.navlink} active to="/" className="nav-link">
                Home
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink onClick={this.navlink} to="/new-review" className="nav-link">
              Add Place
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink onClick={this.navlink} to="/places-near" className="nav-link">
              Places Near Me
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink onClick={this.navlink} to="/new-token" className="nav-link">
              Get New Token
              </NavLink>
            </NavItem>
          </Nav>

          <Nav navbar className="ml-auto">
            <NavItem>
              <NavLink to="/profile" className="nav-link">
              Daniel
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
      </HashRouter>
      </div>
    );
  }
}
