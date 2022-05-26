import { useState } from "react";
import Form from "react-bootstrap/Form";
import { isObject } from "../../lib/api";

/**
 * Creates options for From.Select
 * @param {*} data is transfromed into JSX option element
 * @returns JSX 'option' element
 */
const createOptions = (data) => {
  if (isObject(data)) {
    const entries = Object.entries(data);
    return entries.map((entry) => {
      return (
        <option key={entry[0]} value={entry[0]}>
          {entry[0].replace(/^./, (str) => str.toUpperCase())}
        </option>
      );
    });
  } else if (Array.isArray(data)) {
    return data.map((entry) => {
      return (
        <option key={entry} value={entry}>
          {entry.replace(/^./, (str) => str.toUpperCase())}
        </option>
      );
    });
  }
};

const ProductForm = (props) => {
  const [selected, setSelected] = useState("");

  /**
   * sets the selected value to the target
   * passesthe value selected to the parent by calling onSelect function
   * @param {event} e event object
   */
  const onChangeHandler = (e) => {
    const value = e.target.value;
    props.onSelect(value);
    setSelected(value);
  };

  return (
    <div className="container">
      <Form.Label htmlFor={props.id}>
        {props.id.replace(/^./, (str) => str.toUpperCase())}
      </Form.Label>
      <Form.Select id={props.id} value={selected} onChange={onChangeHandler}>
        <option>{`Choose ${props.id}`}</option>
        {createOptions(props.data)}
      </Form.Select>
    </div>
  );
};

export default ProductForm;
