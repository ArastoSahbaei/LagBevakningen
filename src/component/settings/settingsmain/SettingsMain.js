import React, { Component } from 'react'
import { Menu} from "semantic-ui-react"
import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import UserRoute from "../../routes/UserRoute";
import OngoingRevisionsPage from "../ongoingrevisions/OngoingRevisionsPage";
import FinishedRevision from "../finishedRevision/FinishedRevisionsPage";
import "./RevisionMain.css"
import EditRevision from '../editrevision/EditRevision';
import CreateRevisionPage from "../createrevision/CreateRevisionPage";
import LawSelection from "../lawselection/LawSelection";

export default class SettingsMain extends Component {


  render() {
    const { location } = this.props
    return(
      <div>

        <Menu secondary pointing className="NoOrange">
          <Menu.Item className="laws"   as={Link} to="/settings/laws">   <div className="fontColourRevisionMain"> Laws   </div> </Menu.Item>
        </Menu>

        <UserRoute  location={location} path="/settings/laws"                          exact component = {LawSelection} />
      </div>
    )
  }
}
