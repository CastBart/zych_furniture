import { useEffect, useState } from "react";
import { getProductInfo, getProductImages } from "../../lib/api";
import useHttp from "../../hooks/use-http";
import Spinner from "react-bootstrap/Spinner";
import "./Products.css";
import ProductForm from "./ProductForm";
import Pergola from "./Pergola";
import KidsSwing from "./KidsSwing";
import DoubleSwing from "./DoubleSwing";

const Products = () => {
  const [product, setProduct] = useState("");
  const [productImage, setProductImage] = useState("");
  const {
    sendRequest: getProductData, //function to access data from database
    status: productStatus,
    data: productData, // transfromed data into an object
    error: productError,
  } = useHttp(getProductInfo, true);

  const {
    sendRequest: getImages,
    status: imagesStatus,
    data: imagesData,
    error: imagesError,
  } = useHttp(getProductImages, true);

  useEffect(() => {
    getProductData();
    getImages();
  }, [getProductData, getImages]);

  const productSelectHandler = (value) => {
    setProduct(value);
    for (let i = 0; i < imagesData.length; i++) {
      const element = imagesData[i];
      if (element.hasOwnProperty(value)) {
        const source = element[value];
        console.log(source);
        setProductImage(source);
      }else if(value === 'Choose product'){
        setProductImage(null)
      }

    }
    console.log(value);
  };

  let productDescription = (
    <div className="product-description">
      <h1>Interested in one of our products?</h1>
      <h3>Choose one from the drop down menu</h3>
    </div>
  );
  if(product === 'pergola'){
    productDescription = <Pergola />
  }
  if(product === 'kids swing'){
    productDescription = <KidsSwing />
  }
  if (product === 'double swing'){
    productDescription = <DoubleSwing />
  }

  let productSelect;
  if (productStatus === "pending") {
    productSelect = (
      <div className="centered">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  } else if (productError) {
    productSelect = <p>{productError}</p>;
  } else {
    productSelect = (
      <div className="row justify-content-center">
        <div className="col-md-8">
          <ProductForm
            onSelect={productSelectHandler}
            data={productData["products"]}
            id="product"
          />
        </div>
        <div className="container products-image">
          {productImage && <img src={productImage} alt={product} />}
        </div>
      </div>
    );
  }
  return (
    <section id="products" className="fullscreen-container d-flex products-color">
      <div className="row container-fluid">
        <div className="col-md-4">{productSelect}</div>
        <div className="col">{productDescription}</div>
      </div>
    </section>
  );
};

export default Products;
