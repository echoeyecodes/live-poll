import React, {useState, useEffect} from "react";
import "./styles/signup.css";
import {Link} from 'react-router-dom'
import {withRouter} from 'react-router-dom'
import AlertModal from '../Modal/alert-modal'
import ProgressBar from '../Modal/progress-bar'
import AlertModalFail from '../Modal/alert-modal-fail'
const Signup = (props) => {
  const[body, setBody] = useState({
    email:"",
    username: "",
    password: ""
  })
  const[showModal, setShowModal] = useState(false)
  const[showModalFail, setShowModalFail] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const setParameters = (evt) =>{
    body[evt.target.name] = evt.target.value
    setBody(body)
  }
  const handleShowModal = () =>{
    setShowModal(false)
    props.history.push('/login')
  }
  const handleShowModalFail = () =>{
    setShowModalFail(false)
    props.history.push('/signup')
  }
  const signup = (evt) =>{
    evt.preventDefault()
    setIsLoading(true)
     fetch('https://pollserver.herokuapp.com/user', {
       method: 'POST',
       mode: 'cors',
      headers:{
        'content-type': 'application/json'
      },
      body:JSON.stringify(body)
     }).then(data =>{
       setIsLoading(false)
       const token = (data.headers.get('your-access-token'))
       if(!token){
         setErrorMsg('Unable to log in. Please try again')
        setShowModalFail(true)
       } else{
        setErrorMsg("An email has been sent to verify your account. You won't be able to particapte without verification.")
        setShowModal(true)
       }
      data.json().then(data => console.log(data))
     } ).catch(error => console.log(error))
  }
  return (
    <div className="signup-root">
      <form className="signup-hero">
        <h1>Register an account</h1>
        <p>Username:</p>
        <input onChange={setParameters} name='username' type="name" placeholder="Username" />
        <p>Email:</p>
        <input onChange={setParameters} name='email' type="mail" placeholder="Email" />
        <p>Password:</p>
        <input onChange={setParameters}  name='password' type="password" placeholder="Password" />

        <button onClick={signup}>Create</button>

        <Link to='/login'>I already have an account</Link>

        {isLoading ? <ProgressBar /> : null}
        {showModalFail ? <AlertModalFail handleShowModalFail={handleShowModalFail} /> : null}
        {showModal ? <AlertModal msg={errorMsg} handleShowModal={handleShowModal}/> : null}
       
      </form>
    </div>
  );
};

export default withRouter(Signup);
