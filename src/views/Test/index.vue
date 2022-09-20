<template>
    <div class="test">
        <iframe class="innerFrame" src="https://binaryify.github.io/NeteaseCloudMusicApi/#/?id=%e5%ae%89%e8%a3%85"></iframe>
    </div>

</template>
<script>

// 1.需要用到的地方引入 Clipboard
import Clipboard from 'clipboard'

// 2.用触发操作对象实例化一个 clipboard 对象
var clipboard = new Clipboard(".copyBtn");


export default {
    name: "test",
}

</script>
<style lang="scss" scoped>
.test {
    width: 100%;
    height: 100%;
    .innerFrame{
        height: 100%;
        width: 100%;
        border: none;
    }
}

</style>
