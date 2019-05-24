import React, { Component } from 'react'
import { Table, Checkbox, Loader } from 'semantic-ui-react'
import axios from 'axios'
import { FormattedMessage } from "react-intl"


export default class CreateRevisionPage extends Component {

  state = {
    companyName: "Loading",
    loading: true,
    data: [],
    checked: [],
    newRevisionSubscription:[],
    newRevisionName: "",
  };

  componentDidMount = () => {
    axios.get('http://localhost:8080/lagbevakning/subscription/newrevision').then(response => {
      this.setState(state =>{
       const companyName = response.data[0].companyItem.companyName;
       const loading = false;
       const data = response.data;
       const checked = new Array(data.length).fill(false);
       return {companyName, loading, data, checked};
      });
      console.log(this.state.checked);
      /* console.log(response.data) */
    })
  };


  createRevision(){
    const newRevision ={
      name: this.state.newRevisionName,
      subscriptionIds: this.state.newRevisionSubscription,
      customLawIds:[],
    }
    axios.post('http://localhost:8080/lagbevakning/revision', newRevision).then(response =>{
      console.log(response);
        console.log("hello")
        window.location = "/revisions/ongoing/editrevision/" + response.data

    }).catch(error=>{
      console.log(error.response)
    })

  }

  handleName(event) {
    /*  this.setState({value: event.target.value}); */
    this.setState({[event.target.name]: event.target.value})
    console.log(this.state.newRevisionName);
  }


  handleCheckbox(law, index){
    if(this.state.checked[index] !== true) {
      this.setState(state =>{
        const checked = this.state.checked;
        checked[index] = true;
        console.log(checked[index]);
        const newRevisionSubscription = this.state.newRevisionSubscription;
        newRevisionSubscription.push(this.state.data[index].id)
        console.log(newRevisionSubscription);
        return {checked, newRevisionSubscription};
      });
      console.log(this.state.checked[index]);
    }
    else{
      this.setState(state =>{
        const checked = this.state.checked;
        const newRevisionSubscription = this.state.newRevisionSubscription;
        for(var i = 0; i < newRevisionSubscription.length; i++){
          if(newRevisionSubscription[i] === this.state.data[index].id){
            newRevisionSubscription.splice(i,1);
            i--;
          }
        }
        checked[index] = false;
        console.log(newRevisionSubscription);
        return {checked, newRevisionSubscription};
      });
    }
    console.log(this.state.checked);

  }

  createRevisionButton(){
    return(
      <div>
        <label><FormattedMessage id="createRevisionPage.newName"/></label>
        <input
          value={this.state.newRevisionName}
          type="text"
          name="newRevisionName"
          onChange={this.handleName.bind(this)}/>
        <button disabled={this.state.newRevisionSubscription.length === 0 || this.state.newRevisionName.length === 0} onClick={this.createRevision.bind(this)}>
          <FormattedMessage id="createRevisionPage.createButton"/>
        </button>
      </div>
    )
  }

  data(props) {
    return(
      <div>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell></Table.HeaderCell>
              <Table.HeaderCell><FormattedMessage id="lawList.index"/></Table.HeaderCell>
              <Table.HeaderCell><FormattedMessage id="lawList.legislation"/></Table.HeaderCell>
              <Table.HeaderCell><FormattedMessage id="lawList.requirements"/></Table.HeaderCell>
              <Table.HeaderCell><FormattedMessage id="lawList.status"/></Table.HeaderCell>
              <Table.HeaderCell><FormattedMessage id="lawList.latestRevision"/></Table.HeaderCell>
              <Table.HeaderCell><FormattedMessage id="lawList.underAudit"/></Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          {props.map((law, index) => (
            <Table.Body key={index}>
              <Table.Row>
                <Table.Cell>
                <Checkbox
                  name={law.lawDTO.name}
                  checked={this.state.checked[index]}
                  onChange={this.handleCheckbox.bind(this, law, index)}/>
                </Table.Cell>
                <Table.Cell>{index + 1}</Table.Cell>
                <Table.Cell>{law.lawDTO.name}</Table.Cell>
                <Table.Cell>{law.text}</Table.Cell>
                <Table.Cell>{law.status}</Table.Cell>
                <Table.Cell>{new Date(law.latestRevisionDate).toISOString().substring(0, 10)}</Table.Cell>
                <Table.Cell>placeholder</Table.Cell>
              </Table.Row>
            </Table.Body>
          ))}

        </Table>
      </div>
    )
  }

  render() {
    return(
      <div>
        {this.state.loading || !this.state.companyName
          ? <div>     
               <Loader size='massive' active inverted>Loading</Loader>
            </div>
          : <div>
            <h1> Listar laglista för {this.state.companyName} </h1>
            {this.createRevisionButton()}
            <h3> <br/> {this.data(this.state.data)} </h3>
            {this.createRevisionButton()}
          </div>}


      </div>
    )}
}