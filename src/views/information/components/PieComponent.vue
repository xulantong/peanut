<template>
    <div class="pie-component">
        <div ref="main" class="pie-component-main"></div>
    </div>
</template>
<script>
export default {
    name: "PieComponent",
    props: {
        pieData: {
            type: Array,
            default: () => [
                {value: 4, name: 'VUE2'},
                {value: 13, name: 'JavaScript'},
                {value: 1, name: 'VUE3'},
                {value: 0, name: 'CSS'},
            ]
        }
    },
    mounted() {
        this.init()
    },
    methods: {
        init() {
            let myChart = this.$echarts.init(this.$refs.main)
            let option = {
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    top: '5%',
                    left: 'center'
                },
                series: [
                    {
                        type: 'pie',
                        radius: ['40%', '70%'],
                        avoidLabelOverlap: false,
                        itemStyle: {
                            borderRadius: 10,
                            borderColor: '#fff',
                            borderWidth: 2
                        },
                        label: {
                            show: false,
                            position: 'center',
                            fontSize: '20'
                        },
                        emphasis: {
                            label: {
                                show: true,
                                fontSize: '20',
                                fontWeight: 'bold'
                            }
                        },
                        labelLine: {
                            show: false
                        },
                        data: this.pieData
                    }
                ]
            };
            option && myChart.setOption(option)
            myChart.off("click")
            myChart.on("click",params=>{
                window.open("https://blog.csdn.net/niepan990810","blank")
            })
        }
    }
}

</script>
<style lang="scss" scoped>
.pie-component {
    width: 100%;
    height: 300px;

    &-main {
        width: 100%;
        height: 100%;
    }
}

</style>
