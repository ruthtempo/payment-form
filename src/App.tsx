import { Row, Col, Container } from "react-bootstrap";
import { PaymentForm } from "./PaymentForm";

function App() {
  return (
    <Container className="h-100">
      <Row>
        <Col lg={{ span: 4, offset: 4 }}>
          <PaymentForm />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
