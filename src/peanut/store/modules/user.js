const state = {
    accessToken: localStorage.getItem("token")
}
const getters = {
    accessToken: (state) => state.accessToken
}

const action = {}

const mutations = {
    setAccessToken(state, accessToken) {
        state.accessToken = accessToken
    },
}
export default {state, getters, action, mutations}
