export default {
    state: {
        salary: 20
    },
    getters: {},
    mutations: {
        addSalary(state) {
            state.salary++
        },
        reduceSalary(state) {
            state.salary--
        },
    },
    actions: {
        addSalary({ commit}) {
            commit('addSalary')
        },
        reduceSalary({commit}) {
            commit('reduceSalary')
        },
    }
}