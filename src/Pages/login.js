import React, { useState } from "react";
import "./styles/login.css";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import AlertModal from "../Modal/alert-modal";
import ProgressBar from "../Modal/progress-bar";
import AlertModalFail from "../Modal/alert-modal-fail";
const Login = (props) => {
  const [params, setParams] = useState({
    username: "",
    password: ""
  });
  const [errorMsg, setErrorMsg] = useState('')

  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showModalFail, setShowModalFail] = useState(false);
  const setParamsValue = evt => {
    params[evt.target.name] = evt.target.value;
    setParams(params);
  };

  const handleShowModal = () =>{
    setShowModal(false)
    props.history.push('/')
  }
  const handleShowModalFail = () =>{
    setShowModalFail(false)
  }

  const sendData = evt => {
    evt.preventDefault();
    setIsLoading(true)
    fetch(`https://pollserver.herokuapp.com/login?username=${params.username}&password=${params.password}`, {
      method: "GET",
      mode: "cors",
    })
      .then(data => {
        setIsLoading(false);
        const token = data.headers.get("your-access-token");
        if (data.status === 401) {
          setShowModalFail(true);
          setErrorMsg('No user exists with such credentials')
        }else if(data.status === 500){
          setShowModalFail(true);
          setErrorMsg('Invalid password')
        } else {
          setErrorMsg("You account has been authenticated on my server. Carry on!")
          setShowModal(true);
        }
        data.json().then(data =>{
            console.log(data)
            localStorage.setItem('auth-id', token)
        });
      })
      .catch(error => console.log(error));
  };
  return (
    <div className="login-root">
      <form className="login-hero">
        <h1>Log in</h1>
        <p>Username:</p>
        <input
          onInput={setParamsValue}
          type="name"
          name="username"
          placeholder="Username"
        />
        <p>Password:</p>
        <input
          onInput={setParamsValue}
          name="password"
          type="password"
          placeholder="Password"
        />

        <button onClick={sendData}>Login</button>
        {isLoading ? <ProgressBar /> : null}
        {showModalFail ? (
          <AlertModalFail msg={errorMsg} handleShowModalFail={handleShowModalFail} />
        ) : null}
        {showModal ? <AlertModal msg={errorMsg}  handleShowModal={handleShowModal} /> : null}
        <Link to="/signup">I don't have an account</Link>
      </form>
    </div>
  );
};

export default withRouter(Login);
