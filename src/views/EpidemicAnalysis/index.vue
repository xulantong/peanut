<template>
    <div class="epidemic-analysis">
        <div class="epidemic-analysis-header">
            疫情大数据报告
        </div>
        <div class="epidemic-analysis-container">
            <div class="epidemic-analysis-container-left">
                <div class="p-flex justify-content-between align-items-center">
                    <el-button type="text">
                        <div class="font-bolder p-flex justify-content-between align-items-center">
                            国内疫情
                            <peanut-icon class="ml-4" icon-name="singleRight" :size="18"></peanut-icon>
                        </div>
                    </el-button>
                    <div>新增数据统计周期为昨日07.27 0-24时</div>
                </div>
                <div class="card-top">
                    <div v-for="(item,index) in currentCardList" :key="index" class="card-top-card">
                        <div>{{ item.title }}</div>
                        <div class="mt-4" :class="'card-'+item.type">{{ $formatThousands(item.value) }}</div>
                    </div>
                </div>
                <div class="card-bottom">
                    <div v-for="(item,index) in totalCardList" :key="index" class="card-bottom-card">
                        <div>{{ item.title }}</div>
                        <div class="mt-4" :class="'card-'+item.type">{{ $formatThousands(item.value) }}</div>
                        <div class="mt-4">较昨日<span class="ml-4" :class="'card-'+item.type">
                            {{ item.tb < 0 ? '-' : '+' + $formatThousands(item.tb) }}</span>
                        </div>
                    </div>
                </div>
                <div class="footer">
                    <LineComponent ref="line" :line-data="lineData"></LineComponent>
                </div>
            </div>
            <div class="epidemic-analysis-container-right">
                <div class="p-flex justify-content-between align-items-center">
                    <el-button type="text">
                        <div class="font-bolder p-flex justify-content-between align-items-center">
                            疫情速报
                            <peanut-icon class="ml-4" icon-name="singleRight" :size="18"></peanut-icon>
                        </div>
                    </el-button>
                </div>
                <div class="epidemic-analysis-container-right-table">
                    <bar-component type="mainland" ref="bar" :select-data="selectData" :bar-data="barData"></bar-component>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import LineComponent from "./components/LineComponent";
import {getBarData, getCardData, getLineData, getSelectData} from "../../api/epidemic";
import BarComponent from "./components/BarComponent";

export default {
    name: "EpidemicAnalysis",
    components: {BarComponent, LineComponent},
    data() {
        return {
            cardList: [],
            lineData: [],
            barData: [],
            selectData:[]
        }
    },
    computed: {
        currentCardList() {
            return this.cardList.filter(item => !item.tb)
        },
        totalCardList() {
            return this.cardList.filter(item => item.tb)
        },
    },
    mounted() {
        Promise.allSettled([getCardData(),getLineData(),getBarData(),getSelectData()]).then(res=>{
            console.log(res)
            const [result1,result2,result3,result4] = res
            this.cardList = result1.value.result
            this.lineData = result2.value.result
            this.barData = result3.value.result
            this.selectData = result4.value.result
            this.$refs.bar.init()
        })
    },
    methods: {}

}
</script>
<style lang="scss" scoped>
.epidemic-analysis {
    border-radius: 4px;
    padding: 8px;
    background: linear-gradient(to bottom, #239B9E, #43BDB9 75%, #FFFFFF 95%);
    display: flex;
    flex-direction: column;

    &-header {
        color: #FFFFFF;
        font-size: 30px;
        font-weight: 500;
    }

    &-container {
        display: flex;
        height: 0;
        flex: 1;
        margin-top: 8px;

        &-left {
            border-radius: 4px;
            padding: 8px;
            width: 0;
            flex: 0.4;
            display: flex;
            flex-direction: column;
            background-color: #FFFFFF;
            margin-right: 8px;

            .card-top {
                display: flex;
                flex-wrap: wrap;

                &-card {
                    width: 25%;
                    font-size: 14px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    padding: 12px 0;
                    margin-bottom: 8px;

                    &:hover {
                        border-radius: 16px;
                        background-color: rgba(82, 82, 82, 0.1);
                    }
                }


            }

            .card-bottom {
                border-top: 2px #f0f0f0 solid;
                display: flex;
                flex-wrap: wrap;

                &-card {
                    width: 25%;
                    font-size: 16px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    margin-top: 8px;
                    padding: 12px 0;

                    &:hover {
                        border-radius: 16px;
                        background-color: rgba(82, 82, 82, 0.1);
                    }
                }
            }

            .footer {
                height: 0;
                flex: 1;
            }
        }

        &-right {
            border-radius: 4px;
            padding: 8px;
            width: 0;
            flex: 0.6;
            display: flex;
            flex-direction: column;
            background-color: #FFFFFF;

            &-table {
                height: 0;
                flex: 1;
            }

        }
    }
}

.card-1 {
    color: #E83132;
}

.card-2 {
    color: #FF6A57;
}

.card-3 {
    color: #476DA0;
}

.card-4 {
    color: #10AEB5;
}


</style>
