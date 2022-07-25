const state = () => ({
    dataInfo: {},
    dicts: {},
})
const getters = {}
const mutations = {
    setDataInfo(state, dataInfo) {
        state.dataInfo = dataInfo
    },
    setDict(state, dicts = {}) {
        Object.keys(dicts).forEach(item => {
            if (!state.dicts[item]) {
                state.dicts = Object.assign({}, state.dicts, {[item]: dicts[item]})
            }
        })

    },
}
const actions = {
    setDataInfo({commit}, dataInfo) {
        commit("setDataInfo", dataInfo)
    },
}
export default {state, getters, mutations, actions}
