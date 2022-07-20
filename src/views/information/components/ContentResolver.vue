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
            // parts: [],
            fieldItems: {},
        }
    },
    mounted() {
        this.toggleMode()
    },
    watch: {
        mode: {
            handler() {
                this.toggleMode()
            },
            immediate: true
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
        },
        toggleMode() {
            // this.parts?.forEach((item) => {
            //     item.componentInstance?.setCollapse?.(!this.mode)
            // })
            let nodes = this.$el?.getElementsByClassName('show-mode');
            if (nodes) {
                Array.prototype.forEach.call(nodes, (node) => {
                    let className = node.getAttribute('class')
                    let show = className?.split(' ').includes('mode-' + this.mode) ?? false
                    let style = node.getAttribute('style') || ''
                    style = style.replace(/(;)*display:\snone/, '')
                    if (!show) {
                        style += ';display: none'
                    }
                    if (!style) {
                        node.removeAttribute('style')
                    } else {
                        node.setAttribute('style', style)
                    }
                })
            }
        },

    },
    render(h) {
        // this.parts = []
        return (
            <div>
                {informationConfig.map((item) => this.renderComponent(h, item))}
            </div>
        )
    }
}

</script>
<style lang="scss" scoped>
//.mode-1 {
//    display: none;
//}

</style>
