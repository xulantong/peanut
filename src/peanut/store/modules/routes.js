import layouts from "../../layouts";

const state = ()=>  ({
    routes: []
})
const getters = {}
const mutations = {
    setRoutes(state, routes) {
        state.routes = routes
    },
}
const actions = {}
export default {state, getters, mutations, actions}
