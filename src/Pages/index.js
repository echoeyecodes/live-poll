import React, { useState, useEffect } from "react";
import AddOptionButton from "../Components/add-option-button";
import CreateOptionField from "../Components/create-option-field";
import ConfirmButton from "../Components/confirm-button";
import ShamButton from "../Components/sham-button";
import "./styles/index.css";
import {withRouter} from 'react-router'
import AlertModal from '../Modal/alert-modal'
import ProgressBar from '../Modal/progress-bar'
import AlertModalFail from '../Modal/alert-modal-fail'
const Index = (props) => {
  let [options, setOptions] = useState([]);
  let [valid, setValid] = useState(false);
  let [title, setTitle] = useState("");


  const[showModal, setShowModal] = useState(false)
  const[showModalFail, setShowModalFail] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [pollLink, setPollLink] = useState(null)

  const handleShowModal = () =>{
    setShowModal(false)
    if(pollLink){
      props.history.push(`/polls/${pollLink}`)
    }
  }
  const handleShowModalFail = () =>{
    setShowModalFail(false)
    props.history.push('/login')
  }

  const addOption = () => {
    options.push({
        value: "",
        users: []
    });
    setOptions([...options]);
    handleValidation();
  };
  const setPollTitle = evt => {
    title = evt.target.value;
    setTitle(title);
    handleValidation();
  };
  const setValue = (index, value) => {
    if(value.length > 15){
      alert('Limit passed')
      return
    }
    options[index] = value;
    setOptions([...options]);
    handleValidation();
  };

  const handleValidation = () => {
    if (options.length <= 1) {
      setValid(false);
      return
    }
    for (let i of options) {
      if (i.value === "" || title === "") {
        setValid(false);
        return
      }
      setValid(true);
    }
  };

  useEffect(() =>{
    if(!localStorage.getItem('auth-id')){
      props.history.push('/login')
    }
    const token = localStorage.getItem('auth-id')
    setIsLoading(true)
    fetch(`https://pollserver.herokuapp.com/current`, {
      method: "GET",
      mode: "cors",
      headers:{
        'authorization': token
      }
    }).then(data => {
      setIsLoading(false)
      if(data.status === 600){
        setShowModalFail(true);
        setErrorMsg('You are not logged in')
      }else if(data.status === 700){
        setShowModalFail(true);
        setErrorMsg('User has been deleted from the server')
      }else if(data.status === 400){
        setShowModalFail(true);
        setErrorMsg('Invalid User. Please log in again')
      }
      else{
       
      }
    })
  }, [])

  const sendData = (evt) =>{
    evt.preventDefault()
    const token = localStorage.getItem('auth-id')
    setIsLoading(true)
     fetch('https://pollserver.herokuapp.com/create', {
       method: 'POST',
       mode: 'cors',
      headers:{
        'content-type': 'application/json',
        'authorization': token
      },
      body:JSON.stringify({
        title: title,
        options: options
      })
     }).then(data =>{
       setIsLoading(false)
       if(data.status === 400){
        setShowModalFail(true)
        setErrorMsg("You're not authorized")
       }else if(data.status === 406){
        setShowModalFail(true)
        setErrorMsg("You are not verified")
       }else if(data.status === 600){
        setShowModalFail(true)
        setErrorMsg("Not authorized")
       } else{
         setErrorMsg('A link for your campaign has been sent to your email! Share with others and decide on issues now!')
        setShowModal(true)
       }
       data.json().then(data => setPollLink(data._id))
     } ).catch(error => console.log(error))
  }

  useState(() =>{
    if(!localStorage.getItem('auth-id')){
      props.history.push('/login')
    }
    
  }, [])
  return (
    <div className="index-root">
      <div className="hero">
          <h1>
              Set up your campaign title and options and see your poll go live in seconds!
          </h1>
        <textarea
          onChange={setPollTitle}
          id="set-title"
          placeholder="Write something"
        />
        {options.map((item, index) => {
          return <CreateOptionField onInput={setValue} index={index} />;
        })}
        <AddOptionButton onAdd={addOption} />
        {valid ? <ConfirmButton send={sendData} /> : <ShamButton />}

        
        {isLoading ? <ProgressBar /> : null}
        {showModalFail ? <AlertModalFail msg={errorMsg} handleShowModalFail={handleShowModalFail} /> : null}
        {showModal ? <AlertModal msg={errorMsg} handleShowModal={handleShowModal}/> : null}
      </div>
    </div>
  );
};

export default withRouter(Index);
