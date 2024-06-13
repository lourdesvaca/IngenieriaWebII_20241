import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Container, Form, Nav, NavDropdown, Navbar } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";

const Menu = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    const [persona, setPersona] = useState(null)
    const cerrarSesionClicked = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username')

        navigate('/login');
    }
    useEffect(() => {
        if (persona) {
            return;
        }
        getUserInfo();
    }, [])
    const getUserInfo = () => {
        axios.get('http://localhost:3000/api/me', {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).then((res) => {
            setPersona(res.data);
        });
    }

    return (
        <Navbar bg="dark" data-bs-theme="dark" expand="md">
            <Container>
                <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {token ? <>
                            <NavDropdown title="Personas" id="basic-nav-dropdown">
                                <NavLink end className={"dropdown-item"} to="/personas/create" >Crear Persona</NavLink>
                                <NavLink end className={"dropdown-item"} to="/personas">
                                    Lista de Personas
                                </NavLink>
                            </NavDropdown>
                            <NavDropdown title="Mascotas" id="basic-nav-dropdown">
                                <NavLink end className={"dropdown-item"} to="/mascotas/create" >Crear Mascota</NavLink>
                                <NavLink end className={"dropdown-item"} to="/mascotas">
                                    Lista de Mascotas
                                </NavLink>
                            </NavDropdown>
                            <NavLink className={"nav-link"}>{persona && <>{persona.nombre} {persona.apellido}</>}</NavLink>
                            <button onClick={cerrarSesionClicked} className="btn btn-link nav-link">Cerrar sesión</button>
                        </> : <>
                            <NavLink end className={"nav-link"} to="/login">Iniciar sesión</NavLink>
                            <NavLink end className={"nav-link"} to="/register">Registrarse</NavLink>
                        </>}

                    </Nav>
                    {token && <Form className="d-flex">
                        <Form.Control
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                        />
                        <Button variant="outline-success">Search</Button>
                    </Form>}
                </Navbar.Collapse>
            </Container>

        </Navbar>
    );
}

export default Menu;