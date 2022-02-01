import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import ShowImg from "./ShowImg";
import moment from "moment";
import { addItem, updateItem, removeItem } from "./cartHelpers";

const Card = ({
  product,
  showViewbutton = true,
  showCartButton = true,
  cartUpdate = false,
  showRemoveProductButton = false,
  setRun = (f) => f,
  run = undefined,
  // changeCartSize
}) => {
  const showbutton = () => {
    return (
      showViewbutton && (
        <Link to={`/product/${product._id}`}>
          <button className="btn btn-outline-primary mt-2 mb-2">
            View Product
          </button>
        </Link>
      )
    );
  };

  const [redirect, setRedirect] = useState(false);

  const [count, setCount] = useState(product.count);

  const addToCart = () => {
    addItem(product, () => {
      setRedirect(true);
    });
  };

  const shouldRedirect = (redirect) => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  const showAddCart = (showCartButton) => {
    return showCartButton && (
      <button  className="btn btn-outline-warning mt-2 mb-2">
        Add to cart
      </button>
    );
  };

  const showStock = (quantity, showCartButton) => {
    if (quantity > 0) {
      return (
        showCartButton && (
          <button
            onClick={addToCart}
            className="btn btn-outline-warning mt-2 mb-2 position-relative"
          >
            Add to cart
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success">
              In Stock
            </span>
          </button>
        )
      );
    } else {
      return (
        showCartButton && (
          <button className="btn btn-outline-warning position-relative mt-2 mb-2">
            Add to cart
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              Out of Stock
            </span>
          </button>
        )
      );
    }
  };

  const handleChange = (productId) => (event) => {
    setRun(!run); // run useEffect in parent Cart
    setCount(event.target.value < 1 ? 1 : event.target.value);
    if (event.target.value >= 1) {
      updateItem(productId, event.target.value);
    }
  };

  const showCartUpdateOptions = (cartUpdate) => {
    return (
      cartUpdate && (
        <div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Adjust Quantity</span>
            </div>
            <input
              type="number"
              className="form-control"
              value={count}
              onChange={handleChange(product._id)}
            />
          </div>
        </div>
      )
    );
  };
  const showRemoveButton = (showRemoveProductButton) => {
    return (
      showRemoveProductButton && (
        <button
          onClick={() => {
            removeItem(product._id);
            setRun(!run); // run useEffect in parent Cart
          }}
          className="btn btn-outline-danger mt-2 mb-2"
        >
          Remove Product
        </button>
      )
    );
  };
  return (
    <div className="card">
      <div className="card-header name">{product.name}</div>
      <div className="card-body">
        {shouldRedirect(redirect)}
        <ShowImg item={product} url="products" />
        <p className="text-center"> Description: {product.description} </p>
        {/* .substring(0, 50)} to control the length of the description */}
        <p className="text-center black-10">Price: {product.price} € </p>
        <p className="black-9">
          Category: {product.category && product.category.name}
        </p>
        <p className="black-8">
          Added on {moment(product.createdAt).fromNow()}
        </p>
        <div className="d-lg-flex justify-content-evenly text-center">
          {showbutton()}
          {/* {showAddCart(showCartButton)} */}
          
          {showStock(product.quantity, showCartButton)}
          {showRemoveButton(showRemoveProductButton)}
          {showCartUpdateOptions(cartUpdate)}
        </div>
      </div>
    </div>
  );
};

export default Card;
