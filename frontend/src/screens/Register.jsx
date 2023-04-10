import { useEffect, useState } from "react";
import FormContainer from "../components/FormContainer";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { getlocalStorage, GetFormlocalStorage } from "../utils/LocalStorage";
const Register = () => {
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirnPassword, setConfirnPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (GetFormlocalStorage("userInfo")) return navigate("/");
  }, [navigate]);

  const usrRegsiterApi = async (name, email, password) => {
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/auth/register",
        { name, email, password }
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
    if (!name || !email || !password) return;
    if (password !== confirnPassword) {
      setError("Your password and confirn password do not match");
      setTimeout(() => {
        setError("");
      }, 5000);
      return;
    }
    usrRegsiterApi(name, email, password);
  };
  return (
    <FormContainer>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="col-lg-5 col-sm-8 cl-auto mx-auto shadow-sm p-5">
          {error && (
            <div className="alert alert-danger text-center mb-3">{error}</div>
          )}
          <h1 className="text-center title">Register Form</h1> <hr />
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => setName(e.target.value)}
              id="name"
              aria-describedby="nameHelp"
              required
            />
          </div>
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
            <label htmlFor="confirnPassword" className="form-label">
              Confirn Password
            </label>
            <input
              type="password"
              className="form-control"
              onChange={(e) => setConfirnPassword(e.target.value)}
              id="confirnPassword"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="login">Already have an account? </label>
            <Link to="/login">Login</Link>
          </div>
          <button type="submit" className="btn btn-primary text-light w-100">
            Register
          </button>
        </div>
      </form>
    </FormContainer>
  );
};

export default Register;
