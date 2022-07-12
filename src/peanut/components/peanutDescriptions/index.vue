<template>
    <el-descriptions
        :border="border"
        :column="column"
        :direction="direction"
        :size="size"
        :title="title"
        :extra="extra"
        :colon="colon"
    >
        <slot></slot>
    </el-descriptions>
</template>
<script>
import descriptions from "../../mixins/descriptions"

export default {
    name: "peanutDescriptions",
    mixins: [descriptions]
}

</script>
