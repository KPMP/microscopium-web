import React, { Component } from 'react';
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownToggle,
    Nav, Navbar, NavbarBrand, NavItem, NavLink, UncontrolledDropdown } from 'reactstrap';
import { Link } from 'react-router-dom';

class DemoNavBar extends Component {
    render() {
        return (
            <Navbar expand="md" className="nav-container container-fluid row">
                <NavbarBrand href={process.env.PUBLIC_URL + "/"}>
                    <img src="img/logo.png" alt="Kidney Tissue Atlas Concept" className="logo"/>
                </NavbarBrand>
                <div id="demo-text">
                    Atlas Concept
                </div>
                <Nav navbar className="ml-auto">
                    <NavItem>
                        <NavLink>
                            <Link to="/">Cell Types</Link></NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink disabled>Molecular</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink disabled>Clinical</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink disabled>Pathology</NavLink>
                    </NavItem>
                    <NavItem>
                        <Button id="feedback-button" color="primary" onClick={() => window.open("https://goo.gl/forms/WkyC7PZM8AIe3NoI3", "_blank")}>Send Feedback</Button>
                    </NavItem>
                </Nav>
            </Navbar>

        );
    }
}

export default DemoNavBar;