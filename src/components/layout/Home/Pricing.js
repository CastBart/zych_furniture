import { useState, useEffect } from "react";
import { getProductInfo, getProductImages, isObject } from "../../../lib/api";
import useHttp from "../../../hooks/use-http";
import Spinner from "react-bootstrap/Spinner";
import "./Pricing.css";
import ProductForm from "../../products/ProductForm";

/**
 * creates an option JSX element with given id
 * @param {*name of option} id is used as an option name and its value
 * @returns JSX element
 */
const createOptions = (id) => {
  return (
    <option key={id} value={id}>
      {id}
    </option>
  );
};

const Pricing = () => {
  const [productSelectList, setProductSelectList] = useState([]);
  const [selectedValuesList, setSelectedValuesList] = useState([]);
  const [product, setProduct] = useState("");
  const [productImage, setProductImage] = useState("");

  const {
    sendRequest: getPricingData, //function to access data from database
    status,
    data: pricingData, // transfromed data into an object
    error,
  } = useHttp(getProductInfo, true);

  const {
    sendRequest: getProductData,
    data: productData,
  } = useHttp(getProductImages, true);

  useEffect(() => {
    getPricingData();
    getProductData();
  }, [getPricingData, getProductData]);

  /**
   * Sets the snapshot image to the current product that is selected
   * @param {current product} value of the product form select
   */
  const productChangeHandler = (value) => {
    setProduct(value);
    for (let i = 0; i < productData.length; i++) {
      const element = productData[i];
      if (element.hasOwnProperty(value)) {
        const source = element[value];
        console.log(source);
        setProductImage(source);
      }
    }
  };

  /**
   * Creating a list of form lable and form select with options
   * @param {object which is transformed into form select options} data
   * @param {if data is an array, lable variable can be passed in for speciing the lable name. if lableName is not provided it's set to 'color'} lableName
   */
  const createForm = (data, lableName = "color") => {
    if (isObject(data)) {
      const entries = Object.entries(data);
      const form = entries.map((entry) => {
        //destructuring an object into 2 values
        const [entryKey, entryValue] = entry;
        if (isObject(entryValue)) {
          //checks if second value is an object
          const valueEntries = Object.entries(entryValue); // creating a new array for each entry in the object
          const valueOptions = valueEntries.map((key) => {
            // since entry value is an object, need to get each entries name to create options for the form select
            return key[0];
          });
          return (
            <ProductForm
              key={entryKey}
              onSelect={createForm}
              data={entryValue}
              options={valueOptions}
              id={entryKey}
            >
              {valueOptions}
            </ProductForm>
          );
        }
        //if the entryvalue is not an object it must be an array. for each entry, a form is created with options depending on data thats passed on
        return (
          <ProductForm
            key={entryKey}
            onSelect={createForm}
            data={data}
            options={entryValue}
            id={entryKey}
          />
        );
      });
      setProductSelectList(form);
    } else if (Array.isArray(data)) {
      //this is the final nest of the function. meaning there is no more data inside the passed on variable
      const form = (
        <ProductForm
          key={lableName}
          onSelect={null}
          data={null}
          options={data}
          id={lableName}
        />
      );

      setProductSelectList((prev) => {
        if (prev.length <= 3) {
          const [first, second, third] = prev;
          return [first, second, form, third ];
        } else{
          const [first, second, , forth] = prev;
          return [first, second, form, forth];
        }
      });
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
    return createOptions(key);
  });
  const woodOptions = pricingData["wood"].map((key) => {
    return createOptions(key);
  });

  return (
    <section id="pricing" className="fullscreen-container pricing-color">
      <h2>Check out our product pricing!</h2>
      <div className="row justify-content-center">
        <div className="col-md-3">
          <ProductForm
            onSelect={createForm}
            onProductChange={productChangeHandler}
            data={pricingData["products"]}
            options={pricingData["products"]}
            id="product"
          >
            {productOptions}
          </ProductForm>
          <div className="container pricing-image">
            <img src={productImage} alt={product}/>
          </div>
        </div>
        <div className="col-md-3">
          <ProductForm
            onSelect={null}
            data={pricingData["wood"]}
            options={pricingData["wood"]}
            id="wood"
          >
            {woodOptions}
          </ProductForm>
          {productSelectList}
        </div>
        <div className="col-md-3">
          <p>{product.trim().length > 0 ? `This will be the ${product} detailed description` : 'Select a product to see pricing'}</p>
        </div>
      </div>
    </section>
  );
};
export default Pricing;
