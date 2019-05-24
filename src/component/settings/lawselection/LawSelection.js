import React, { Component } from 'react'
import { Table, Checkbox } from 'semantic-ui-react'
import axios from 'axios'


export default class LawSelection extends Component {

  state = {
    companyName: "Loading",
    loading: true,
    laws: [],
    criteria:{inRegion:"se"},
    currentLaws:[],
    subscriptionList:[]
  };

  componentDidMount = () => {
    this.getLaws()
  };

  getLaws(){
    axios.get('http://localhost:8080/lagbevakning/subscription/lawselection').then(response => {
      this.setState(state =>{
        const loading = false;
        const laws = response.data;
        const currentLaws = response.data.slice(0,50);
        return {loading, laws, currentLaws};
      });
    })
  }

  updateSubscriptions(){
   console.log("I am supposed to update now");
   axios.post('http://localhost:8080/lagbevakning/subscription/update',this.state.subscriptionList).then(response => {
     this.setState({subscriptionList:[]})
     console.log(response);
     this.getLaws()
     console.log(this.state.subscriptionList)
   }).catch(error=>{
     console.log(error);
   })
  }

  handleCheckbox(index){
    if(this.state.currentLaws[index].subscribed !== true) {
      this.setState(state =>{
        const laws = this.state.laws;
        const currentLaws = this.state.currentLaws;
        currentLaws[index].subscribed = true;
        for(var i = 0; i < laws.length; i++){
          if(currentLaws[index].id === laws[i].id){
            laws[i].subscribed = true;
            break;
          }
        }
        return {currentLaws, laws};
      });
      this.updateSubscriptionList(index,true)
    }


    else{
      this.setState(state =>{
        const currentLaws = this.state.currentLaws;
        const laws = this.state.laws;
        for(var i = 0; i < laws.length; i++){
          if(currentLaws[index].id === laws[i].id){
            laws[i].subscribed = false;
            break;
          }
        }
        currentLaws[index].subscribed = false;
        return {currentLaws, laws};
      });
      this.updateSubscriptionList(index,false)
    }
  }
  updateSubscriptionList(index , subscribed){

    let duplicate = false;
    let subscriptionList = this.state.subscriptionList;
    for(var i = 0; i<this.state.subscriptionList.length; i++){
      console.log(i);
      if(this.state.subscriptionList[i].lawId===this.state.currentLaws[index].id){
        subscriptionList.splice(i,1)
        this.setState({subscriptionList: subscriptionList})
        duplicate = true;
      }
    }

    if(duplicate === false){
      subscriptionList.push({lawId:this.state.currentLaws[index].id,selected:subscribed,subscriptionId:this.state.currentLaws[index].subscriptionId});
      this.setState({subscriptionList: subscriptionList})
    }
    console.log(this.state.subscriptionList);

  }

  updateSubscriptionsButton(){
    return(
      <div>
        <button onClick={this.updateSubscriptions.bind(this)}>
          Update subscriptions
        </button>
      </div>
    )
  }


  browse(){
    return(
      <div>
    <button>1</button>
    <button>2</button>
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
              <Table.HeaderCell>Index</Table.HeaderCell>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Description</Table.HeaderCell>
              <Table.HeaderCell>Lawgroup</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          {props.map((law, index) => (
            <Table.Body key={index}>
              <Table.Row>
                <Table.Cell>
                  <Checkbox
                    name={law.name}
                    checked={this.state.currentLaws[index].subscribed}
                    onChange={this.handleCheckbox.bind(this, index)}/>
                </Table.Cell>
                <Table.Cell>{index + 1}</Table.Cell>
                <Table.Cell>{law.name}</Table.Cell>
                <Table.Cell>{law.description}</Table.Cell>
                <Table.Cell>{law.lawGroupName}</Table.Cell>
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
        {this.state.loading
          ? <div>Loading...</div>
          : <div>
            <h1> Listar laglista för {this.state.companyName} </h1>
            {this.updateSubscriptionsButton()}
            <h3> <br/> {this.data(this.state.currentLaws)} </h3>
            {this.updateSubscriptionsButton()}
          </div>}


      </div>
    )}
}