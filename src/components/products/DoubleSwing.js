import { useEffect } from "react";
import { getProductDescription } from "../../lib/api";
import useHttp from "../../hooks/use-http";
import Spinner from "react-bootstrap/Spinner";
import "./DoubleSwing.css";

const DoubleSwing = () => {
    const {
        sendRequest: getDescription, //function to access data from database
        status,
        data: productData, // transfromed data into an object
        error,
      } = useHttp(getProductDescription, true);
    
      const createDisplayData = (data) => {
        const info = data.map(offer =>{
            console.log(offer)
            return <div>
                <h2>{Object.keys(offer)}</h2>
                <p>{Object.values(offer)}</p>
            </div>
        })
        return info
      };
    
      useEffect(() => {
        getDescription("double swing");
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

export default DoubleSwing;
