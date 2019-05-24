import { combineReducers } from "redux"
import user from "./user";
import locale from "./locale";


export default combineReducers({
    user,
    locale
})