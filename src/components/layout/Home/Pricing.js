import { useState, useEffect } from "react";
import { getPricingInfo, isObject } from "../../../lib/api";
import useHttp from "../../../hooks/use-http";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
import "./Pricing.css";
import ProductForm from "../../products/ProductForm";

const createProductOptions = (id) => {
  return (
    <option key={id} value={id}>
      {id}
    </option>
  );
};
const createProductForm = (obj) => {
  if (isObject(obj)) {
    const entries = Object.entries(obj);
    const form = entries.map((entry) => {
      const [entryKey, entryValue] = entry;

      if (isObject(entryValue)) {
        const valueEntries = Object.entries(entryValue);
        const valueOptions = valueEntries.map((key) => {
          // console.log(key);
          return createProductOptions(key[0]);
        });
        const childForm = createProductForm(entryValue);
        const select = (
          <div className="container">
            {/* <Form.Label>{entryKey}</Form.Label> */}
            {/* <Form.Select>{valueOptions}</Form.Select> */}
            {/* {childForm} */}
            <ProductForm onSelect={createProductForm(entryValue)} id={entryKey}>
              {valueOptions}
            </ProductForm>
          </div>
        );
        //const child = createProductForm(entryValue);
        //console.log(child);
        if (select !== null) {
          return select;
        }
      }
      const options = entryValue.map((option) => {
        return createProductOptions(option);
      });
      return (
        <>
          <Form.Label htmlFor={entryKey}>{entryKey}</Form.Label>
          <Form.Select id={entryKey}>{options}</Form.Select>
        </>
      );
    });
    return <div className="container">{form}</div>;
  }
  return createProductOptions(obj);
};

const Pricing = () => {
  const [product, setProduct] = useState("");
  const [formList, setFormList] = useState([]);

  const {
    sendRequest: getPricingData,
    status,
    data: pricingData,
    error,
  } = useHttp(getPricingInfo, true);

  useEffect(() => {
    getPricingData();
    // setFormList(createForm(pricingData))
  }, []);

  const createForm = (data, lableName = "") => {
    if (isObject(data)) {
      const entries = Object.entries(data);
      const form = entries.map((entry) => {
        const [entryKey, entryValue] = entry;
        if (isObject(entryValue)) {
          const valueEntries = Object.entries(entryValue);
          const valueOptions = valueEntries.map((key) => {
            // console.log(key);
            return createProductOptions(key[0]);
          });
          return (
            <ProductForm
              key={entryKey}
              onSelect={createForm}
              data={entryValue}
              id={entryKey}
            >
              {valueOptions}
            </ProductForm>
          );
        }
        const entryValueOptions = entryValue.map((entry) => {
          return createProductOptions(entry);
        });
        return (
          <ProductForm
            key={entryKey}
            onSelect={createForm}
            data={data}
            id={entryKey}
          >
            {entryValueOptions}
          </ProductForm>
        );
      });
      // setFormList((prev) => [...prev, form]);
      setFormList([form])
      // console.log(form);
      return form;
    } else if (Array.isArray(data)) {
      // console.log(data);
      // console.log(lableName);
      const options = data.map((item) => {
        return createProductOptions(item);
      });
      const form = (
        <ProductForm key='color' onSelect={null} data={null} id='color'>
          {options}
        </ProductForm>
      );
      setFormList((prev) => [...prev, form]);
      return form;
    }
  };

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
  const selectHandler = (value) => {
    setProduct(value);
  };

  return (
    <section id="pricing" className="fullscreen-container pricing-color">
      <h1>Pricing</h1>
      <div className="row">
        <div className="col-md-3">
          <ProductForm
            onSelect={createForm}
            data={pricingData["products"]}
            id="product"
          >
            {productOptions}
          </ProductForm>
          {/* {createForm(pricingData)} */}
        </div>
        <div className="col-md-9">
          {/* {createProductForm(pricingData["products"][product])} */}
          {formList}
        </div>
      </div>
    </section>
  );
};
export default Pricing;
