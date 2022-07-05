<template>
    <div class=" h-100 p-flex justify-content-center align-items-center">
        <el-empty :description="description" :image-size="imgSize"></el-empty>
    </div>
</template>
<script>
export default {
    name: "PeanutEmpty",
    props: {
        //描述文字
        description: {
            type: String,
            default: "暂无数据"
        },
        //图片尺寸l
        imgSize: {
            type: Number,
            default: 150
        }
    }
}
</script>
