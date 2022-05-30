import { useEffect } from "react";
import { getProductDescription } from "../../lib/api";
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
    const info = data.map((offer) => {
      console.log(offer);
      const h2 = Object.keys(offer);
      let p = Object.values(offer);
      if (Array.isArray(p)) {
        p = p.map((item) => {
          const h3 = Object.keys(item);
          const paragrap = Object.values(item);
          return (
            <div>
              <h3>{h3}</h3>
              <p>{paragrap}</p>
            </div>
          );
        });
      }
      return <div>
          <h2>{h2}</h2>
          <p>{p}</p>
      </div>
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
