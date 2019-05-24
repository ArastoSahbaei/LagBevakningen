import React, { Component } from 'react'
import { Table } from 'semantic-ui-react'
import axios from 'axios'
import { Loader } from 'semantic-ui-react'
import { FormattedMessage } from "react-intl"
import "./LawPage.css"

export default class Law extends Component {

    state = {
      companyName: "Loading",
          loading: true,
             data: []
    }

componentDidMount = () => {
    axios.get('http://localhost:8080/lagbevakning/subscription/lawlist').then(response => {
        this.setState({
            companyName: response.data[0].companyItem.companyName,
            loading: false,
            data: response.data
        })
         /* console.log(response.data) */
    }).catch(error=>{
      console.log("failed", error)
    })
}

data(props) {
  return(
    <div>
      <Table celled striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell><FormattedMessage id="lawList.index"/></Table.HeaderCell>
            <Table.HeaderCell><FormattedMessage id="lawList.legislation"/></Table.HeaderCell>
            <Table.HeaderCell><FormattedMessage id="lawList.requirements"/></Table.HeaderCell>
            <Table.HeaderCell><FormattedMessage id="lawList.status"/></Table.HeaderCell>
            <Table.HeaderCell><FormattedMessage id="lawList.latestRevision"/></Table.HeaderCell>
            <Table.HeaderCell><FormattedMessage id="lawList.underAudit"/></Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        {props.filter(Boolean).map((lawList, index) => (
                    <Table.Body key={index}>
                      <Table.Row>
                        <Table.Cell>{index + 1}</Table.Cell>
                        <Table.Cell>{lawList.lawDTO.name}</Table.Cell>
                        <Table.Cell><textArea readOnly>{lawList.text}</textArea></Table.Cell>
                        <Table.Cell>{lawList.status}</Table.Cell>
                        <Table.Cell>{new Date(lawList.latestRevisionDate).toISOString().substring(0, 10)}</Table.Cell>
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
                <h3> <br/> {this.data(this.state.data)} </h3> </div>}

        </div>   
     )}
   }