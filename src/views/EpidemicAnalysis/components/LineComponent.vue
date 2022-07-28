<template>
    <div class="line-component">
        <div class="line-component-main" ref="main"></div>
    </div>
</template>
<script>
export default {
    name: "LineComponent",
    props: {
        lineData: {
            type: Array,
            default: () => []
        }
    },
    watch: {
        lineData() {
            this.init()
        }
    },
    methods: {
        init() {
            let myEchart = this.$echarts.init(this.$refs.main)
            let option = {
                xAxis: {
                    type: 'category',
                    name: "月份",
                    data: this.lineData.map(item => item.time)
                },
                yAxis: {
                    type: 'value',
                    name: "病例数"
                },
                tooltip: {
                    trigger: "axis",
                    formatter: (data) => {
                        return `月份：${data[0].axisValue}<br/>新增：<span style="color: #E83132">${data[0].data}</span>`
                    }
                },
                series: [
                    {
                        data: this.lineData.map(item => item.value),
                        type: 'line',
                        smooth: true,
                        symbol: 'none',
                        lineStyle: {
                            color: '#E83132'
                        }
                    }
                ]
            }
            option && myEchart.setOption(option)
        }
    }
}

</script>
<style lang="scss" scoped>
.line-component {
    width: 100%;
    height: 100%;

    &-main {
        width: 100%;
        height: 100%;
    }
}

</style>
