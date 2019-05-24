import { USER_LOGGED_IN, USER_LOGGED_OUT } from "../../../src/utils/types"
import SetAuthorizationHeader from "../../utils/SetAuthorizationHeader"
import api from "../../../src/services/api"
import decode from "jwt-decode";

export const userLoggedIn = (user) => ({
    type: USER_LOGGED_IN,
    user
})

export const userLoggedOut = () => ({
    type: USER_LOGGED_OUT
  })

export const login = credentials => dispatch => 
api.user.login(credentials).then(user => {
    sessionStorage.JWT = user
    sessionStorage.email = credentials.email
    const payload = decode(sessionStorage.JWT)
         user = { 
            token: sessionStorage.JWT,
            email: payload.sub
        }
    SetAuthorizationHeader(user.token)
    dispatch(userLoggedIn(user))
    console.log("RECIEVED TOKEN IN SESSIONSTORAGE: " + user.email)
})

export const logout = () => dispatch => {
    sessionStorage.removeItem("JWT")
    sessionStorage.removeItem("email")
    sessionStorage.removeItem("id")
    SetAuthorizationHeader()
    dispatch(userLoggedOut())
  }