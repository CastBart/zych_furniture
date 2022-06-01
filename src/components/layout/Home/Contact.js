import { useState } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import { Formik } from "formik";
import * as yup from "yup";
import "./Contact.css";

const schema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  city: yup.string().required(),
  county: yup.string().required(),
  message: yup.string().required(),
});

const Contact = () => {
  const handleSubmit = (event) => {
    console.log(event);
  };

  return (
    <Formik
      validationSchema={schema}
      onSubmit={handleSubmit}
      initialValues={{
        firstName: "",
        lastName: "",
        city: "",
        county: "",
        message: "",
      }}
    >
      {({
        handleSubmit,
        handleChange,
        handleBlur,
        values,
        touched,
        isValid,
        errors,
      }) => (
        <div id="contact" className="fullscreen-container contact-color">
          <div className="row container-fluid justify-content-center">
            <div className="col-sm-6">
              <h1>Contact</h1>
              <Form noValidate onSubmit={handleSubmit}>
                <Row className="mb-3">
                  <Form.Group as={Col} md="6" controlId="validationCustom01">
                    <Form.Label>First name</Form.Label>
                    <Form.Control
                      type="text"
                      name="firstName"
                      value={values.firstName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      // isValid={touched.firstName && !errors.firstName}
                      isInvalid={touched.firstName && !!errors.firstName}
                    />
                    <Form.Control.Feedback>
                      {errors.lastName}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} md="6" controlId="validationCustom02">
                    <Form.Label>Last name</Form.Label>
                    <Form.Control
                      type="text"
                      name="lastName"
                      value={values.lastName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      // isValid={touched.lastName && !errors.lastName}
                      isInvalid={touched.lastName && !!errors.lastName}
                    />
                    <Form.Control.Feedback></Form.Control.Feedback>
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group as={Col} md="6" controlId="validationCustom03">
                    <Form.Label>City</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="City"
                      name="city"
                      value={values.city}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      // isValid={touched.city && !errors.city}
                      isInvalid={touched.city && !!errors.city}
                    />
                    <Form.Control.Feedback type="invalid">
                      City is a required field.
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} md="6" controlId="validationCustom04">
                    <Form.Label>County</Form.Label>
                    <Form.Control
                      as="select"
                      name="county"
                      value={values.county}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      // isValid={touched.county && values.county.trim().length !== 0}
                      isInvalid={touched.county && !!errors.county}
                    >
                      <option value="">Select county</option>
                      <option value="Carlow">Carlow</option>
                      <option value="Cavan">Cavan</option>
                      <option value="Clare">Clare</option>
                      <option value="Cork">Cork</option>
                      <option value="Donegal">Donegal</option>
                      <option value="Dublin">Dublin</option>
                      <option value="Galway">Galway</option>
                      <option value="Kerry">Kerry</option>
                      <option value="Kildare">Kildare</option>
                      <option value="Kilkenny">Kilkenny</option>
                      <option value="Laois">Laois</option>
                      <option value="Leitrim">Leitrim</option>
                      <option value="Limerick">Limerick</option>
                      <option value="Longford">Longford</option>
                      <option value="Louth">Louth</option>
                      <option value="Mayo">Mayo</option>
                      <option value="Meath">Meath</option>
                      <option value="Monoghan">Monoghan</option>
                      <option value="Offaly">Offaly</option>
                      <option value="Roscommon">Roscommon</option>
                      <option value="Sligo">Sligo</option>
                      <option value="Tipperary">Tipperary</option>
                      <option value="Waterford">Waterford</option>
                      <option value="Westmeath">Westmeath</option>
                      <option value="Wexford">Wexford</option>
                      <option value="Wicklow">Wicklow</option>
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid county.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label>Message</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="message"
                    value={values.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    // isValid={touched.message && !errors.message}
                    isInvalid={touched.message && !!errors.message}
                    rows={6}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a message.
                  </Form.Control.Feedback>
                </Form.Group>
                <Button type="submit">Submit form</Button>
              </Form>
            </div>
          </div>
        </div>
      )}
    </Formik>
  );
};

export default Contact;
