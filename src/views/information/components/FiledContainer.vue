<template>
    <div class="FiledContainer" :class="{'column':!inline}">
        <template v-for="filed in fileds">
            <filed-item
                v-bind="filed"
                :edit="edit"
            >
            </filed-item>
        </template>
    </div>

</template>
<script>
import FiledItem from "./FiledItem";

export default {
    name: "FiledContainer",
    components: {FiledItem},
    props: {
        fileds: {
            type: Array,
            default: []
        },
        inline: {
            type: Boolean,
            default: true
        },
        edit: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {}
    },
    mounted() {
    }
}

</script>
<style lang="scss" scoped>
.FiledContainer {
    margin-bottom: 16px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
}

.column {
    flex-direction: column;
    align-items: flex-start;
}

</style>
