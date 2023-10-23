import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loginUser, registerUser } from "../../redux/slices/userSlice";
import { redirect, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "./Login.css";

const MySwal = withReactContent(Swal);

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [userLogin, setUserLogin] = useState({});
  const [userRegister, setUserRegister] = useState({ isAdmin: false });
  const handleLogin = (e) => {
    console.log(userLogin);
    dispatch(loginUser(userLogin));
  };
  const handleRegister = (e) => {
    console.log(userRegister);
    dispatch(registerUser(userRegister));
  };

  useEffect(() => {
    if (user.error) {
      MySwal.fire({
        icon: "error",
        title: "Oops...",
        text: `${user.error}`,
      });
    } else if (user.loggedUser.username) {
      console.log(user.loggedUser);
      localStorage.setItem(
        "token",
        JSON.stringify({
          login: true,
          id: user.loggedUser.id,
          username: user.loggedUser.username,
          isAdmin: user.loggedUser.isAdmin,
        })
      );
      navigate("/posting");
      window.location.reload(true);
    } else if (user.message) {
      MySwal.fire({
        icon: "info",
        confirmButtonText: "OK",
        title: `${user.message.message}`,
        text: `${user.message.user.username} your data has been added to server`,
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload(true);
        }
      });
    }
  }, [user]);


  return (
    <>
      <div className="container container-login py-5">
        <div className="row full-height justify-content-center">
          <div className="col-12 text-center">
            <div className="section pb-5 pt-5 pt-sm-2 text-center">
              <h6 className="mb-0 pb-3">
                <span>Log In </span>
                <span>Sign Up</span>
              </h6>
              <input className="checkbox-login" type="checkbox" id="reg-log" name="reg-log" />
              <label htmlFor="reg-log"></label>
              <div className="card-3d-wrap mx-auto">
                <div className="card-3d-wrapper">
                  <div className="card-front">
                    <div className="center-wrap">
                      <div className="section text-center">
                        <h4 className="mb-4 pb-3">Log In</h4>
                        <div className="form-group">
                          <input
                            type="username"
                            name="username"
                            className="form-style"
                            placeholder="Your Username"
                            onChange={(e) => setUserLogin({ ...userLogin, username: e.target.value })}
                          />
                          <i className="input-icon uil uil-user"></i>
                        </div>
                        <div className="form-group mt-2">
                          <input
                            type="password"
                            name="logpass"
                            className="form-style"
                            placeholder="Your Password"
                            onChange={(e) => setUserLogin({ ...userLogin, password: e.target.value })}
                          />
                          <i className="input-icon uil uil-lock-alt"></i>
                        </div>
                        <button className="btn-login mt-4" type="button" onClick={(e) => handleLogin(e)}>
                          Login
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="card-back">
                    <div className="center-wrap">
                      <div className="section text-center">
                        <h4 className="mb-4 pb-3">Sign Up</h4>
                        <div className="form-group">
                          <input
                            type="username"
                            name="username"
                            className="form-style"
                            placeholder="Your Username"
                            onChange={(e) => setUserRegister({ ...userRegister, username: e.target.value })}
                          />
                          <i className="input-icon uil uil-user"></i>
                        </div>
                        <div className="form-group mt-2">
                          <input
                            type="password"
                            name="logpass"
                            className="form-style"
                            placeholder="Your Password"
                            onChange={(e) => setUserRegister({ ...userRegister, password: e.target.value })}
                          />
                          <i className="input-icon uil uil-lock-alt"></i>
                        </div>
                        <button className="btn-login mt-4" onClick={(e) => handleRegister(e)}>
                          Sign Up
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
