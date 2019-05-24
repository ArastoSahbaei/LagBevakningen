import React, { Component } from "react";
import "./ProfilePage.css"
import Axios from "axios";
import Popup from "reactjs-popup";
import { Form } from "semantic-ui-react";
import { FormattedMessage } from "react-intl";


class ProfilePage extends Component {

  constructor(){
    super();
    this.state = {
      data: {
      },

      oldPassword: "",
      repeatedNewPassword: "",
      newPassword: "",
      currentUser: "",
      passwordIsNotSame: false,
      oldPasswordIsNotValid: false,
      doubleCheck: true,
      newEmail: "",
      newFirstName:"",
      newLastName:"",
      openEmail: false,
      openName: false,
      openPassword: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.resetInput = this.resetInput.bind(this);

  };

  componentDidMount = () => {
    Axios.get('http://localhost:8080/lagbevakning/user')
      .then( response => {
        this.setState({currentUser: response.data, newFirstName: response.data.firstName, newLastName: response.data.lastName});
      })
  };

  popupEmailCloses = () =>{
    this.setState({openEmail: false});
    this.resetInput();
  }

  popupEmailOpen = () =>{
    this.setState({openEmail:true});
  }

  popupNameCloses = () =>{
    this.setState({openName: false});
    this.resetInput();
  }

  popupNameOpen = () =>{
    this.setState({openName:true});
  }

  popupPasswordCloses = () =>{
    this.setState({openPassword: false});
    this.resetInput();
  }

  popupPasswordOpen = () =>{
    this.setState({openPassword:true});
  }

  validatePassword = () =>{
    let minNumberOfChars = 6;
    let maxNumberOfChars = 16;
    let regularExpression = /([0-9])/;
    if(this.state.newPassword.length < minNumberOfChars || this.state.newPassword.length > maxNumberOfChars){
      return false;
    }

    if (this.state.newPassword === (this.state.newPassword.toLowerCase())){
      return false
    }
    if(this.state.newPassword === (this.state.newPassword.toUpperCase())){
      return false
    }
    return regularExpression.test(this.state.newPassword)
  };


  onChange = e =>
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value}
    });

  handleChange(event) {
    /*  this.setState({value: event.target.value}); */
    this.setState({[event.target.name]: event.target.value})
  }

  updateEmail = () => {
    const newUserInfo ={
      id : this.state.currentUser.id,
      email: this.state.newEmail
    };
    Axios.put('http://localhost:8080/lagbevakning/user/updateemail', newUserInfo).then(response=>{
        sessionStorage.setItem('email',this.state.newEmail)
        Axios.get('http://localhost:8080/lagbevakning/user')
          .then( response => {
            this.setState({currentUser: response.data});
            this.popupEmailCloses();
          })
    })
  };

  updateName = () => {
    const newUserInfo = {
      firstName : this.state.newFirstName,
      lastName : this.state.newLastName,
      id : this.state.currentUser.id
    };
    Axios.put('http://localhost:8080/lagbevakning/user/updatename', newUserInfo).then(response=>{
        Axios.get('http://localhost:8080/lagbevakning/user')
          .then( response => {
            this.setState({currentUser: response.data});
            this.popupNameCloses()
          })
    })
  };

  updatePassword = () => {

    if (this.state.newPassword !== this.state.repeatedNewPassword){
      this.setState({passwordIsNotSame: true});
    }

    else{
      this.setState({passwordIsNotSame: false});
      const newUserInfo ={
        oldPassword: this.state.oldPassword,
        newPassword: this.state.newPassword,
        id: this.state.currentUser.id
      };


      Axios.put('http://localhost:8080/lagbevakning/user/updatepassword', newUserInfo).then(response =>{
          Axios.get('http://localhost:8080/lagbevakning/user')
            .then(response => {
              this.setState({ currentUser: response.data });
              this.popupPasswordCloses()
            });

      }).catch(error =>{
        if (error.response.status === 401){
          this.setState({oldPasswordIsNotValid: true})
        }
      })
    }
  };

  resetInput = () =>{
    this.setState({
      newPassword: "",
      repeatedNewPassword: "",
      oldPassword: "",
      newEmail: "",
      newFirstName: this.state.currentUser.firstName,
      newLastName: this.state.currentUser.lastName,
      oldPasswordIsNotValid: false,
      passwordIsNotSame: false,
      doubleCheck: true
    })
  };

doubleCheckOn = () =>{
  this.setState({doubleCheck:false})
};

  doubleCheckOff = () =>{
    this.setState({doubleCheck:true})
  };

  render() {
    return (
      <div>
        <h1><FormattedMessage id="profilePage.header"/></h1>
        {this.name()}
        {this.email()}
        {this.password()}
      </div>
    )
  }

  email(){
    return(
      <div>
        <p className="userInfo"><FormattedMessage id="profilePage.email"/> {this.state.currentUser.email}</p>
        <sup className="editButton" onClick={this.popupEmailOpen.bind()}>edit</sup>
        <Popup open={this.state.openEmail} close={!this.state.openEmail} onClose={this.popupEmailCloses.bind()} className="emailPopup" modal>
          {close => (
            <div className="changeEmailText">
              {this.state.doubleCheck ?
                <Form className="test" onSubmit={this.onSubmit}>
                <span><label><FormattedMessage id="profilePage.newEmail"/> <br/></label>
             <input
               type="email"
               name="newEmail"
               onChange={this.handleChange}/></span>
                  <button
                    disabled={!this.state.newEmail.includes("@",)}
                    onClick={this.doubleCheckOn.bind()}>Save
                  </button>
                  <button onClick={this.popupEmailCloses.bind()}>Cancel</button>
                </Form>

                :<div className="safetyMessage"><p><FormattedMessage id="profilePage.emailCheck"/><br/><br/>{this.state.newEmail}<br/><br/><FormattedMessage id="profilePage.correct"/></p>
                  <button
                    onClick={this.updateEmail.bind()}>Yes</button>
                  <button onClick={this.doubleCheckOff.bind()}>No</button>
                </div>

              }
            </div>
          )}
        </Popup>
      </div>
    )
  }



  name(){
    return(
      <div className="name">


        <p className="userInfo"> <FormattedMessage id="profilePage.name"/> {this.state.currentUser.firstName} {this.state.currentUser.lastName}</p>
        <sup className="editButton" onClick={this.popupNameOpen.bind()}> edit</sup>
        <Popup open={this.state.openName} close={!this.state.openName} onClose={this.popupNameCloses.bind()} className="namePopup" modal>
          {close => (
            <div className="changeNameText">

              {this.state.doubleCheck ?
              <Form className="test" onSubmit = {this.onSubmit}>
                <span><label><FormattedMessage id="profilePage.firstName"/><br/></label>
             <input
               value={this.state.newFirstName}
               type="text"
               name="newFirstName"
               onChange={this.handleChange}/></span>
                <span><label><FormattedMessage id="profilePage.lastName"/><br/></label>
             <input
               value={this.state.newLastName}
               type="text"
               name="newLastName"
               onChange={this.handleChange}/></span>
                <button disabled={this.state.newFirstName.length<1 || this.state.newLastName.length<1}
                  onClick={this.doubleCheckOn.bind()}>Save</button>
                <button onClick={close.bind()}>Cancel</button>
              </Form>
                :<div className="safetyMessage"><p><FormattedMessage id="profilePage.nameCheck"/> <br/><br/>{this.state.newFirstName} {this.state.newLastName}<br/><br/><FormattedMessage id="profilePage.correct"/></p>
                  <button
                    onClick={this.updateName.bind()}>Yes</button>
                  <button onClick={this.doubleCheckOff.bind()}>No</button>
                </div>
              }
            </div>
          )}
        </Popup>
      </div>
    )
  }

  password(){
    return(
      <div>
       <div className="changePasswordButton" onClick={this.popupPasswordOpen.bind()}> <FormattedMessage id="profilePage.changePassword"/> </div>
        <Popup className="passwordPopup" open={this.state.openPassword} close={!this.state.openPassword} onClose={this.popupPasswordCloses} modal>
          {close => (
            <div className="changePasswordText">
              <Form className="test" onSubmit = {this.onSubmit}>

             <span><label><FormattedMessage id="profilePage.currentPassword"/><br/></label>
             <input
               type="password"
               name="oldPassword"
               onChange={this.handleChange}/></span>

                <span><label><FormattedMessage id="profilePage.newPassword"/><br/></label>
             </span>
                <Popup
                  trigger={<input
                    type="password"
                    name="newPassword"
                    value={this.state.newPassword}
                    placeholder="8-16 letters"
                    onChange={this.handleChange}/>}
                  on="focus"
                  position="top center"
                  closeOnDocumentClick
                >
                  <span><FormattedMessage id="profilePage.passwordStandard"/></span>
                </Popup>

                <span><label><FormattedMessage id="profilePage.confirmPassword"/><br/></label>
             <input
               type="password"
               name="repeatedNewPassword"
               placeholder="8-16 letters"
               onChange={this.handleChange}/></span>

                <button disabled={!this.validatePassword()}
                  onClick={this.updatePassword.bind()}>Save</button>
                <button onClick={close.bind()}>Cancel</button>
                <div className="errors">
                {this.state.passwordIsNotSame ? <p><FormattedMessage id="profilePage.passwordNotMatching"/></p> :  null}
                {this.state.oldPasswordIsNotValid ? <p><FormattedMessage id="profilePage.wrongPassword"/></p>: null}
                </div>
              </Form>
            </div>
          )}
        </Popup>
      </div>
    )
  }
}

export default  ProfilePage
