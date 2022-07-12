export default {
    props: {
        //是否展示边框
        border: {
            type: Boolean,
            default: false
        },
        //每行的item列数
        column: {
            type: Number,
            default: 3
        },
        //排列方向：vertical（垂直） / horizontal（水平）
        direction: {
            type: String,
            default: "horizontal"
        },
        //列表尺寸：medium / small / mini
        size: {
            type: String,
            default: ""
        },
        title: {
            type: String,
            default: "title"
        },
        extra: {
            type: String,
            default: "extra"
        },
        colon: {
            type: Boolean,
            default: true
        },

    }
}
