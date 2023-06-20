import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./style.module.css";
import axios from "axios";
import LoginNavBarGoGo from "../../navigatonBar/loginNav";
import Swal from "sweetalert2";

const SignIn = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = "http://localhost:5050/user/login";
      const { data: res } = await axios.post(url, data);
      localStorage.setItem("token", res.data);

      Swal.fire({
        title: "Success!",
        text: res.message,
        icon: "success",
        showConfirmButton: false,
      });

      // create session
      window.sessionStorage.setItem("loggeduser", JSON.stringify(res.user));

      setTimeout(() => {
        if (res.user.email === "kamal@gmail.com") {
          window.location = "/user-admin-dashboard";
        } else if (res.user.email === "tharinduadmin@gmail.com") {
          window.location = "/storeAdmindash";
        } else if (res.user.email === "dulshanalaha@gmail.com") {
          window.location = "/delivery-home";
        } else {
          window.location = "/userHome";
        }
      }, 2000);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  const registerButton = () => {
    window.location = "/registration";
  };

  const forgotpass = () => {
    window.location = "/forgot-password";
  };

  return (
    <div>
      <LoginNavBarGoGo />
      <div className={styles.login_container}>
        <div className={styles.login_form_container}>
          <div className={styles.left}>
            <form className={styles.form_container} onSubmit={handleSubmit}>
              <h1 style={{ marginTop: "-50px", marginBottom: "20px" }}>
                Login Here
              </h1>

              <label style={{ marginLeft: "-330px", fontWeight: "bold" }}>
                Email{" "}
              </label>
              <input
                type="email"
                placeholder="someone@gmail.com"
                name="email"
                onChange={handleChange}
                value={data.email}
                required
                className={styles.input}
              />

              <label style={{ marginLeft: "-300px", fontWeight: "bold" }}>
                Password{" "}
              </label>
              <input
                type="password"
                placeholder="Password"
                name="password"
                onChange={handleChange}
                value={data.password}
                required
                className={styles.input}
              />

              <p
                className={styles.form_p}
                onClick={forgotpass}
                style={{
                  textDecoration: "underline",
                  color: "Blue",
                  cursor: "pointer",
                  marginLeft: "110px",
                  alignSelf: "flex-start",
                  padding: "0 15px",
                  marginTop: "10px",
                }}
              >
                Forgot Password ?
              </p>

              {error && <div className={styles.err_msg}>{error}</div>}

              <button type="submit" className={styles.g_button}>
                Sign in
              </button>
            </form>
          </div>

          <div className={styles.right}>
            <h1
              style={{
                textAlign: "center",
                marginTop: "20px",
                marginBottom: "20px",
                fontSize: "36px",
              }}
            >
              Don't have an Account?
            </h1>

            <button
              type="button"
              onClick={registerButton}
              className={styles.w_button}
            >
              Sign up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
