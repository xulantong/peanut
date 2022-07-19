<script>
import informationConfig from "./informationConfig"
import DataTable from "./DataTable"
import FiledContainer from "./FiledContainer"
import PartContainer from "./PartContainer"
import AreaContainer from "./AreaContainer"
import ArrayContainer from "./ArrayContainer"

export default {
    name: "ContentResolver",
    components: {
        DataTable,
        FiledContainer,
        PartContainer,
        AreaContainer,
        ArrayContainer
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
        //个人详细信息
        dataDetail: {},
        //清单变更信息
        changeInfo: {},
    },
    data() {
        return {
            fieldItems:{},
        }
    },
    provide() {
        return {
            contentResolver: this
        }
    },
    methods: {
        renderComponent(h, config) {
            if (!config) {
                return null
            }
            let {component, children, showMode, showStar, style, ...props} = config
            let listeners = {}
            if (!['PartContainer'].includes(component)) {
                props = {
                    ...props,
                    edit: this.edit,
                }
                listeners = {
                    'update:changeInfo': (val) => {
                        this.$emit('update:changeInfo', val)
                    },
                }
            }
            let componentObj = (
                <component
                    is={component}
                    {...{props}}
                    {...{on: listeners}}
                    style={style}
                    class={[
                        showMode ? 'show-mode mode-' + showMode : null,
                    ]}>
                    {children && children.map((item) => this.renderComponent(h, item))}
                </component>
            )
            // if (component === 'PartContainer') {
            //     this.parts.push(componentObj)
            // }
            return componentObj


        }
    },
    render(h) {
        return (
            <div>
                {informationConfig.map((item) => this.renderComponent(h, item))}
            </div>
        )
    }
}

</script>
<style lang="scss" scoped>
.showMode{

}
.mode-1{
    display: none;
}

</style>
