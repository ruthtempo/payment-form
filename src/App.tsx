import { Row, Col, Container } from "react-bootstrap";
import { PaymentForm } from "./components/PaymentForm";

function App() {
  return (
    <Container className="min-vh-100 d-flex align-items-center justify-content-center">
      <Row>
        <Col md={{ span: 6, offset: 3 }} xxl={{ span: 6, offset: 3 }}>
          <PaymentForm />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
