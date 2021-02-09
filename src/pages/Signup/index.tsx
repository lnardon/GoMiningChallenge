import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import styles from "./styles.module.scss";
import useValidation from "../../hooks/useValidation";

const Signup: React.FC = () => {
  useValidation();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handleSignup = async () => {
    let response = await fetch("http://3.137.211.94:5000/v1/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    });
    let p = await response.text();
    console.log(response, p);
    if (response.status === 201) {
      history.push("/dashboard");
    } else {
      alert("Server error!");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.contentContainer}>
        <h1>Sign up</h1>
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
          <label className={styles.inputLabel} htmlFor="email">
            Email
          </label>
          <input
            className={styles.input}
            type="text"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={styles.inputDiv}>
          <label className={styles.inputLabel} htmlFor="password">
            Password
          </label>
          <input
            className={styles.input}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className={styles.btn} onClick={handleSignup}>
          Sign up
        </button>

        <div className={styles.signUpDiv}>
          <h4>Already have an account?</h4>
          <h4>Click to here sign in</h4>
        </div>
      </div>
    </div>
  );
};

export default Signup;
