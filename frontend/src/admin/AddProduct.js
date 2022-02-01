import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
// import { Link } from "react-router-dom";
import { createProduct } from "./apiAdmin";
import { getCategories } from "./apiAdmin";

const AddProduct = () => {
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    categories: [],
    category: "",
    shipping: "",
    quantity: "",
    photo: "",
    loading: false,
    error: "",
    createdProduct: "",
    redirectToProfile: false,
    formData: "",
  });

  const { user, token } = isAuthenticated();

  const {
    name,
    description,
    price,
    categories,
    // category,
    // shipping,
    quantity,
    loading,
    error,
    createdProduct,
    // redirectToProfile,
    formData,
  } = values;

  useEffect(() => {
    //load categories and set form data
    const init = () => {
      getCategories().then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          setValues({ ...values, categories: data, formData: new FormData() });
        }
      });
    };
    init();
  }, []);

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const clickSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, error: "", loading: true });

    createProduct(user._id, token, formData).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: "",
          description: "",
          price: "",
          shipping: "",
          quantity: "",
          photo: "",
          loading: false,
          createdProduct: data.name,
        });
      }
    });
  };

  const newPostform = () => (
    <form className="mb-3" onSubmit={clickSubmit}>
      <h4>Post Photo</h4>
      <div className="form-group">
        <label className="btn btn-secondary">
          <input
            type="file"
            name="photo"
            accept="image/*"
            onChange={handleChange("photo")}
            required
          />
        </label>
      </div>

      <div className="form-group">
        <label className="text-muted"> Name </label>
        <input
          className="form-control"
          value={name}
          onChange={handleChange("name")}
          type="text"
          required
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Description</label>
        <textarea
          className="form-control"
          value={description}
          onChange={handleChange("description")}
          required
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Price</label>
        <input
          className="form-control"
          value={price}
          onChange={handleChange("price")}
          type="number"
          required
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Category</label>
        <select
          className="form-control"
          onChange={handleChange("category")}
          required
        >
          <option defaultValue>---- Please Select ----</option>
          {categories &&
            categories.map((c, i) => (
              <option key={i} value={c._id}>
                {c.name}
              </option>
            ))}
        </select>
      </div>

      <div className="form-group">
        <label className="text-muted"> Quantity </label>
        <input
          className="form-control"
          value={quantity}
          onChange={handleChange("quantity")}
          type="number"
          required
        />
      </div>

      <div className="form-group">
        <label className="text-muted"> Shipping </label>
        <select
          className="form-control"
          onChange={handleChange("shipping")}
          required
        >
          <option defaultValue>---- Please Select ----</option>
          <option value="0">No, its online!</option>
          <option value="1">Yes, there is!</option>
        </select>
      </div>
      <button className="btn btn-outline-primary">Create Product</button>
    </form>
  );

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      <h3> {error} </h3>
    </div>
  );

  const showSuccess = () =>
    createdProduct && (
      <div className="alert alert-success">
        <h3>{createdProduct} was created</h3>
      </div>
    );

  const showLoading = () =>
    loading && (
      <div className="alert alert-info">
        <h3>Loading...</h3>
      </div>
    );

  return (
    <Layout
      title="Add a new category"
      description={`G'day ${user.name}, ready to add a new category?`}
      className="container"
    >
      {showError()}
      {showSuccess()}
      {showLoading()}
      {newPostform()}
    </Layout>
  );
};

export default AddProduct;
