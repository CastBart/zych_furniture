import { useEffect } from "react";
import { getProductDescription, isObject } from "../../lib/api";
import useHttp from "../../hooks/use-http";
import Spinner from "react-bootstrap/Spinner";
import "./KidsSwing.css";

const KidsSwing = () => {
  const {
    sendRequest: getDescription, //function to access data from database
    status,
    data: productData, // transfromed data into an object
    error,
  } = useHttp(getProductDescription, true);

  const createDisplayData = (data) => {
    console.log(data);
    const info = data.map((item) => {
      const h2 = Object.keys(item);
      let p = Object.values(item);
      if (isObject(p[0])) {
        const object = p[0];
        console.log("isobject");
        console.log(object);
        const h3 = Object.keys(object);
        console.log(h3);
        p = h3.map((title) => {
          return (
            <div className="sub-info">
              <h5>{title}</h5>
              <p>{object[title]}</p>
            </div>
          );
        });
      } else {
        p = <p>{p}</p>;
      }
      return (
        <div>
          <h2>{h2}</h2>
          {p}
        </div>
      );
    });
    return info;
  };

  useEffect(() => {
    getDescription("kids swing");
  }, []);

  if (status === "pending") {
    return (
      <div className="centered">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }
  if (error) {
    return <p>{error}</p>;
  }

  return <div>{createDisplayData(productData)}</div>;
};

export default KidsSwing;
