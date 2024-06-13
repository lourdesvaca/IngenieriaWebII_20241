import { Button, Card, Col, Container, Form, FormControl, FormGroup, Row } from "react-bootstrap";
import Menu from "../../components/Menu";
import LabelBS from "../../components/LabelBS";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { postRegister } from "../../services/AuthService";

const RegisterForm = () => {
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

        const newErrors = {
            password: {}
        };
        if (!password) {
            newErrors.password.emptyPassword = 'La contraseña es requerida';
        } else {
            if (password.length < 5) {
                newErrors.password.passwordLength = 'La contraseña debe tener al menos 5 caracteres';
            }
            const passwordRegex = new RegExp(/^(?=.*[!@#%$])/);
            if (!passwordRegex.test(password)) {
                newErrors.password.passwordSymbols = 'La contraseña debe contener al menos uno de los siguientes símbolos: !@#%$';
            }
            const upperCaseRegex = new RegExp(/^(?=.*[A-Z])/);
            if (!upperCaseRegex.test(password)) {
                newErrors.password.passwordUpperCase = 'La contraseña debe contener al menos una letra mayúscula';
            }
            const lowerCaseRegex = new RegExp(/^(?=.*[a-z])/);
            if (!lowerCaseRegex.test(password)) {
                newErrors.password.passwordLowerCase = 'La contraseña debe contener al menos una letra minúscula';
            }
            const numberRegex = new RegExp(/^(?=.*[0-9])/);
            if (!numberRegex.test(password)) {
                newErrors.password.passwordNumber = 'La contraseña debe contener al menos un número';
            }
        }


        if (Object.keys(newErrors.password).length == 0) {
            delete newErrors.password;
        } else {
            isValid = false;
        }
        if (!isValid) {
            setErrors(newErrors);
            console.log('Formulario inválido', newErrors);
            return;
        }

        doRegister();
    }
    const doRegister = () => {
        const credentials = {
            email,
            password
        }

        postRegister(credentials)
            .then(() => {
                navigate('/login');
            }).catch((err) => {
                console.log(err)
                if (err.response.status === 400) {
                    setErrors({ ...errors, formError: err.response.data.message })
                }
            });
    }
    return (<>
        <Menu />
        <Container>
            <Row className="mt-3">
                <Col>
                    <Card>
                        <Card.Body>
                            <Card.Title>
                                <h1>Registro</h1>
                            </Card.Title>
                            <Form noValidate validated={validated} onSubmit={enviarDatos}>
                                {errors.formError && <p className="text-danger">{errors.formError}</p>}
                                <FormGroup className="mt-2">
                                    <LabelBS text="Correo" />
                                    <FormControl required type="email" value={email} onChange={(e) => {
                                        setEmail(e.target.value)
                                    }} />
                                </FormGroup>
                                <FormGroup className="mt-2">
                                    <LabelBS text="Contraseña" />
                                    <FormControl isInvalid={errors.password} type="password" value={password} onChange={(e) => {
                                        setPassword(e.target.value)
                                    }} />
                                    {errors.password?.emptyPassword && <Form.Control.Feedback type="invalid">{errors.password.emptyPassword}</Form.Control.Feedback>}
                                    {errors.password?.passwordLength && <Form.Control.Feedback type="invalid">{errors.password.passwordLength}</Form.Control.Feedback>}
                                    {errors.password?.passwordSymbols && <Form.Control.Feedback type="invalid">{errors.password.passwordSymbols}</Form.Control.Feedback>}
                                    {errors.password?.passwordUpperCase && <Form.Control.Feedback type="invalid">{errors.password.passwordUpperCase}</Form.Control.Feedback>}
                                    {errors.password?.passwordLowerCase && <Form.Control.Feedback type="invalid">{errors.password.passwordLowerCase}</Form.Control.Feedback>}
                                    {errors.password?.passwordNumber && <Form.Control.Feedback type="invalid">{errors.password.passwordNumber}</Form.Control.Feedback>}
                                </FormGroup>
                                <div className="mt-2">
                                    <Button type="submit">Registro</Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    </>);
}

export default RegisterForm;