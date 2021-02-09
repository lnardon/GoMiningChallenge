import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import styles from "./styles.module.scss";
import useValidation from "../../hooks/useValidation";

const Login: React.FC = () => {
  useValidation();
  const [username, setUsername] = useState("lnardon");
  const [password, setPassword] = useState("test");
  const history = useHistory();

  const handleLogin = async () => {
    try {
      let response = await fetch("http://3.137.211.94:5000/v1/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      let parsedResponse = await response.json();
      localStorage.setItem("@jwt", parsedResponse.jwt);
      history.push("/dashboard");
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.contentContainer}>
        <h1>Login</h1>
        <div className={styles.inputDiv}>
          <label className={styles.inputLabel} htmlFor="username">
            Username
          </label>
          <input
            className={styles.input}
            type="text"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className={styles.inputDiv}>
          <label className={styles.inputLabel} htmlFor="username">
            Password
          </label>
          <input
            className={styles.input}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className={styles.btn} onClick={handleLogin}>
          Log In
        </button>

        <div className={styles.signUpDiv}>
          <h4>Doesn't have an account?</h4>
          <h4>Click to sign up</h4>
        </div>
      </div>
    </div>
  );
};

export default Login;
