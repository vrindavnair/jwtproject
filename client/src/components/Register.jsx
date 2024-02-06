
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const onSubmitAll = (e) => {
    e.preventDefault();
    axios.post(`http://localhost:9001/api/register`, {
        name,
        email,
        password,
      })
      .then((res) => {
        navigate('/login');
      })
      .catch((err) => console.log(err));
   
  };

  const handleName = (e) => {
    let em = e.target.value;
    setName(em);
  };

  const handleEmail = (e) => {
    let em = e.target.value;
    setEmail(em);
  };

  const handlePassword = (e) => {
    let p = e.target.value;
    setPassword(p);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "10rem" }}>
      <h1>Register</h1>
      <form onSubmit={onSubmitAll}>
        <div>
          <input type="text" id="name" placeholder="Name" onChange={handleName} />
        </div>
        <br />
        <div>
          <input type="email" id="email" placeholder="Email" onChange={handleEmail} />
        </div>
        <br />
        <div>
          <input type="password" id="password" placeholder="Password" onChange={handlePassword} />
        </div>
        <br />
        <div style={{ display: 'flex', textAlign: "center", gap: "1rem", justifyContent: "center" }}>
          <button type="submit">Submit</button>
        </div>
      </form>
      <p>Already Have an Account</p>
      <Link to="/login" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">
        Login
      </Link>
    </div>
  );
};

export default Register;
