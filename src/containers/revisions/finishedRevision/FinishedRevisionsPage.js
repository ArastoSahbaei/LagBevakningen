import React, { Component } from 'react'
import axios from 'axios/index'
import { Table } from 'semantic-ui-react'
import { Dimmer, Loader} from 'semantic-ui-react'

import "./FinishedRevision.css"
import { FormattedMessage } from "react-intl"

export default class OngoingRevisionsPage extends Component {

  state = {
    loading: false,
    data: []
  }

  componentWillMount = () => {
    axios.get('http://localhost:8080/lagbevakning/revision/finished').then(response => {
      this.setState({
        loading: false,
        data: response.data
      })
       console.log(response.data) 
    })
  }

  downloadRevisionExcel = id => {

    axios({
      url: "http://localhost:8080/lagbevakning/revision/excel?id=" + id,
      method: 'GET',
      responseType: 'blob',
    }).then((response) => {
      console.log(response.headers)
      console.log(response.data)
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', response.headers.filename)
      document.body.appendChild(link)
      link.click()
    })
  }

  deleteRevision = id => {
    axios.delete("http://localhost:8080/lagbevakning/revision/delete?id=" + id).then(response =>{
      console.log(response)
      this.setState(({ data }) => ({
        data: data.filter(item => item.id !== id)
      }))
    })

  }

  finishedRevisionsList = () => {
    return(
      <div>
          <Table celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell><FormattedMessage id="revisionList.name"/></Table.HeaderCell>
                  <Table.HeaderCell><FormattedMessage id="revisionList.created"/></Table.HeaderCell>
                  <Table.HeaderCell><FormattedMessage id="revisionList.finished"/></Table.HeaderCell>
                  <Table.HeaderCell><FormattedMessage id="revisionList.responsible"/></Table.HeaderCell>
                  <Table.HeaderCell><FormattedMessage id="revisionList.lawAmount"/></Table.HeaderCell>
                  <Table.HeaderCell><FormattedMessage id="revisionList.options"/></Table.HeaderCell>
                </Table.Row>
              </Table.Header>

          {this.state.data.map((item, i) => (
                <Table.Body key={item.id}>
                  <Table.Row>
                    {console.log(item.id)}
                    <Table.Cell>{item.name}</Table.Cell>
                    <Table.Cell>{new Date(item.createdAt).toISOString().substring(0, 10)}</Table.Cell>
                    <Table.Cell>{new Date(item.finishedAt).toISOString().substring(0, 10)}</Table.Cell>
                    <Table.Cell>{item.createdBy.email}</Table.Cell>
                    <Table.Cell>{item.subscriptionCount}</Table.Cell>
                    <Table.Cell>
                      <i className="far fa-file-excel" onClick={this.downloadRevisionExcel.bind(this, item.id)}/>
                      <i className="far fa-trash-alt" onClick={this.deleteRevision.bind(this, item.id)}/>
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
          ))}
          </Table>
      </div>
    )
  }
    
    render() {
        return (
          <div>
            <h1><FormattedMessage id="finishedRevisionsPage.header"/></h1>
            {this.state.loading
          ? <div>
              <Dimmer active>
                <Loader size='massive' active inverted>Loading</Loader>
              </Dimmer>
            </div>
          : <div>{this.finishedRevisionsList()}</div>
        }
          
          </div>
        )
      }
}