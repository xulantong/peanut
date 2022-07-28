<template>
    <div class="bar-component">
        <div class="bar-component-top">
            统计维度：
            <el-select v-model="selectValue" @change="init">
                <el-option
                    v-for="item in selectData"
                    :label="item.name"
                    :value="item.code"
                    :key="item.code"
                ></el-option>
            </el-select>
        </div>
        <div ref="main" class="bar-component-bar"></div>
    </div>
</template>
<script>
import * as echarts from 'echarts';

export default {
    name: "BarComponent",
    props: {
        barData: {
            type: Array,
            default: () => []
        },
        selectData: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            selectValue: "mainland",
        }
    },
    watch: {
        selectData() {
            this.selectValue = this.selectData[0].code
            this.color = this.selectData.find(item => item.code === this.selectValue)?.color
            this.init()
        },
    },
    computed: {
        color() {
            return this.selectData.find(item => item.code === this.selectValue)?.color
        }
    },
    methods: {
        init() {
            let myChart = this.$echarts.init(this.$refs.main)
            let option = {
                xAxis: {
                    data: this.barData.map(item => item.name),
                    name: "地区",
                },
                yAxis: {
                    type: "value",
                    name: this.selectData.find(item => item.code === this.selectValue)?.name
                },
                tooltip: {
                    type: "axis"
                },
                series: [
                    {
                        type: 'bar',
                        itemStyle: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                {offset: 0, color: this.color[0]},
                                {offset: 0.4, color: this.color[1]},
                                {offset: 1, color: this.color[2]}
                            ])
                        },
                        data: this.barData.map(item => item[this.selectValue]),
                    }
                ]
            };
            myChart.setOption(option)
        }
    }
}

</script>
<style lang="scss" scoped>
.bar-component {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;

    &-top {
        display: flex;
        align-items: center;
        justify-content: flex-end;
    }

    &-bar {
        height: 0;
        flex: 1;
        width: 100%;
    }
}

</style>
