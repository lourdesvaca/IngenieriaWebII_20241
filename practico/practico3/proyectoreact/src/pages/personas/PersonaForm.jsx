import { useEffect, useState } from "react";
import LabelBS from "../../components/LabelBS";
import { useNavigate, useParams } from "react-router-dom";
import Menu from "../../components/Menu";
import { Button, Card, Col, Container, Form, FormControl, FormGroup, FormSelect, Row } from "react-bootstrap";
import moment from "moment";
import { getPersonaById, insertPersona, updatePersona } from "../../services/PersonaService";

const PersonaForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [nombre, setNombre] = useState('')
    const [apellido, setApellido] = useState('')
    const [email, setEmail] = useState('')
    const [edad, setEdad] = useState('')
    const [fechaNacimiento, setFechaNacimiento] = useState('')
    const [telefono, setTelefono] = useState('')
    const [genero, setGenero] = useState('')
    const [usuarioId, setusuarioId] = useState('')
    const [validated, setValidated] = useState(false);
    const [errors, setErrors] = useState({})

    useEffect(() => {
        if (!id) return;
        fetchPersona();
    }, [id])
    const fetchPersona = () => {
        getPersonaById(id).then((persona) => {
            setNombre(persona.nombre);
            setApellido(persona.apellido);
            setEmail(persona.email);
            setEdad(persona.edad);
            setFechaNacimiento(moment.utc(persona.fechaNacimiento).format('YYYY-MM-DD'));
            setTelefono(persona.telefono);
            setGenero(persona.genero.toString());
            setusuarioId(persona.usuario_id);
        });
    }

    const enviarDatos = (e) => {

        const form = e.currentTarget;
        let isValid = form.checkValidity();

        e.preventDefault();
        e.stopPropagation();

        setValidated(true);

        if (!isValid) {
            return;
        }
        savePersona();
    }
    const savePersona = () => {
        const persona = {
            nombre,
            apellido,
             email,
            edad,
            fechaNacimiento,
            telefono,
            genero,
            usuario_id: usuarioId
        }
        if (id) {
            updatePersona(id, persona).then(() => {
                navigate('/personas')
            }).catch((err) => {
                console.log(err);
                setErrors({ ...errors, formError: 'Error al actualizar persona, intente nuevamente' })
            });
        } else {
            insertPersona(persona).then(() => {
                navigate('/personas');
            }).catch((err) => {
                console.log(err);
                setErrors({ ...errors, formError: 'Error al insertar persona, intente nuevamente' })
            });
        }
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
                                    <h1>Formulario de Personas</h1>
                                </Card.Title>
                                <Form noValidate validated={validated} onSubmit={enviarDatos}>
                                    {errors.formError && <p className="text-danger">{errors.formError}</p>}
                                    <FormGroup>
                                        <LabelBS text="Nombre" />
                                        <FormControl required type="text" value={nombre} onChange={(e) => {
                                            setNombre(e.target.value)
                                        }} />
                                        <Form.Control.Feedback type="invalid">El nombre es requerido</Form.Control.Feedback>
                                    </FormGroup>
                                    <FormGroup className="mt-2">
                                        <LabelBS text="Apellido" />
                                        <FormControl required type="text" value={apellido} onChange={(e) => {
                                            setApellido(e.target.value)
                                        }} />
                                        <Form.Control.Feedback type="invalid">El apellido es requerido</Form.Control.Feedback>
                                    </FormGroup>
                                    <FormGroup className="mt-2">
                                        <LabelBS text="Email" />
                                        <FormControl required type="email" value={email} onChange={(e) => {
                                            setEmail(e.target.value)
                                        }} />
                                        <Form.Control.Feedback type="invalid">El email es requerido</Form.Control.Feedback>
                                    </FormGroup>
                                    <FormGroup className="mt-2">
                                        <LabelBS text="Teléfono" />
                                        <FormControl required type="text" value={telefono} onChange={(e) => {
                                            setTelefono(e.target.value)
                                        }} />
                                        <Form.Control.Feedback type="invalid">El teléfono es requerido</Form.Control.Feedback>
                                    </FormGroup>
                                    <FormGroup className="mt-2">
                                        <LabelBS text="Edad" />
                                        <FormControl required type="number" value={edad} onChange={(e) => {
                                            setEdad(e.target.value)
                                        }} />
                                        <Form.Control.Feedback type="invalid">La edad es requerida</Form.Control.Feedback>
                                    </FormGroup>
                                    <FormGroup className="mt-2">
                                        <LabelBS text="Fecha de Nacimiento" />
                                        <FormControl required type="date" value={fechaNacimiento} onChange={(e) => {
                                            setFechaNacimiento(e.target.value)
                                        }} />
                                        <Form.Control.Feedback type="invalid">La fecha de nacimiento es requerida</Form.Control.Feedback>
                                    </FormGroup>
                                    <FormGroup className="mt-2">
                                        <LabelBS text="Género" />
                                        <FormSelect required value={genero} onChange={(e) => {
                                            setGenero(e.target.value)
                                        }}>
                                            <option value=""></option>
                                            <option value="1">Masculino</option>
                                            <option value="0">Femenino</option>
                                            <option value="-1">Indefinido</option>
                                        </FormSelect>
                                        <Form.Control.Feedback type="invalid">El género es requerido</Form.Control.Feedback>
                                    </FormGroup>
                                    <FormGroup className="mt-2">
                                        <LabelBS text="Usuario" />
                                        <FormControl required type="number" value={usuarioId} onChange={(e) => {
                                            setusuarioId(e.target.value)
                                        }} />
                                        <Form.Control.Feedback type="invalid">Ingrese el id del usuario</Form.Control.Feedback>
                                    </FormGroup>
                                    <div className="mt-2">
                                        <Button type="submit">Guardar</Button>
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

export default PersonaForm;