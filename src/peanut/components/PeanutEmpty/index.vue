<template>
    <div class=" h-100 p-flex justify-content-center align-items-center">
        <el-empty :description="description" :image-size="imgSize"></el-empty>
    </div>
</template>
<script>
export default {
    name: "PeanutEmpty",
    props: {
        description: {
            type: String,
            default: "暂无数据"
        },
        imgSize: {
            type: Number,
            default: 200
        }
    }
}
</script>
