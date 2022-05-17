import { useState, useEffect } from "react";
import { getPricingInfo } from "../../../lib/api";
import useHttp from "../../../hooks/use-http";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
import "./Pricing.css";

/**
 *
 * @param {*value to be tested if its an object or not} value
 * @returns returns a true or false whether the passed value is an object or not
 */
const isObject = (value) => {
  return !!(value && typeof value === "object" && !Array.isArray(value));
};

const createProductForm = (obj) => {
  console.log(isObject(obj));
  if (isObject(obj)) {
    const entries = Object.entries(obj);
    // console.log(entries)

    const form = entries.map((object) => {
      const [objectKey, objectValue] = object;
      console.log(objectKey, objectValue);
      if (isObject(objectValue)) {
        createProductForm(objectValue);
      }
      if (Array.isArray(objectValue)) {
        const options = objectValue.map((option) => {
          <option key={option} value={option}>
            {option}
          </option>;
        });
        return <div className="container">
          {options}
        </div>
        
      }
      return <Form.Label>{objectKey}</Form.Label>;
    });
    return <div className="container">{form}</div>;
    // for (let i = 0; i < entries.length; i++) {
    //   const [objKey, objValue] = entries[i];
    //   console.log(objKey, objValue);
    //   if (isObject(objValue)) {
    //     createProductForm(objValue);
    //   }

    // }
  }
  // return <Form.Label>{obj}</Form.Label>
};

const Pricing = () => {
  const [product, setProduct] = useState("");
  console.log(product);
  const {
    sendRequest: getPricingData,
    status,
    data: pricingData,
    error,
  } = useHttp(getPricingInfo, true);

  useEffect(() => {
    getPricingData();
    console.log(pricingData);
  }, []);

  if (status === "pending") {
    return (
      <div className="fullscreen-container">
        <div className="centered">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      </div>
    );
  }
  if (error) {
    return <p>{error}</p>;
  }

  //return all options for different types of products
  const productOptions = Object.keys(pricingData["products"]).map((key) => {
    return (
      <option key={key} value={key}>
        {key}
      </option>
    );
  });

  return (
    <section id="pricing" className="fullscreen-container pricing-color">
      <h1>Pricing</h1>
      <div className="row">
        <div className="col-md-3">
          <div className="container">
            <Form.Label htmlFor="product">Product</Form.Label>
            <Form.Select
              id="product"
              value={product}
              onChange={(e) => setProduct(e.target.value)}
            >
              {productOptions}
              {product}
            </Form.Select>
          </div>
        </div>
        <div className="col-md-9">
          {createProductForm(pricingData["products"][product])}
        </div>
      </div>
    </section>
  );
};
export default Pricing;
