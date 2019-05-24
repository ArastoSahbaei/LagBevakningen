import React from "react"
import LoginPage from "./containers/login/LoginPage"
import DashBoardPage from "./containers/dashboard/DashBoardPage"
import UserRoute from "./component/routes/UserRoute"
import GuestRoute from "./component/routes/GuestRoute"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { IntlProvider } from "react-intl"
import LawPage from "./containers/law/LawPage"
import NavigationBar from "./component/navigation/NavigationBar"
import messages from "./utils/messages"
import ProfilePage from "./containers/profile/ProfilePage";
import RevisionMain from "./containers/revisions/revisionmain/RevisionMain";
import LawSelection from "./component/settings/lawselection/LawSelection";

class App extends React.Component {

  render() {
    const { location, isAuthenticated, lang  } = this.props
    return (
      <IntlProvider locale={lang} messages={messages[lang]}>
              <div>
               {isAuthenticated && <NavigationBar />}
                <GuestRoute location={location} path="/"                 exact component = {LoginPage} />
                <UserRoute  location={location} path="/dashboard"        exact component = {DashBoardPage} />
                <UserRoute  location={location} path="/law"              exact component = {LawPage} />
                <UserRoute  location={location} path="/profile"          exact component = {ProfilePage}/>
                <UserRoute  location={location} path="/revisions"              component = {RevisionMain}/>
                <UserRoute  location={location} path="/settings"         component = {LawSelection}/>
              </div>
      </IntlProvider>
    )}
  }

App.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  lang: PropTypes.string.isRequired
}

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.user.email,
    lang: state.locale.lang
  }
}

export default connect(mapStateToProps)(App)