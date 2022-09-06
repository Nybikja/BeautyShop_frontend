import React from "react";
import { Nav, Navbar, Container} from "react-bootstrap";
import { HashLink } from 'react-router-hash-link';


import "./Header.scss"
import authService from "../../service/auth.service";





function Header(props) {
  const [expanded, setExpanded] = React.useState(false);
  const handleShow = props.handleShow;
  const user = authService.getCurrentUser();
  let showAdminBoard;
  if (user !== null) {
    showAdminBoard = user.roles.includes("ROLE_ADMIN");
  }
    return (
      <>
       <Navbar expanded={expanded}  expand="none" fixed="top">
        <Container className="d-flex justify-content-between align-items-center">
          <Navbar.Brand className="allcenter">
            <img src="imgjs/logo/logogr.png" alt="logotype"  className="d-inline-block align-top"/>
            <h1>ClubShop</h1>
          </Navbar.Brand>
          <div   className="cart-over ">
            <Nav.Link className="me-2" onClick={() => {handleShow();setExpanded(false)}}>
              {props.countCartItems ? ( 
                <span className="items-amount me-2">{props.countCartItems}</span> ) : ( '' ) 
              } 
              <img className="cart-button" src="imgjs/icons/cart.svg" alt="" /> 
            </Nav.Link>
            <Navbar.Toggle onClick={() => setExpanded(!expanded)}  /> 
          </div>
         <Navbar.Collapse id="basic-navbar-nav">
           <Nav className="links-align">
             {showAdminBoard && ( 
              <HashLink onClick={() => setExpanded(false)} className="nav-link fw-bold" to="/i-love-cocks" label="AdminPage" >АДМІНКА</HashLink>
              )} 
              <HashLink onClick={() => setExpanded(false)} className="nav-link" to="/" label="MainPage">Головна</HashLink>
              <HashLink onClick={() => setExpanded(false)} className="nav-link" to="/davines" label="Davines">Про Davines</HashLink>
              <HashLink onClick={() => setExpanded(false)} className="nav-link" to="/shopping" label="ShoppingPage">Магазин</HashLink>
             
           </Nav>
         </Navbar.Collapse>
         
       </Container>
     </Navbar>
    </>
    );
};

export default Header;