import { ErrorMessage } from "@hookform/error-message";
import { useEffect, useRef, useState } from "react";
import {
  Button,
  Card,
  Col,
  Form,
  FormControl,
  InputGroup,
  Row,
  Spinner,
} from "react-bootstrap";
import { CreditCard, InfoCircleFill, LockFill } from "react-bootstrap-icons";
import { useForm } from "react-hook-form";
import imageLog from "../media/payment.png";
import "./paymentForm.css";
import flag from "../media/flag.png";

type PaymentDetails = {
  fullName: string;
  cardNumber: string;
  expirationDate: string;
  cvv: number;
  zipCode: string;
};

const formatCardNum = (cardNum: string) => {
  const arr = cardNum.split("").filter((num) => num.match(/^[0-9]/));
  let final: string = "";

  let count = 0;
  for (let i = 0; i < arr.length; i++) {
    count++;
    if (count === 5) {
      final = final.concat(" " + arr[i]);
      count = 1;
    } else {
      final = final.concat(arr[i]);
    }
  }
  return final;
};

const formatExpirationDate = (date: string) => {
  return date
    .split("")
    .filter((e) => e.match(/^[0-9]/))
    .map((e, i) => (i === 2 ? `/${e}` : e))
    .join("");
};

export const PaymentForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    getFieldState,
    // reset,
    watch,
  } = useForm<PaymentDetails>({
    defaultValues: {
      fullName: "de",
      cardNumber: "1111111111111111",
      expirationDate: "1212",
      cvv: 123,
      zipCode: "1",
    },
  });

  const onSubmit = (data: PaymentDetails) => {
    console.log(data);
  };
  const cardNum = watch("cardNumber");
  const expirDate = watch("expirationDate");

  useEffect(() => {
    if (isSubmitSuccessful) {
      setIsPending(true);

      setTimeout(() => {
        getPosition();
      }, 1000);
      const timer = setTimeout(() => {
        setIsSuccess(true);
        // reset();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isSubmitSuccessful]);

  const [isPending, setIsPending] = useState(false); //is submitting button
  const [isSuccess, setIsSuccess] = useState(false);
  const [x, setX] = useState<number | undefined>();
  const [y, setY] = useState<number | undefined>();

  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const getPosition = () => {
    const x = buttonRef.current?.offsetLeft;
    setX(x);

    const y = buttonRef.current?.offsetTop;
    setY(y);
  };

  return (
    <Card
      className={`
        my-4
        shadow-lg
        overflow-hidden
        ${isSuccess ? "successMode" : ""}
        ${isPending ? "pendingMode" : ""}
      `}
    >
      <Card.Body className="d-flex flex-column align-items-center">
        <Card.Img src={imageLog} className="w-25" />
        <Card.Title className="text-center mb-3 display-6">
          Payment Info
        </Card.Title>
        <Form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Form.Group className="mb-3">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Your Name"
              {...register("fullName", {
                required: "This field is required",
                pattern: /^[a-zA-Z ]+$/,
              })}
              isInvalid={!!errors.fullName}
              isValid={getFieldState("fullName").isTouched && !errors.fullName}
            />
            <ErrorMessage
              as={<FormControl.Feedback type="invalid" />}
              errors={errors}
              name="fullName"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Card Number</Form.Label>
            <InputGroup>
              <Form.Control
                type="text"
                maxLength={19}
                placeholder="1234 1234 1234 1234"
                value={cardNum}
                className="border-end-0"
                {...register("cardNumber", {
                  required: "This field is required",
                  setValueAs: formatCardNum,
                  pattern: /^[0-9]{4}\s[0-9]{4}\s[0-9]{4}\s[0-9]{4}$/,
                })}
                isInvalid={!!errors.cardNumber}
                isValid={
                  getFieldState("cardNumber").isTouched && !errors.cardNumber
                }
              />
              <InputGroup.Text
                className={`bg-white ${
                  errors.cardNumber
                    ? "border-danger rounded-end"
                    : getFieldState("cardNumber").isTouched
                    ? "border-success rounded-end"
                    : ""
                }`}
              >
                <CreditCard fill="lightgrey" />
              </InputGroup.Text>
              <ErrorMessage
                as={<FormControl.Feedback type="invalid" />}
                errors={errors}
                name="cardNumber"
              />
            </InputGroup>
          </Form.Group>
          <Row>
            <Col className="w-50">
              <Form.Group className="mb-3">
                <Form.Label>Expiration</Form.Label>
                <Form.Control
                  maxLength={5}
                  type="text"
                  value={expirDate}
                  placeholder="MM/YY"
                  {...register("expirationDate", {
                    required: true,
                    pattern: {
                      value: /^(0[1-9]|1[0-2])\/([0-9]{2})$/,
                      message: "Invalid expiration date",
                    },
                    setValueAs: formatExpirationDate,
                  })}
                  isInvalid={!!errors.expirationDate}
                  isValid={
                    getFieldState("expirationDate").isTouched &&
                    !errors.expirationDate
                  }
                />
                <ErrorMessage
                  as={<FormControl.Feedback type="invalid" />}
                  errors={errors}
                  name="expirationDate"
                />
              </Form.Group>
            </Col>
            <Col className="w-50">
              <Form.Group className="mb-3">
                <Form.Label>CVV</Form.Label>
                <InputGroup>
                  <Form.Control
                    maxLength={3}
                    type="text"
                    placeholder="..."
                    className="border-end-0"
                    {...register("cvv", {
                      required: "CVV is required",
                      pattern: { value: /\d{3}/, message: "CVV has 3 digits" },
                    })}
                    isInvalid={!!errors.cvv}
                    isValid={getFieldState("cvv").isTouched && !errors.cvv}
                  />
                  <InputGroup.Text
                    className={`bg-white ${
                      errors.cvv
                        ? "border-danger rounded-end"
                        : getFieldState("cvv").isTouched
                        ? "border-success rounded-end"
                        : ""
                    }`}
                  >
                    <InfoCircleFill fill="lightgrey" />
                  </InputGroup.Text>
                  <ErrorMessage
                    as={<FormControl.Feedback type="invalid" />}
                    errors={errors}
                    name="cvv"
                  />
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>
          <Form.Group className="mb-3">
            <Form.Label>Zip Code</Form.Label>
            <Form.Control
              type="text"
              placeholder="Your Zip"
              {...register("zipCode", { required: "A zip code is required" })}
              isInvalid={!!errors.zipCode}
              isValid={getFieldState("zipCode").isTouched && !errors.zipCode}
            />
            <ErrorMessage
              as={<FormControl.Feedback type="invalid" />}
              errors={errors}
              name="zipCode"
            />
          </Form.Group>
          <div className="d-flex flex-column align-items-center">
            <Button
              ref={buttonRef}
              type="submit"
              className={`
                confirmPaymentButton
                mb-2
                border-0
                d-flex
                align-items-center
                justify-content-center
              `}
            >
              {isPending ? (
                <Spinner variant="light" animation="border" size="sm" />
              ) : (
                <>
                  <LockFill className="me-2" />
                  Confirm Payment
                </>
              )}
            </Button>
            <p className="fw-lighter d-flex justify-content-center">
              You verify that this info is correct
            </p>
            <div className="successContainer" style={{ top: y, left: x }}>
              <div className="successText h-100 d-flex flex-column align-items-center justify-content-center text-white">
                <img
                  src={flag}
                  alt="flag"
                  width="50%"
                  className="img-fluid mb-4"
                />
                <h4>Thank you!</h4>
                <p>Your purchase was successful.</p>
              </div>
            </div>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};
