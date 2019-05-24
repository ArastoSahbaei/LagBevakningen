import React, { Component } from 'react'
import { Menu} from "semantic-ui-react"
import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import UserRoute from "../../../component/routes/UserRoute";
import OngoingRevisionsPage from "../ongoingrevisions/OngoingRevisionsPage";
import FinishedRevision from "../finishedRevision/FinishedRevisionsPage";
import "./RevisionMain.css"
import EditRevision from '../editrevision/EditRevision';
import CreateRevisionPage from "../createrevision/CreateRevisionPage";


export default class RevisionMain extends Component {
  render() {
    const { location } = this.props
    return(
      <div>
        <Menu secondary pointing className="navBarSubMenu">
          <Menu.Item className="create"   as={Link} to="/revisions/create">   <div className="subMenu"> <FormattedMessage id="revisionMain.create"/>   </div> </Menu.Item>
          <Menu.Item className="ongoing"  as={Link} to="/revisions/ongoing">  <div className="subMenu"> <FormattedMessage id="revisionMain.ongoing"/>  </div> </Menu.Item>
          <Menu.Item className="finished" as={Link} to="/revisions/finished"> <div className="subMenu"> <FormattedMessage id="revisionMain.finished"/> </div> </Menu.Item>
        </Menu>

        <UserRoute  location={location} path="/revisions/ongoing"                         exact component = {OngoingRevisionsPage} />
        <UserRoute  location={location} path="/revisions/ongoing/editrevision/:id"        exact component = {EditRevision} />
        <UserRoute  location={location} path="/revisions/finished"                        exact component = {FinishedRevision} />
        <UserRoute  location={location} path="/revisions/create"                          exact component = {CreateRevisionPage} />
      </div>
    )
  }
}
