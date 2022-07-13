<template>
    <div class="information">
        <peanut-descriptions
            :description-config="descriptionConfig"
            :description-data.sync="descriptionData"
            title="个人信息"
            :column="1"
        >
        </peanut-descriptions>
    </div>
</template>
<script>
import descriptionConfig from './informationConfig'

export default {
    name: "information",
    data() {
        return {
            descriptionData: {
                name: "peanut",
                age: 23
            },
            descriptionConfig,
        }
    },

}

</script>
<style lang="scss" scoped>
.information {
    padding: 8px;

}

</style>
