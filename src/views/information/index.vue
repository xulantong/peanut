<template>
    <div class="information">
        <peanut-descriptions
            v-for="item in config"
            :description-config="item.descriptionConfig"
            :show-extra="item.showExtra"
            :description-data.sync="descriptionData"
            :title="item.title"
            :column="1"
            class="descriptions"
        >
        </peanut-descriptions>
    </div>
</template>
<script>
import config from './informationConfig'

export default {
    name: "information",
    data() {
        return {
            descriptionData: {
                name: "peanut",
                age: 23
            },
            config,
        }
    },

}

</script>
<style lang="scss" scoped>
.information {
    padding: 8px;

    .descriptions {
        & + .descriptions {
            margin-top: 25px;
            padding-top: 25px;
            border-top: 1px #e4e7ed solid;
        }
    }
}

</style>
