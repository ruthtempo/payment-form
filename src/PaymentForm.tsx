import { Button, Card, Col, Form, Row } from "react-bootstrap";
import imageLog from "./media/originalimage2.png";

export const PaymentForm = () => {
  return (
    <Card className="mt-4">
      <Card.Body className="d-flex flex-column align-items-center">
        <Card.Img src={imageLog} className="w-25" />
        <Card.Title className="text-center mt-3">Payment Info</Card.Title>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Full Name</Form.Label>
            <Form.Control type="text" placeholder="Your Name" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Card Number</Form.Label>
            <Form.Control type="text" placeholder="1234 1234 1234 1234" />
          </Form.Group>
          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Expiration</Form.Label>
                <Form.Control type="text" placeholder="MM/YY" />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>CVV</Form.Label>
                <Form.Control type="text" placeholder="..." />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Zip Code</Form.Label>
            <Form.Control type="text" placeholder="Your Zip" />
          </Form.Group>
          <Button variant="primary" type="submit" className="mb-2">
            Confirm Payment
          </Button>
          <p>You verify that this info is correct</p>
        </Form>
      </Card.Body>
    </Card>
  );
};
