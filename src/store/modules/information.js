const state = () => ({
    dataInfo: {
        name: "花生",
        csrq: "1999-08-10",
        age: '23',
        sex: "男",
        jg: "河北省沧州市",
        xl: "大学本科",
        zzmm: "中共党员",
        byyx: "西安邮电大学",
        zyfx: "计算机科学与技术",
        qzgw: "Web前端工程师",
        gzdd: "北京",
        lxfs: "18831785150",
        email: "1457501818@qq.com",
        csdn: "https://blog.csdn.net/niepan990810",
        github: "https://github.com/xulantong?tab=repositories",
        gzjlList: [
            {
                startTime: "2021-07-05",
                endTime: "2024-07-05",
                post: "前端工程师",
            },
            {
                startTime: "2021-07-06",
                endTime: "2024-07-07",
                post: "JAVA工程师",
            }
        ],
        xmjlList: [
            {
                compName: "生命起点",
                proName: "DRG/DIP院端解决方案",
                proDetail: "发的啥当老师打伞了电视剧咖第六届奥斯卡的理解洒落的爱神的箭撒库拉就打算开了多久奥斯卡鲁大师发的啥当老师打伞了电视剧咖第六届奥斯卡的理解洒落的爱神的箭撒库拉就打算开了多久奥斯卡鲁大师发的啥当老师打伞了电视剧咖第六届奥斯卡的理解洒落的爱神的箭撒库拉就打算开了多久奥斯卡鲁大师发的啥当老师打伞了电视剧咖第六届奥斯卡的理解洒落的爱神的箭撒库拉就打算开了多久奥斯卡鲁大师",
            },
            {
                compName: "生命起点",
                proName: "DRG/DIP院端解决方案",
                proDetail: "发的啥当老师打伞了电视剧咖第六届奥斯卡的理解洒落的爱神的箭撒库拉就打算开了多久奥斯卡鲁大师",
            },
        ],
        grpj: ["dhasjkldhslak", "dhasjkldhslak", "dhasjkldhslak"],
        zwjn: ["4567890", "4567890", "4567890"]
    }
})
const getters = {}
const mutations = {
    setDataInfo(state, dataInfo) {
        state.dataInfo = dataInfo
    },
}
const actions = {
    setDataInfo({commit}, dataInfo) {
        commit("setDataInfo", dataInfo)
    },
}
export default {state, getters, mutations, actions}
