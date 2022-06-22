const state = ()=>  ({
    data: [
        {
            id: "001",
            name: "张三",
            age: 14
        },
        {
            id: "001",
            name: "张三",
            age: 14
        },
        {
            id: "001",
            name: "张三",
            age: 14
        },
        {
            id: "001",
            name: "张三",
            age: 14
        },
        {
            id: "001",
            name: "张三",
            age: 14
        },
        {
            id: "001",
            name: "张三",
            age: 14
        },
        {
            id: "001",
            name: "张三",
            age: 14
        },

    ]
})
const getters = {}
const mutations = {
    setData(state, data) {
        state.data = data
    },
}
const actions = {}
export default {state, getters, mutations, actions}
