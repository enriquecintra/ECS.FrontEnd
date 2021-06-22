
const login = (token) => ({type: "LOGIN", payload: {token}})
const logout = () => ({type: "LOGOUT", payload: {}})

export default {
    login,
    logout
}