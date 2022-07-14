const state = ()=>  ({
    dataInfo: {
        name:"花生",
        csrq:"1999-08-10",
        age:'23',
        sex:"男",
        jg:"河北省沧州市",
        xl:"大学本科",
        zzmm:"中共党员",
        byyx:"西安邮电大学",
        zyfx:"计算机科学与技术",
        lxfs:"18831785150",
        email:"1457501818@qq.com",
        csdn:"https://blog.csdn.net/niepan990810",
        github:"https://github.com/xulantong?tab=repositories",
    }
})
const getters = {}
const mutations = {
    setDataInfo(state, dataInfo) {
        state.dataInfo = dataInfo
    },
}
const actions = {}
export default {state, getters, mutations, actions}
