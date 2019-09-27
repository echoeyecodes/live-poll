import React from 'react'
import './styles/result-button.css'
const ResultButton = (props) =>{
    let rate = props.value.users.length
    let totalVote = props.totalVotes
    let realRate
    if(totalVote ===0){
        realRate = 0
    }
    realRate = (rate/totalVote) * 100
    
    return (
        <div style={{margin: '30px'}}>
            <div>
            <p style={{ margin: "0px", fontSize: "14px", color: 'white' }}>
          {props.value.value}
        </p>
        <div
          style={{
            width: "200px",
            borderRadius: "5px",
            border: '1px #ffffff solid',
            padding: '0px',
            height: "40px",
            position: 'relative',
            margin: "10px auto 0px auto",
          }}
        >
        <p style={{position: 'absolute', left: '85px', top: '5px', color: 'white'}}>{realRate}%</p>
          <div
            style={{
              width: `${realRate}%`,
              borderRadius: "5px",
              color: "white",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#ff0084",
              height: "39px",
            }}
          >
           
          </div>
        </div>
            </div>
           
        </div>
    )
}

export default ResultButton