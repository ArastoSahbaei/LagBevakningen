import React from "react";
import axios from "axios";
import Action from "./action/Action";
import "./ActionFeed.css"


class ActionFeed extends React.Component {

  state = {
    actions: [],
    objectAmount: 0
  }

  componentDidMount = () => {
    axios.get("http://localhost:8080/lagbevakning/action").then(response => {
      this.setState({ actions: response.data, objectAmount: response.data.length - 5 })
    })
  }

  renderAction(props) {
    let actions = []
    for(let i = 0; i<props.length;i++){
      actions.push(props[i])
      if(props[i].message === "REVISION_OPEN") {
        actions[i].headline = "Open Revision"
        actions[i].text = actions[i].name + " is still open"
      }

    else if(props[i].message === "SUBSCRIPTION_ASSESSMENT") {
        actions[i].headline = "Law Updated"
        actions[i].text = actions[i].name + " has been updated"
      }
     }
    return (
      props.map((action, index) => (
     <Action action={action} key={action.id} />
    ))
   )
  }

  render() {
    return (
      <div className="render">
        <div className="actionComponent">
        {this.renderAction(this.state.actions).slice(0, 5)}
        <p className="extraErrands">Another additional {this.state.objectAmount} remaining errands...</p>
        </div>
      </div>
    );
  }
}

export default (ActionFeed);