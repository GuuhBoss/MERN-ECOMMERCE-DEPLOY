import React, { useState } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { createCategory } from "./apiAdmin";


const AddCategory = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  //destructure user and token from localstorage

  const { user, token } = isAuthenticated();

  const handleChange = (e) => {
    setError("");
    setName(e.target.value);
  };

  const clickSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    //make request to api to create a category
    createCategory(user._id, token, { name }).then((data) => {
     console.log(data)
      if (data.error) {
        setError(true);
      } else {
        setError("");
        setSuccess(true);
      }
    });
  };

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      <h3> Category should be unique </h3>
    </div>
  );

  const showSuccess = () =>
    success && (
      <div className="alert alert-success">
        <h3>{name} was created</h3>
      </div>
    );

  const goBack = () => (
    <div className="mt-5">
      <Link to="/admin/dashboard" className="text-warning">
        Back to Dashboard
      </Link>
    </div>
  );

  const newCatergory = () => (
    <div className="row">
      <div className="col-md-8 offset-md-2">
        <form>
          <div className="form-group">
            <label className="text-mute"></label>
            <input
              type="text"
              className="form-control"
              onChange={handleChange}
              value={name}
              autoFocus
              required
            />
            <button
              className="btn btn-outline-primary mt-2"
              onClick={clickSubmit}
            >
              Create Category
            </button>
          </div>
        </form>
      </div>
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
      {newCatergory()}
      {goBack()}
    </Layout>
  );
};

export default AddCategory;
