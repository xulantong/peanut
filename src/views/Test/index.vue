<template>
    <div class="test">
        <!--        <iframe class="innerFrame" src="https://binaryify.github.io/NeteaseCloudMusicApi/#/?id=%e5%ae%89%e8%a3%85"></iframe>-->
        <disco-remote-table
            class="table"
            :list-func="loadList"
            border
        >
            <template slot="columns">
                <el-table-column
                    label="姓名"
                    prop="name"
                >
                </el-table-column>
                <el-table-column
                    label="年龄"
                    :filters="[]"
                    prop="age"
                >
                </el-table-column>
            </template>

        </disco-remote-table>
    </div>

</template>
<script>

// 1.需要用到的地方引入 Clipboard
import Clipboard from 'clipboard'

// 2.用触发操作对象实例化一个 clipboard 对象
var clipboard = new Clipboard(".copyBtn");


export default {
    name: "test",
    data() {
        return {}
    },
    methods: {
        loadList(params) {
            return Promise.resolve({
                result: [
                    {name: '1', age: 1},
                    {name: '1', age: 1},
                    {name: '1', age: 1},
                    {name: '1', age: 1},
                    {name: '1', age: 1},
                ]
            })
        }

    }
}

</script>
<style lang="scss" scoped>
.test {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    background-color: #FFFFFF;
    padding: 8px;

    .innerFrame {
        height: 100%;
        width: 100%;
        border: none;
    }

    .table {
        height: 0;
        flex: 1;
    }
}

</style>
