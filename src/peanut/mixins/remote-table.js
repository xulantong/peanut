export default {
    props: {
        showToolBar: {
            type: Boolean,
            default: false
        },
        autoLoadGridData: {
            type: Boolean,
            default: false
        },
        listFunc: {
            require: true,
        },
        showPage: {
            type: Boolean,
            default: true
        },
        queryParams: {
            type: Object,
            default: () => {
            }
        },
        defaultSort: {
            type: Array,
            default: () => []
        },
        maxFields: {
            type: Array,
            default: ()=>[]
        }
    }
}
