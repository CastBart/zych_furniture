import From from "react-bootstrap/Form";
import { useState } from "react";
import "./Pricing.css";

const Pricing = () => {
  const [product, setProduct] = useState('');
  console.log(product);
  return (
    <section id="pricing" className="fullscreen-container pricing-color">
      <h1>Pricing</h1>
      <div className="row">
        <div className="col-md-3">
          <div className="container">
            <From.Select
              value={product}
              onChange={(e) => setProduct(e.target.value)}
            >
              <option>Choose Product</option>
              <option value="pergola">Pergola</option>
              <option value="single-swing">Single Swing</option>
              <option value="double-swing">Double Swing</option>
            </From.Select>
          </div>
        </div>
        <div className="col-md-9">display information</div>
      </div>
    </section>
  );
};
export default Pricing;
