import React, { Component } from 'react'
import {Table } from 'semantic-ui-react'
import axios from 'axios/index'
import { Loader } from 'semantic-ui-react'
import "./EditRevision.css"
import ConfirmationModal from "../../../component/modal/ConfirmationModal"

export default class EditRevision extends Component {

  state = {
      loading: true,
      data: {},
      subscriptions: [],
      customColumns: [],
      showCustomColumn1: false,
      showCustomColumn2: false,
      showCustomColumn3: false,
      showCustomColumn4: false,
      showCustomColumn5: false
  }

  componentDidMount = () => {
    axios.get('http://localhost:8080/lagbevakning/revision/subscriptions?id=' + (this.props.match.params.id)).then(response => {
      this.setState({
        data: response.data,
        subscriptions: response.data.subscriptionRevisionDTOS,
        loading: false
      })
    })

    axios.get('http://localhost:8080/lagbevakning/company').then(response2 => {
      this.setState({
        customColumns: response2.data,
        showCustomColumn1: response2.data.customHeaderName1 !== null,
        showCustomColumn2: response2.data.customHeaderName5 !== null,
        showCustomColumn3: response2.data.customHeaderName5 !== null,
        showCustomColumn4: response2.data.customHeaderName5 !== null,
        showCustomColumn5: response2.data.customHeaderName5 !== null
      })
    })
  }

  displayCustomTitle = (titleInput) => {
    if(titleInput === null) {
      return
    } else {
      return <Table.HeaderCell>{titleInput}</Table.HeaderCell>
    }
  }

  displayCustomColumn = (columnInput) => {
    if(columnInput === null) {
        return
    } else {
      if(columnInput.length <= 0) {
        return <Table.Cell></Table.Cell>
      } else {
        return <Table.Cell>{columnInput.replace(/(<([^>]+)>)/ig,"")}</Table.Cell>
      }
    }
  }

  moveToFinished = () => {
    axios.put('http://localhost:8080/lagbevakning/revision/finish?id=' + this.props.match.params.id, {
    })
    .then((response) => {
      console.log(response)
        alert("post was ok")
       
    })
    .catch(function (error) {
      console.log(error)
        alert("something went wronggggggggggggg")
    })
    window.location = "/revisions/finished"
  }

  displayList = () => {
    return (
      <div>
        <Table celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell> Law </Table.HeaderCell>
                  <Table.HeaderCell> Genre </Table.HeaderCell>
                  <Table.HeaderCell> Business Significance </Table.HeaderCell>
                  {this.state.showCustomColumn1 && this.displayCustomTitle(this.state.customColumns.customHeaderName1)}
                  {this.state.showCustomColumn2 && this.displayCustomTitle(this.state.customColumns.customHeaderName2)}
                  {this.state.showCustomColumn3 && this.displayCustomTitle(this.state.customColumns.customHeaderName3)}
                  {this.state.showCustomColumn4 && this.displayCustomTitle(this.state.customColumns.customHeaderName4)}
                  {this.state.showCustomColumn5 && this.displayCustomTitle(this.state.customColumns.customHeaderName5)}
                  <Table.HeaderCell> Status </Table.HeaderCell>
                </Table.Row>
              </Table.Header>

            {this.state.subscriptions.map((item, i) => (
              <Table.Body key={i}>
                <Table.Row>
                  <Table.Cell>{item.lawName}</Table.Cell>
                  <Table.Cell>{item.lawGroupName}</Table.Cell>
                  <Table.Cell>{item.importanceForCompany.replace(/(<([^>]+)>)/ig,"")}</Table.Cell>
                  {this.state.showCustomColumn1 && this.displayCustomColumn(item.getCustomColumnText1)}
                  {this.state.showCustomColumn2 && this.displayCustomColumn(item.getCustomColumnText2)}
                  {this.state.showCustomColumn3 && this.displayCustomColumn(item.getCustomColumnText3)}
                  {this.state.showCustomColumn4 && this.displayCustomColumn(item.getCustomColumnText4)}
                  {this.state.showCustomColumn5 && this.displayCustomColumn(item.getCustomColumnText5)}
                  <Table.Cell>  {item.status} 
                     {<ConfirmationModal lawName={item}/>}
                {     console.log("ska stämma med denna" + item.revisionId)}
                 </Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
        </Table>
      </div>
   )}





  render() {
   
    return (
      <div>
        {this.state.loading
            ? <div> <Loader size='massive' active inverted>Loading</Loader> </div>
            :
           <h2> Company  Name:   {this.state.customColumns.companyName} <br/> 
                Revision Name:   {this.state.data.name}   <br/> 
                  Revision ID:   {this.state.data.id}     </h2>
        }
           {this.displayList()}
           <button onClick={this.moveToFinished}>Avsluta Revision</button>

           
      </div>
    )}
}
