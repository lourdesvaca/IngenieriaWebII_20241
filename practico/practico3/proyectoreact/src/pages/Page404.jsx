import { Col, Container, Row } from "react-bootstrap";
import Menu from "../components/Menu";

const Page404 = () => {
    return (<>
        <Menu />
        <Container>
            <Row className="mt-3">
                <Col>
                    <h1>404, página no encontrada</h1>
                </Col>
            </Row>
        </Container>
    </>);
}

export default Page404;