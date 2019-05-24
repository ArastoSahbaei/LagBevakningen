import React, { Component } from 'react'
import PropTypes from "prop-types"
import { Form, Button } from "semantic-ui-react"
import Validator from "validator"
import InlineError from "../../exceptions/InlineError"
import { Menu, Dropdown } from "semantic-ui-react"
import "./LoginForm.css"
import DEN from "../../services/images/DEN.png"
import SWE from "../../services/images/SWE.png"
import NOR from "../../services/images/NOR.png"
import ENG from "../../services/images/ENG.png"
import GLOBAL from "../../services/images/miniglobe.png"
import { connect } from "react-redux"
import { setLocale } from "../../redux/actions/Locale"
import { FormattedMessage } from "react-intl"
import ramboll from "../../services/images/Ramboll.png"

class LoginForm extends Component {
    
    state = {
        data: { email: "",
        password: "" },
        loading: false,
        errors: {}
    }

    onChange = e => 
    this.setState({ 
        data: { ...this.state.data, [e.target.name]: e.target.value}
    })

    onSubmit = () => {
        const errors = this.validate(this.state.data)
        this.setState({ errors })
        if (Object.keys(errors).length === 0) {
            this.setState({ loading: true })
            this.props.submit(this.state.data)
            .catch(err => this.setState({loading: false })
            )
        }
    }

    validate = (data) => {
        const errors = {}
        if (!Validator.isEmail(data.email)) errors.email = "Invalid email"
        if (!data.password) errors.password = "Can't be blank!"
        return errors
    }

  render() {
    const { data, errors, loading } = this.state

    return (
      <div className="loginFormWrapper">
       {  <img src={ramboll} className="rambollLogin" alt="Logotype" /> }
            <Menu.Menu className="languageDropdown">
          {/*   {localStorage.getItem("language")} */}
              <Dropdown icon="caret down" trigger={  <span> <img className="loginGlobe" src={GLOBAL} alt="Eng" /> <span className="globeLanguage">English</span> </span>}>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => this.props.setLocale("en")}> <img src={ENG} alt="Eng" /> <p className="lang"> English     </p> </Dropdown.Item> <hr/>
                        <Dropdown.Item onClick={() => this.props.setLocale("se")}> <img src={SWE} alt="Swe" /> <p className="lang"> Svenska     </p> </Dropdown.Item> <hr/>
                        <Dropdown.Item onClick={() => this.props.setLocale("de")}> <img src={DEN} alt="Den" /> <p className="lang"> Dansk       </p> </Dropdown.Item> <hr/>
                        <Dropdown.Item onClick={() => this.props.setLocale("no")}> <img src={NOR} alt="Nor" /> <p className="lang"> Norsk       </p> </Dropdown.Item>
                    </Dropdown.Menu>
              </Dropdown>
            </Menu.Menu>

        <h2 className="welcomeTitle">WELCOME</h2>
        <h3 className="subWelcomeTitle">RSM&CO Lagbevakningen, a part of Ramboll</h3>

          <Form className="emailForm" onSubmit = {this.onSubmit} loading = {loading}>
            <Form.Field error = {!!errors.email}>
                        <label htmlFor="email"> <i className="far fa-envelope"></i> 
                        <span className="emailText"><FormattedMessage id="loginPage.2"/> </span> </label>
                        <input className="emailInput"
                            type="email" 
                            id="email" 
                            name="email" 
                            placeholder="example@example.com"
                            value={data.email} 
                            onChange={this.onChange}
                        />
                        {errors.email && <InlineError text={errors.email} />}
                    </Form.Field>
                    <Form.Field error = {!!errors.password}>
                        <label className="passwordLabel" htmlFor="password"> <i className="far fa-fingerprint fa"/>
                         <span className="passwordText"><FormattedMessage id="loginPage.3"/></span></label>
                        <input className="passwordInput"
                            type="password" 
                            id="password" 
                            name="password" 
                            placeholder="6-18 characters"
                            value={data.password} 
                            onChange={this.onChange}
                        />
                         {errors.password && <InlineError text={errors.password} />}
                    </Form.Field>
            <Button className="loginButton" primary><FormattedMessage id="loginPage.1"/><i className="fas fa-sign-out-alt"/></Button>
            <a className="forgotPassword" href="http://localhost:3000/login"> <FormattedMessage className="forgotPassword" id="loginPage.4"/></a> 
          </Form>
      </div>
    )
  }
}

LoginForm.propTypes = {
    submit: PropTypes.func.isRequired
}
function mapStateToProps(state) {
    return {
      user: state.user
    }
  }
export default connect(mapStateToProps, { setLocale })(
    LoginForm
  )