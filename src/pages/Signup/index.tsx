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
    if (response.status === 201) {
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
    } else {
      alert("Server error!");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.contentContainer}>
        <h1 className={styles.title}>Sign up</h1>
        <div className={styles.inputDiv}>
          <label className={styles.inputLabel} htmlFor="username">
            Username:
          </label>
          <input
            className={styles.input}
            type="text"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className={styles.inputDiv}>
          <label className={styles.inputLabel} htmlFor="email">
            Email:
          </label>
          <input
            className={styles.input}
            type="text"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={styles.inputDiv}>
          <label className={styles.inputLabel} htmlFor="password">
            Password:
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

        <button className={styles.signupBtn} onClick={() => history.push("/")}>
          Sign In
        </button>
      </div>
    </div>
  );
};

export default Signup;
