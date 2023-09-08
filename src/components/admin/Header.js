import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logo from '../../assets/images/logo.png'
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Cookies from 'universal-cookie';
import { useSelector, useDispatch } from 'react-redux';
import { handleLogoutRedux } from '../../redux/actions/UserAction';

function Header() {
    //const { logout, user } = useContext(UserContext);
    const user = useSelector(state => state.user.account);
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const cookies = new Cookies();
    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(handleLogoutRedux());

    }
    let token = cookies.get('jwt');
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <NavLink className='navbar-brand' to="/">
                    <img src={logo} width="30" height='30' className='d-inline-block align-top' alt='logo' />
                    <span>Admin</span>
                </NavLink>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">

                    {user && user.auth ?


                        <>
                            <Nav className="me-auto" activeKey={location.pathname}>
                                <NavLink className='nav-link' to="/">Home</NavLink>

                                {user && user.auth && <NavLink className='nav-link' to="/users">Manage User</NavLink>}
                                <NavDropdown title="Quản lý sách" id="nav-dropdown">
                                    <NavDropdown.Item href='/book/listbook' >Danh sách</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href='/book/bookimport' >Nhập sách</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href='/book/supplier'>Nhà cung cấp</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href='/book/category'>Loại sách</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item >Cho mượn sách</NavDropdown.Item>
                                </NavDropdown>


                            </Nav>
                            <Nav>
                                {user && user.email && <span className='nav-link'>wellcome {user.email} </span>}

                                <NavDropdown title="Setting" id="basic-nav-dropdown">

                                    {user && user.auth ? <NavLink className='dropdown-item' onClick={(e) => handleLogout(e)} >
                                        Logout
                                    </NavLink> :
                                        <NavLink className='dropdown-item' to="/login">Login</NavLink>

                                    }




                                </NavDropdown>

                            </Nav>
                        </> :
                        <>
                            <Nav className="me-auto" activeKey={location.pathname}>


                            </Nav>
                            <Nav>
                                {user && user.email && <span className='nav-link'>wellcome {user.email} </span>}

                                <NavDropdown title="Setting" id="basic-nav-dropdown">


                                    <NavLink className='dropdown-item' to="/login">Login</NavLink>



                                </NavDropdown>

                            </Nav>
                        </>
                    }







                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;
