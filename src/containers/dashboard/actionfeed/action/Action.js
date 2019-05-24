import React from "react";
import "./Action.css"

function Action (props) {
  return (
    <div className="card">
                 <p className="headLine">{props.action.headline}</p>
                 <p className="notice">Urgent</p>
            <p className="date">{new Date(props.action.date).toISOString().substring(0, 10)} </p>
            <p className="textOfTestThis">{props.action.text} </p>
    </div>
  )


}

export default (Action)