import React, { Component } from 'react'
import { Button, Modal } from 'semantic-ui-react'
import { Form, TextArea, Dropdown } from 'semantic-ui-react'
import axios from "axios"
import "./ConfirmationModal.css"

const options = [
  { value: 'NO_VALUE', text: 'NO_VALUE'},
  { value: 'NOT_ACCEPTED', text: 'NOT_ACCEPTED'},
  { value: 'OBSERVATION', text: 'OBSERVATION'},
  { value: 'ACCEPTED', text: 'ACCEPTED'},
  { value: 'NOT_RELEVANT', text: 'NOT_RELEVANT' },
 ]
 export default class ConfirmationModal extends Component {
  
  state = {
    textValue: '',
    listValue: 'Status',
    options,
    value: '',
    open: false
    }

  dropDownList = () => <Dropdown className="dropList" placeholder={this.state.listValue} onChange={this.handleListChange} clearable options={options} selection />

  handleListChange = (event, {value}) => {
    this.setState({ value })
    console.log(value)
  }

  textArea = () => (
    <Form className="textForm">
      <TextArea placeholder='Skriv en kommentar...' onChange={this.handleTextChange.bind(this)} />
      {console.log(this.state.textValue)}
    </Form>
  )

  handleTextChange(event)  {
      this.setState({textValue: event.target.value})
  }

    moveToFinished = () => {
      axios.put('http://localhost:8080/lagbevakning/revision/finish?id=' + this.props.lawName.revisionId, {
      })
      .then((response) => {
        console.log(response)
          alert("post was ok")
         
      })
      .catch(function (error) {
        console.log(error)
          alert("something went wronggggggggggggg")
      })
    }
  

  saveOnClick = () => {
    axios.put('http://localhost:8080/lagbevakning/revision/revisionsubscription', {
      revisionId: this.props.lawName.revisionId,
      subscriptionId: this.props.lawName.subscriptionId,
      status: this.state.value,
      revisionComment: this.state.textValue
    })
    .then((response) => {
      console.log(response)
        alert("You've sucessfully managed to do that")
        this.setState({open: false}) 
        this.moveToFinished()
    })
    .catch(function (error) {
      console.log(error)
        alert("something went wrong")
    })
  }

  close = () => this.setState({ open: false })
  submitButton = () => ( <Button className="saveButton" onClick={this.saveOnClick}> Save </Button>)

  closeConfigShow = (closeOnEscape, closeOnDimmerClick) => () => {
      this.setState({ closeOnEscape, closeOnDimmerClick, open: true })
    }

  render() {
    console.log(this.props.lawName.revisionId)
    const { open, closeOnEscape, closeOnDimmerClick } = this.state
    return (
      <div>
        <Button onClick={this.closeConfigShow(true, false)}>Edit</Button>
          <Modal open={open} onClose={this.close} closeOnEscape={closeOnEscape} closeOnDimmerClick={closeOnDimmerClick} closeIcon>
            <Modal.Header className="title">Reviderar Författning</Modal.Header> 
            <Modal.Content> <p className="lawTitle">{this.props.lawName.lawName}</p> </Modal.Content>
                  {this.textArea()}
                  <br/>
                  {this.dropDownList()}
                  {this.submitButton()}
          </Modal>
      </div>
    )
  }
}