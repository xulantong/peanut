<template>
    <div class="test">
        <!--        <iframe class="innerFrame" src="https://binaryify.github.io/NeteaseCloudMusicApi/#/?id=%e5%ae%89%e8%a3%85"></iframe>-->
        <el-table
            class="table"
            :data="listData"
            border
            row-key="id"
        >
            <el-table-column width="40">
                <span class="drag-icon"><el-icon class="el-icon-menu "/></span>
            </el-table-column>
            <el-table-column
                label="姓名"
                prop="name"
            >
            </el-table-column>
            <el-table-column
                label="年龄"
                prop="age"
            >
            </el-table-column>
        </el-table>
    </div>

</template>
<script>

// 1.需要用到的地方引入 Clipboard
import Clipboard from 'clipboard'
import Sortable from "sortablejs";

// 3.用触发操作对象实例化一个 clipboard 对象
var clipboard = new Clipboard(".copyBtn");


export default {
    name: "test",
    data() {
        return {
            listData: [
                {name: '1', age: 1, id: '1'},
                {name: '2', age: 2, id: '2'},
                {name: '3', age: 3, id: '3'},
            ],
            sortable: null
        }
    },
    mounted() {
        this.initSortable()
    },
    methods: {
        initSortable() {
            if (this.sortable) {
                return;
            }
            let el = document.querySelector(".el-table__body-wrapper tbody");
            el && (this.sortable = Sortable.create(el, {
                //  指定父元素下可被拖拽的子元素
                draggable: ".el-table__row",
                // css选择器的字符串 若设置该值，则表示只有按住拖动手柄才能使列表单元进行拖动
                handle: ".drag-icon",
                onEnd: ({newIndex, oldIndex}) => {
                    this.updateTable(newIndex, oldIndex);
                }
            }));
        },
        updateTable(newIndex, oldIndex) {
            console.log(newIndex, oldIndex)
            console.log(this.listData.map(item => item.id))
            let temp = this.listData[oldIndex]
            this.listData.splice(oldIndex, 1)
            this.listData.splice(newIndex, 0, temp)
            console.log(this.listData.map(item => item.id))
        },
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
