import { useState } from "react";
import LabelBS from "../../components/LabelBS";
import { useNavigate } from "react-router-dom";
import Menu from "../../components/Menu";
import { Button, Card, Col, Container, Form, FormControl, FormGroup, Row } from "react-bootstrap";
import { postLogin } from "../../services/AuthService";

const LoginForm = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [validated, setValidated] = useState(false);
    const [errors, setErrors] = useState({})

    const enviarDatos = (e) => {
        const form = e.currentTarget;
        let isValid = form.checkValidity();

        e.preventDefault();
        e.stopPropagation();

        setValidated(true);

        if (!isValid) {
            return;
        }
        doLogin();
    }
    const doLogin = () => {
        const credentials = {
            email,
            password
        }

        postLogin(credentials)
            .then((res) => {
                localStorage.setItem('token', res.token)
                localStorage.setItem('username', email)
                navigate('/personas')
            }).catch((err) => {
                console.error(err)
                if (err.response.status === 401) {
                    setErrors({ ...errors, formError: 'Usuario o contraseña incorrectos' })
                }
            })
    }

    return (
        <>
            <Menu />
            <Container>
                <Row className="mt-3">
                    <Col>
                        <Card>
                            <Card.Body>
                                <Card.Title>
                                    <h1>Iniciar sesión</h1>
                                </Card.Title>
                                <Form noValidate validated={validated} onSubmit={enviarDatos}>
                                    {errors.formError && <p className="text-danger">{errors.formError}</p>}
                                    <FormGroup>
                                        <LabelBS text="Correo" />
                                        <FormControl required type="email" value={email} onChange={(e) => {
                                            setEmail(e.target.value)
                                        }} />
                                        <Form.Control.Feedback type="invalid">
                                            Ingrese un correo válido
                                        </Form.Control.Feedback>
                                    </FormGroup>
                                    <FormGroup className="mt-2">
                                        <LabelBS text="Contraseña" />
                                        <FormControl required type="password" value={password} onChange={(e) => {
                                            setPassword(e.target.value)
                                        }} />
                                        <Form.Control.Feedback type="invalid">
                                            Ingrese una contraseña válida
                                        </Form.Control.Feedback>
                                    </FormGroup>
                                    <div className="mt-2">
                                        <Button type="submit">Iniciar sesión</Button>
                                    </div>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default LoginForm;