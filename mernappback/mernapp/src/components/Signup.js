import React, { useState } from "react";
import "./css/Signup.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [name,setname] =useState()
  const [email,setemail] =useState()
  const [pass, setpass] = useState()
  const nav=useNavigate()
  const handleSubmit = async(e) => {
    // e.preventDefault()
    // const res = await axios.post('http://localhost:5000/reg_post', { name, email, pass })    
    // if (res.data.status==="ok") {
    //   alert("Registration Successful")
    //   nav("/")
    // }
    // else if (res.data.status === "exist") {
    //   alert("Email already exists")
    // }
    // else {
    //   alert("Registration Failed")
    // }
     e.preventDefault();
  try {
    const res = await axios.post('http://localhost:5000/reg_post', {
      name,
      email,
      pass
    });

    if (res?.data?.status === "ok") {
      alert("Registration Successful");
      nav("/");
    } else if (res?.data?.status === "exist") {
      alert("Email already exists");
    } else {
      alert("Registration Failed");
    }
  } catch (error) {
    console.error("Error during registration:", error);
    alert("Something went wrong. Please try again.");
  }
  }
  return (
    <div className="registration-container d-flex justify-content-center align-items-center vh-100">
      <div className="registration-card shadow-lg p-4">
        <h3 className="text-center mb-4 fw-bold">Create an Account</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Full Name
            </label>
            <input
              type="text"
              onChange={(event) =>setname(event.target.value)}
              className="form-control custom-input"
              id="name"
              placeholder="Enter your full name"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email Address
            </label>
            <input
              type="email"
              onChange={(e)=>setemail(e.target.value)}
              className="form-control custom-input"
              id="email"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              onChange={(e)=>setpass(e.target.value)}
              className="form-control custom-input"
              id="password"
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[*@#$%^&+=]).{8,}" 
              title="Must contain at least one number, one uppercase and lowercase letter, one special character, and at least 8 or more characters"
              placeholder="Create a password"
            />
          </div>
          <div className="d-grid gap-2">
            <button type="submit" className="btn custom-btn">
              Register
            </button>
          </div>
        </form>
        <p className="text-center mt-3">
          Already have an account? <a href="/" className="text-decoration-none">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
