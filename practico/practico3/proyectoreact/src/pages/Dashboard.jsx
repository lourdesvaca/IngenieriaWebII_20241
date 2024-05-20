import { Col, Container, Row } from "react-bootstrap";
import Menu from "../components/Menu";

const Dashboard = () => {
    return (<>
        <Menu />
        <Container>
            <Row className="mt-3">
                <Col>
                    <h1>Bienvenido</h1>
                </Col>
            </Row>
        </Container>
    </>);
}

export default Dashboard;