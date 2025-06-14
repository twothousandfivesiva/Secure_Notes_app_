import React, { useState } from "react";
import "./css/App.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Login = () => {

    const [name,setname] =useState()
    const [pass, setpas] = useState()
    const nav = useNavigate()
    const handleSubmit = async(e) => {
      e.preventDefault()
      try {
        const res = await axios.post("http://localhost:5000/login_post", { name, pass })
        console.log(res);
      
        if (res.data.status === "ok") {
          sessionStorage.setItem("uid", res.data.lid)
          nav('/Dashboard')
          alert("Welcome")
        }
        else {
          alert("Invalid Credentials")
        }
        
      } catch (error) { 
        if (error.response.status === 429) {
          alert('Too many login attempts. Please wait and try again later.');
        }
      }
            
    }
  return (
    <div className="login-container d-flex justify-content-center align-items-center vh-100">
      <div className="login-card shadow-lg p-4">
        <h3 className="text-center mb-4 fw-bold">Welcome Back</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email Address
            </label>
            <input
              type="email"
              onChange={(e) =>setname(e.target.value)}
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
              onChange={(e) =>setpas(e.target.value)}
                          
              className="form-control custom-input"
              id="password"
              placeholder="Enter your password"
            />
          </div>
          <div className="d-grid gap-2">
            <button type="submit" className="btn custom-btn">
              Login
            </button>
          </div>
        </form>
        <p className="text-center mt-3">
          Don’t have an account? <a href="/Signup" className="text-decoration-none">Register</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
