/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import { NavLink as RRNavLink } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';
import { logout, _getUserData } from '../modules/authManager';

export default function Header({ isLoggedIn }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState("");
  const toggle = () => setIsOpen(!isOpen);
  useEffect(() => {
    if (isLoggedIn) {
      _getUserData().then(res => setIsAdmin(res.isAdmin))
    }
  }, [isLoggedIn])
  return (
    <div>
      <Navbar color="dark" dark expand="md" light>
        <NavbarBrand tag={RRNavLink} to="/">Treasure Chest</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            { /* When isLoggedIn === true, we will render the Home link */}
            {isLoggedIn &&
              <NavItem>
                <NavLink tag={RRNavLink} to="/">Home</NavLink>
              </NavItem>
            }
            {isLoggedIn &&
              <NavItem>
                <NavLink tag={RRNavLink} to="/Privilege">Privileges</NavLink>
              </NavItem>
            }
             {isLoggedIn &&
              <NavItem>
                <NavLink tag={RRNavLink} to="/activePrivileges">Active Privileges</NavLink>
              </NavItem>
            }
              {isLoggedIn &&
              <NavItem>
                <NavLink tag={RRNavLink} to="/Chore">Chores</NavLink>
              </NavItem>
            }
            {isAdmin === "Admin" &&
              <NavItem>
                <NavLink tag={RRNavLink} to="/User">Users</NavLink>
              </NavItem>
            }
          </Nav>
          <Nav navbar>
            {isLoggedIn &&
              <>
                <NavItem>
                  <a aria-current="page" className="nav-link"
                    style={{ cursor: "pointer" }} onClick={logout}>Logout</a>
                </NavItem>
              </>
            }
            {!isLoggedIn &&
              <>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/login">Login</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/register">Register</NavLink>
                </NavItem>
              </>
            }
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}
