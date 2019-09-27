import React, {useState, useEffect} from "react";
import  "./styles/poll.css";
import {withRouter} from 'react-router'
import OptionButton from '../Components/option-button'
import ResultButton from '../Components/result-button'
import ProgressBar from "../Modal/progress-bar";
import AlertModalFail from "../Modal/alert-modal-fail";
const Poll = (props) => {
  const [data, setData] = useState({
    title:'',
    options: []
  })
  const [showModalFail, setShowModalFail] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userVerified, setUserVerified] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);
  const [totalVotes, setTotalVotes] = useState(0);

  const handleShowModalFail = () =>{
    setShowModalFail(false)
    props.history.push('/')
  }
  const [errorMsg, setErrorMsg] = useState('')

  const getOption = (value) =>{
    sendPoll(props.match.params.id, value)
  }

  const sendPoll =(id, value) =>{
    const token = localStorage.getItem('auth-id')
    setIsLoading(true)
    fetch(`https://pollserver.herokuapp.com/polls/${id}/${value}`, {
      method: "PUT",
      mode: "cors",
      headers:{
        'authorization': token
      }
    }).then(data => {
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
        setIsLoading(false)
        props.history.push(`/polls/${id}`)
        sendData(id)
      }
    })
  }
  useEffect(() =>{
    if(!localStorage.getItem('auth-id')){
      props.history.push('/login')
    }
    const token = localStorage.getItem('auth-id')
    setIsLoading(true)
    fetch(`https://pollserver.herokuapp.com/current/`, {
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
        data.json().then(data => setUserVerified(data.isVerified))
        sendData(props.match.params.id)
      }
    })
  }, [])

  const sendData = (id) => {
    const token = localStorage.getItem('auth-id')
    setIsLoading(true)
    fetch(`https://pollserver.herokuapp.com/polls/${id}`, {
      method: "GET",
      mode: "cors",
      headers:{
        'authorization': token
      }
    })
      .then(_data => {
        setIsLoading(false);
        if (_data.status === 500) {
          setShowModalFail(true);
          setErrorMsg('Poll you are requesting for does not exist.')
        }else if(_data.status === 600){
          setShowModalFail(true);
          setErrorMsg('You are not authroized. Your account is probably not verified')
        }
        else{
          _data.json().then(__data =>{
            setData(__data.poll)
            setHasVoted(__data.hasVoted)
            let i = 0
            for(let requiredData of __data.poll.options){
              i = i + requiredData.users.length
            }
            setTotalVotes(i)

        });
        }
      })
      .catch(error => console.log(error));
  };
  return (
    <div className="poll-root">
      <div className="poll-hero">
        <h2>{data.title}</h2>

        <section style={{marginTop: '20px'}}>
        {hasVoted ? data.options.map((item, key) => <ResultButton totalVotes={totalVotes} key={key} value={item}  />) : data.options.map((item, key) => <OptionButton key={key} value={item.value} setOption={getOption} />)}
        </section>
      </div>
      <p style={{color: 'white'}}>Total votes: {totalVotes}</p>
      {showModalFail ? (
          <AlertModalFail msg={errorMsg} handleShowModalFail={handleShowModalFail} />
        ) : null}
      {isLoading ? <ProgressBar /> : null}
    </div>
  );
};

export default withRouter(Poll);
