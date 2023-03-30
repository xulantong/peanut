/**
 * 远程表格组件mixin
 *
 * @author zhengqiang
 * @since 2021-08-10
 */
export default {
    props: {
        //远程加载函数或接口路径
        listFunc: {
            type: [Function, String],
            default: null
        },
        //是否自动加载表格数据
        autoLoadGridData: {
            type: Boolean,
            default: true
        },
        //最大值统计字段 用于统计某个字段最大值或最长值
        maxFields: {
            type: Array,
            default: () => []
        },
        //查询参数
        queryParams: {
            type: Object,
            default: () => ({})
        },
        //默认排序值
        defaultSort: {
            type: Array,
            default: () => ([])
        },
        //是否显示顶部工具栏
        showToolBar: {
            type: Boolean,
            default: false
        },
        //是否显示顶部导出按钮
        showExport: {
            type: Boolean,
            default: false
        },
        //导出excel文件名
        exportFileName: {
            type: [String, Function],
            default: null
        },
        //是否自动高度
        autoHeight: {
            type: Boolean,
            default: false
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
        //是否显示分页
        showPager: {
            type: Boolean,
            default: true
        },
        //分页大小
        pageSize: {
            type: Number,
            default: 20
        },
        //行选择类型 none: 不可选择 multiple: 多选 single: 单选
        selectionType: {
            type: String,
            default: "none",
            validator(val) {
                return ["none", "multiple", "single"].indexOf(val) > -1
            }
        },
        //行是否可选择 函数回调
        selectable: {
            type: Function,
            default: null
        },
        //可选框浮动
        selectBoxFixed: {
            type: String,
            default: null
        },
        //是否显示行号
        rowNumber: {
            type: Boolean,
            default: false
        },
        //行号是否跟随分页递增
        isRecordNumber: {
            type: Boolean,
            default: true
        },
        //行号浮动
        rowNumberFixed: {
            type: String,
            default: null
        },
        //行号列名
        rowNumberName: {
            type: String,
            default: null
        },
        //是否显示表头
        showHeader: {
            type: Boolean,
            default: true
        },
        //表格行id
        rowKey: [Function, String],
        //是否显示表格纵向边框
        border: {
            type: Boolean,
            default: true
        },
        //是否显示斑马纹
        stripe: {
            type: Boolean,
            default: false
        },
        //表格尺寸
        size: {
            type: String,
            default: null,
            validator(val) {
                return ["medium", "small", "mini"].indexOf(val) > -1
            }
        },
        //列宽度是否自动撑开
        fit: {
            type: Boolean,
            default: true
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
    }
}
