import React, { useEffect, useState } from "react";

const Verify = (props) => {
    const [msg, setMsg] = useState(null)

    const goHome =() =>{
        props.history.push('/')
    }
    useEffect(() =>{
        let id = props.match.params.id

        fetch(`http://localhost:3000/verify/user/${id}`, {
            method: "PUT",
            mode: "cors",
        }).then(data =>{
            if(data.status ===400){
            setMsg('Invalid user')
              return
            }
            data.json().then(data => setMsg('Account verified'))
        })
        })
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        color: "white",
        justifyContent: "center",
        minHeight: '100vh',
        alignItems: 'center'
      }}
    >
      <h2>{msg}</h2>

      <button onClick={goHome} style={{
          padding: '5px',
          border: 'none',
          color: 'white',
          backgroundColor: '#3cba54',
          cursor: 'pointer',
          borderRadius: '5px'
      }}>Go to Poll</button>
    </div>
  );
};

export default Verify;
