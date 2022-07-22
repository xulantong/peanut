export default {
    props: {
        //是否展示顶部工具栏
        showToolBar: {
            type: Boolean,
            default: false
        },
        //是否自动加载表格数据
        autoLoadGridData: {
            type: Boolean,
            default: false
        },
        //获取表格数据方法 可传函数返回一个Promise对象，或者传url和queryParams进行post请求
        listFunc: {
            type: [Function, String],
            require: true,
        },
        //高度
        height: {
            type: Number,
            default: 250
        },
        //最大高度
        maxHeight: {
            type: Number,
            default: null
        },

        //是否展示斑马纹
        stripe: {
            type: Boolean,
            default: false
        },
        //是否展示纵向边框
        border: {
            type: Boolean,
            default: true
        },
        //Table 的尺寸 medium / small / mini
        size: {
            type: String,
            default: "mini"
        },
        //列的宽度是否自撑开
        fit: {
            type: Boolean,
            default: true
        },
        //是否显示表头
        showHeader: {
            type: Boolean,
            default: true
        },
        //是否要高亮当前行
        highlightCurrentRow: {
            type: Boolean,
            default: false
        },
        //行的 className 的回调方法，也可以使用字符串为所有行设置一个固定的 className。 Function({row, rowIndex})/String
        rowClassName: {
            type: [Function, String],
            default: null
        },
        //行的 style 的回调方法，也可以使用一个固定的 Object 为所有行设置一样的 Style。	Function({row, rowIndex})/Object
        rowStyle: {
            type: [Function, Object],
            default: null
        },
        //单元格的 className 的回调方法，也可以使用字符串为所有单元格设置一个固定的 className。	Function({row, column, rowIndex, columnIndex})/String
        cellClassName: {
            type: [Function, String],
            default: null
        },
        //单元格的 style 的回调方法，也可以使用一个固定的 Object 为所有单元格设置一样的 Style。	Function({row, column, rowIndex, columnIndex})/Object
        cellStyle: {
            type: [Function, Object],
            default: null
        },
        //表头行的 className 的回调方法，也可以使用字符串为所有表头行设置一个固定的 className。	Function({row, rowIndex})/String
        headerRowClassName: {
            type: [Function, String],
            default: null
        },
        //表头行的 style 的回调方法，也可以使用一个固定的 Object 为所有表头行设置一样的 Style。	Function({row, rowIndex})/Object
        headerRowStyle: {
            type: [Function, Object],
            default: null
        },
        //表头单元格的 className 的回调方法，也可以使用字符串为所有表头单元格设置一个固定的 className。	Function({row, column, rowIndex, columnIndex})/String
        headerCellClassName: {
            type: [Function, String],
            default: null
        },
        //表头单元格的 style 的回调方法，也可以使用一个固定的 Object 为所有表头单元格设置一样的 Style。	Function({row, column, rowIndex, columnIndex})/Object
        headerCellStyle: {
            type: [Function, Object],
            default: null
        },
        //是否展示分页
        showPage: {
            type: Boolean,
            default: true
        },
        //分页是否带背景
        showPageBackground: {
            type: Boolean,
            default: true
        },
        //请求参数
        queryParams: {
            type: Object,
            default: () => {
            }
        },
        //默认排序
        defaultSort: {
            type: Array,
            default: () => []
        },
        maxFields: {
            type: Array,
            default: () => []
        },
        //空数据描述
        description: {
            type: String,
            default: "暂无数据"
        },
        //空数据图片大小
        imgSize: {
            type: Number,
            default: 150
        },
    }
}
