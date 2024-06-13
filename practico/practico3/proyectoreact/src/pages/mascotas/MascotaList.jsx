import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import Menu from "../../components/Menu";
import { getTipoForDisplay } from "../../utils/mascotaUtils";
import { deleteMascota, getMascotaList } from "../../services/MascotaService";

const MascotaList = () => {
    const [mascotaList, setMascotaList] = useState([])

    useEffect(() => {
        fetchListaMascotas();
    }, [])


    const fetchListaMascotas = () => {
        getMascotaList()
            .then((res) => {
                setMascotaList(res);
            });
    }
    const removeMascota = (id) => {
        const confirmation = window.confirm('¿Estás seguro de eliminar esta mascota?');
        if (!confirmation) return;
        deleteMascota(id).then(() => {
            fetchListaMascotas();
        });
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
                                    <h1>Lista de Mascotas</h1>
                                </Card.Title>
                                <Table>
                                    <thead>
                                        <tr>
                                            <th>Id</th>
                                            <th>Nombre</th>
                                            <th>Dueño</th>
                                            <th>Tipo</th>
                                            <th></th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {mascotaList.map((mascota) =>
                                            <tr key={"mascota-" + mascota.id}>
                                                <td>{mascota.id}</td>
                                                <td>{mascota.nombre}</td>
                                                <td>{mascota.persona.nombre} {mascota.persona.apellido}</td>
                                                <td>{getTipoForDisplay(mascota.tipo)}</td>
                                                <td><Link className="btn btn-primary" to={"/mascotas/" + mascota.id}>Editar</Link></td>
                                                <td>
                                                    <Button variant="danger" onClick={() => removeMascota(mascota.id)}>
                                                        Eliminar
                                                    </Button>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>);
}

export default MascotaList;