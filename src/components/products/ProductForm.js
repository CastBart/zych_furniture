import { useState } from "react";
import Form from "react-bootstrap/Form";
import { isObject } from "../../lib/api";

const ProductForm = (props) => {
  const [selected, setSelected] = useState("");

  const onChangeHandler = (e) => {
    const value = e.target.value;
    // console.log(props.data[value]);
    // console.log(value);
    if (props.data) {
      if (isObject(props.data[value])) {
        props.onSelect(props.data[value]);
      } else {
        props.onSelect(props.data[value], value);
      }
    }

    //  else(props.onSelect(props.data))
    setSelected(e.target.value);
  };
  return (
    <div className="container">
      <Form.Label htmlFor={props.id}>{props.id}</Form.Label>
      <Form.Select id={props.id} value={selected} onChange={onChangeHandler}>
        {props.children}
      </Form.Select>
    </div>
  );
};

export default ProductForm;
