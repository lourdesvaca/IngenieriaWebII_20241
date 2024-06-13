import { useEffect, useState } from "react";
import LabelBS from "../../components/LabelBS";
import { useNavigate, useParams } from "react-router-dom";
import Menu from "../../components/Menu";
import { Button, Card, Col, Container, Form, FormControl, FormGroup, FormSelect, Row } from "react-bootstrap";
import { getMascotaById, insertMascota, updateMascota } from "../../services/MascotaService";
import { getPersonaList } from "../../services/PersonaService";

const MascotaForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [nombre, setNombre] = useState('')
    const [personaId, setPersonaId] = useState('')
    const [tipo, setTipo] = useState('')
    const [listaPersonas, setListaPersonas] = useState([])
    const [validated, setValidated] = useState(false);
    const [errors, setErrors] = useState({})

    useEffect(() => {
        fetchListaPersonas();
    }, [])


    useEffect(() => {
        if (!id) return;
        fetchMascota();
    }, [id])
    const fetchListaPersonas = () => {
        getPersonaList()
            .then((res) => {
                setListaPersonas(res);
            });
    }
    const fetchMascota = () => {
        getMascotaById(id)
            .then((res) => {
                const mascota = res;
                setNombre(mascota.nombre);
                setPersonaId(mascota.persona_id);
                setTipo(mascota.tipo);
            }).catch((err) => {
                console.log(err);
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
        saveMascota();
    }
    const saveMascota = () => {
        const mascota = {
            nombre,
            persona_id: personaId,
            tipo,
        }
        if (id) {
            updateMascota(id, mascota)
                .then(() => {
                    navigate('/mascotas')
                }).catch((err) => {
                    console.log(err);
                    setErrors({ ...errors, formError: 'Error al actualizar mascota, intente nuevamente' })
                });
        } else {
            insertMascota(mascota)
                .then(() => {
                    navigate('/mascotas')
                }).catch((err) => {
                    console.log(err);
                    setErrors({ ...errors, formError: 'Error al insertar mascota, intente nuevamente' })
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
                                    <h1>Formulario de Mascotas</h1>
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
                                        <LabelBS text="Dueño" />
                                        <FormSelect required value={personaId} onChange={(e) => {
                                            setPersonaId(e.target.value)
                                        }}>
                                            <option value="">Seleccione un dueño</option>
                                            {listaPersonas.map((persona) =>
                                                <option key={"persona-" + persona.id} value={persona.id}>{persona.nombre} {persona.apellido}</option>
                                            )}
                                        </FormSelect>
                                        <Form.Control.Feedback type="invalid">El dueño es requerido</Form.Control.Feedback>
                                    </FormGroup>
                                    <FormGroup className="mt-2">
                                        <LabelBS text="Tipo" />
                                        <FormSelect required value={tipo} onChange={(e) => {
                                            setTipo(e.target.value)
                                        }}>

                                            <option value="">Seleccione un tipo</option>
                                            <option value="0">Perro</option>
                                            <option value="1">Gato</option>
                                            <option value="2">Loro</option>
                                            <option value="3">Capibara</option>
                                        </FormSelect>
                                        <Form.Control.Feedback type="invalid">El tipo es requerido</Form.Control.Feedback>
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

export default MascotaForm;