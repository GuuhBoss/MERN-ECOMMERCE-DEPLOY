import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import Card from "./Card";
import { read, listRelated } from "./apiCore";

const Product = (props) => {
  const [product, setProduct] = useState({});
  const [error, setError] = useState(false);
  const [relatedProduct, setRelatedProduct] = useState([]);

  const loadSingleProduct = (productId) => {
    read(productId).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProduct(data);

        // fetch related products
        listRelated(data._id).then((data) => {
          if (data.error) {
            setError(data.error);
          } else {
            setRelatedProduct(data);
          }
        });
      }
    });
  };

  useEffect(() => {
    const productId = props.match.params.productId;
    loadSingleProduct(productId);
  }, [props]);

  return (
    <Layout
      title={product.name}
      description={
        product && product.description && product.description.substring(0, 100)
      }
      className="container"
    >
      <h2 className="mb-4">Single Product</h2>
      <div className="row">
        <div className="col-8">
          {product && product.description && (
            <Card product={product} showViewbutton={false} />
          )}
        </div>
        <div className="col-4">
          <h4>Related products</h4>
          {console.log(relatedProduct)}
          {relatedProduct.map((p, i) => (
            <div key={i} className="mb-3">
              <Card product={p} />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Product;
