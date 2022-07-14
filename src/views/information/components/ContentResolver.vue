<script>
import informationConfig from "./informationConfig"
import DataTable from "./DataTable"
import FiledContainer from "./FiledContainer"
import PartContainer from "./PartContainer"

export default {
    name: "ContentResolver",
    components: {
        DataTable,
        FiledContainer,
        PartContainer
    },
    props: {
        //模式
        mode: {
            type: Number,
            default: 0,
        },
        //是否开启编辑
        edit: {
            type: Boolean,
            default: false,
        },
        //数据字典
        dict: {},
        //个人详细信息
        dataDetail: {},
        //清单变更信息
        changeInfo: {},
    },
    mounted() {
    },
    methods: {
        renderComponent(h, config) {
            if (!config) {
                return null
            }
            let {component, children, showMode,showStar, ...props} = config
            let listeners = {}
            if (!['PartContainer'].includes(component)) {
                props = {
                    ...props,
                    dict: this.dict,
                    data: this.data,
                    edit: this.edit,
                    changeInfo: this.changeInfo,
                }
                listeners = {
                    'update:changeInfo': (val) => {
                        this.$emit('update:changeInfo', val)
                    },
                }
            }



        }
    },
    render(h) {
        return (
            <div>
                informationConfig.map((item) => this.renderComponent(h, item))
            </div>
        )
    }
}

</script>
<style lang="scss" scoped>

</style>
