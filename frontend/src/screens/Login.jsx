import { useEffect, useState } from "react";
import FormContainer from "../components/FormContainer";
import { Link, useNavigate } from "react-router-dom";
import { GetFormlocalStorage, getlocalStorage } from "../utils/LocalStorage";
import axios from "axios";
const Login = () => {
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (GetFormlocalStorage("userInfo")) return navigate("/");
  }, [navigate]);

  const usrLoginrApi = async (email, password) => {
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/auth/login",
        { email, password }
      );
      getlocalStorage("userInfo", data);
      return navigate("/");
    } catch (error) {
      setError(error?.response?.data?.error);
      return setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) return;
    usrLoginrApi(email, password);
  };
  return (
    <FormContainer>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="col-lg-5 col-sm-8 cl-auto mx-auto shadow-sm p-5">
          {error && (
            <div className="alert alert-danger text-center mb-3">{error}</div>
          )}
          <h1 className="text-center title">Login Form</h1> <hr />
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              aria-describedby="emailHelp"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="register">Don`t have an account? </label>
            <Link to="/register">Register</Link>
          </div>
          <button type="submit" className="btn btn-primary text-light w-100">
            Login
          </button>
        </div>
      </form>
    </FormContainer>
  );
};

export default Login;
