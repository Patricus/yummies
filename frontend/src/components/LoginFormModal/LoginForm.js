import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import "./LoginForm.css";

function LoginForm() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = e => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password })).catch(async res => {
      const data = await res.json();
      if (data && data.errors) setErrors(data.errors);
    });
  };

  const demoLogin = e => {
    e.preventDefault();
    const credential = "demo@user.io";
    const password = "password";
    return dispatch(sessionActions.login({ credential, password }));
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h2>Log In</h2>
        <ul id="errorList">
          {errors.map((error, idx) => (
            <li className="error" key={idx}>
              {error}
            </li>
          ))}
        </ul>
        <label>
          Username or Email
          <input
            type="text"
            value={credential}
            onChange={e => setCredential(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </label>
        <div className="buttons">
          <button type="button" onClick={demoLogin}>
            Login as Demo User
          </button>
          <button type="submit">Log In</button>
        </div>
      </form>
    </>
  );
}

export default LoginForm;
