import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../Firebase";

export default function Login() {
  const [err, setErr] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      setErr(true);
    }
  };

  return (
    <>
      <div className="formcontainer">
        <div className="formwrapper">
          <h4 className="text-center">LamaChat</h4>
          <form action="" onSubmit={handleSubmit}>
            <input type="email" name="" id="" placeholder="Email" />
            <input type="password" name="pwd" id="" placeholder="password" />
            <button class="Navbar-button" type="submit">
              SignIn
            </button>
          </form>
          <p className="loginMsg">
            Don't have an Account?<Link to="/register">Register</Link>
          </p>
          {err && <span>Something Went Wrong</span>}
        </div>
      </div>
    </>
  );
}
