import axios from "axios"

export default {
    user: {
        login: (credentials) => 
        axios.post("http://localhost:8080/lagbevakning/users/login", {email: credentials.email, password: credentials.password}).then(res => res.data)
    }
}