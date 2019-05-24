import React from "react"
import PropTypes from "prop-types"
import { Menu, Dropdown, Image } from "semantic-ui-react"
import { connect } from "react-redux"
import { NavLink } from "react-router-dom"
import gravatarUrl from "gravatar-url"
import * as actions from "../../redux/actions/auth"
import "./NavigationBar.css"
import { setLocale } from "../../redux/actions/Locale"
import { FormattedMessage } from "react-intl"
import rsmRamboll from "../../services/images/rsm_logo.png"



class NavigationBar extends React.Component {
  state = {}
  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
  const { activeItem } = this.state
  const { user, logout } = this.props
  return (
      <Menu secondary pointing className="navBar">
        <Menu.Item className="loggan"> <img className="rsmRambollImage" src={rsmRamboll} alt="RSM"/> <p className="lagbevakningenTitle"> LAGBEVAKNINGEN</p> </Menu.Item>

        <Menu.Item name='Dashboard' active={activeItem === 'Dashboard'} onClick={this.handleItemClick} className="home" activeClassName="activeLink" header as={NavLink} exact to="/dashboard">
        <div className="navigationBarFormattedMessage"> <FormattedMessage id="navigationBar.nav1"/> </div> 
        </Menu.Item>

        <Menu.Item name='Law' active={activeItem === 'Law'} onClick={this.handleItemClick} className="law" activeClassName="activeLink" header as={NavLink} exact to="/law">  
        <div className="navigationBarFormattedMessage"> <FormattedMessage id="navigationBar.nav2"/> </div> 
        </Menu.Item>

        <Menu.Item name='Revisions' active={activeItem === 'Revisions'} onClick={this.handleItemClick} className="revision" activeClassName="activeLink" header as={NavLink} exact to="/revisions">
        <div className="navigationBarFormattedMessage"> <FormattedMessage id="navigationBar.nav3"/> </div> 
        </Menu.Item>

        <Menu.Item name='Changes' active={activeItem === 'Changes'} onClick={this.handleItemClick} className="changes" activeClassName="activeLink" header as={NavLink} exact to="/changes">
        <div className="navigationBarFormattedMessage"> <FormattedMessage id="navigationBar.nav4"/> </div> 
        </Menu.Item>
        
        <Menu.Item name='Settings' active={activeItem === 'Settings'} onClick={this.handleItemClick} className="settings" activeClassName="activeLink" header as={NavLink} exact to="/settings">
        <div className="navigationBarFormattedMessage"> <FormattedMessage id="navigationBar.nav5"/> </div> 
        </Menu.Item>

    <Menu.Menu className="profileDropDown">
       <Dropdown icon='angle down' trigger={<Image avatar src={gravatarUrl(user.email)} />}>
            <Dropdown.Menu>
                <Dropdown.Item header as={NavLink} to="/profile">
                <div className="SubnavigationBarFormattedMessage"> <FormattedMessage id="navigationBar.profile"/>   </div>   
                </Dropdown.Item>
                <Dropdown icon="angle left" text="Language" pointing="right"
                        options={[
                          { text: 'English', value: 'en', flag: 'gb'},
                          { text: 'Svenska', value: 'se', flag: 'se' },
                          { text: 'Dansk', value: 'de', flag: 'de' },
                          { text: 'Norsk', value: 'no', flag: 'no' },
                        ]}
                    />

                <Dropdown.Item header as={NavLink} exact to="/dashboard2">      
                <div className="SubnavigationBarFormattedMessage"> <FormattedMessage id="navigationBar.management"/> </div>
                </Dropdown.Item>
                <Dropdown.Item header as={NavLink} exact to="/dashboard3">      
                <div className="SubnavigationBarFormattedMessage"> <FormattedMessage id="navigationBar.mySettings"/> </div>
                </Dropdown.Item> <hr/> 
                <Dropdown.Item onClick={() => logout()}>
                <div className="SubnavigationBarFormattedMessage"> <FormattedMessage id="navigationBar.signOut"/>   </div>
                </Dropdown.Item>
            </Dropdown.Menu>
      </Dropdown>
    </Menu.Menu>
  </Menu>
)
    }}

NavigationBar.propTypes = {
  user: PropTypes.shape({email: PropTypes.string.isRequired}).isRequired,
  logout: PropTypes.func.isRequired,
  setLocale: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, { logout: actions.logout, setLocale })(
  NavigationBar
)