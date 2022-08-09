<template>
    <div class="perfect-world">
        <div class="perfect-world-info">
            <el-popover
                placement="right"
                width="400"
                trigger="hover"
                :content="infoText">
                <div slot="reference">
                    <video width="400px" src="./videos/shihao.mp4" controls loop></video>
                </div>
            </el-popover>
            <div class="perfect-world-info-right">
                <div v-for="(item,index) in infoList" class="perfect-world-info-right-item" :key="index">
                    <div class="text-bold font-bold text-right" style="width: 100px">{{ item.label }}：</div>
                    <div class="font-bold w-0 flex-1">{{ item.value }}</div>
                </div>

            </div>
        </div>
        <div class="perfect-world-iframe">
            <div class="perfect-world-iframe-person">
                <div class="perfect-world-iframe-person-item" v-for="item in personList" :key="item.id"
                     @click="showDetail(item)">
                    <el-image style="width: 80px;height: 120px"
                              :src="require(`./images/${item.value}/${item.value}_001.png`)"></el-image>
                    <div class="mt-16 font-bolder text-bolder">{{ item.name }}</div>
                </div>
            </div>
            <iframe src="//player.bilibili.com/player.html?aid=513797643&bvid=BV1cg411f7ah&cid=782336903&page=1"
                    class="perfect-world-iframe-content" scrolling="no" border="0" frameborder="no" framespacing="0"
                    allowfullscreen="true"></iframe>
        </div>
        <el-dialog
            :visible.sync="visible"
            :title="currentCard.name+'详细信息'"
        >
            <el-carousel :interval="2000">
                <el-carousel-item v-for="item in currentCard.count" :key="item + currentCard.name"
                                  class="p-flex justify-content-center align-items-center">
                    <el-image
                        :src="require(`./images/${currentCard.value}/${currentCard.value}_00${item}.png`)" style="width: 260px ;height: 300px"></el-image>
                </el-carousel-item>
            </el-carousel>
            <div class="font-bolder mt-16 text-bolder">具体事迹</div>
            <div v-for="(item,index) in currentCard.achievements" class="mt-8" :key="index">
                {{ index + 1 + '、' + item }}
            </div>
        </el-dialog>
    </div>
</template>
<script>
import {getBookInfo, getPersonInfo} from "../../api/perfect";

export default {
    name: "PerfectWorld",
    data() {
        return {
            infoList: [],
            infoText: "一粒尘可填海，一根草斩尽日月星辰，弹指间天翻地覆。群雄并起，万族林立，诸圣争霸，乱天动地。问苍茫大地，谁主沉浮?!",
            currentCard: {},
            visible: false,
            personList: []
        }
    },
    mounted() {
        getBookInfo().then(res => {
            this.infoList = res?.result
        })
        getPersonInfo().then(res => {
            this.personList = res?.result
        })
    },
    methods: {
        showDetail(val) {
            this.currentCard = val
            this.visible = true
        }
    }
}

</script>
<style lang="scss" scoped>
.perfect-world {
    display: flex;
    background-color: #FFFFFF;
    flex-direction: column;

    &-info {
        display: flex;
        border-radius: 4px;
        border: 4px #5EADFF solid;
        margin-bottom: 8px;
        padding: 8px;

        &-right {
            display: flex;
            flex-wrap: wrap;

            &-item {
                width: 50%;
                display: flex;
                flex-wrap: wrap;
            }
        }
    }

    &-iframe {
        height: 0;
        flex: 1;
        display: flex;

        &-person {
            flex: 0.3;
            border-radius: 4px;
            border: 4px #5EADFF solid;
            margin-right: 8px;
            display: flex;
            flex-wrap: wrap;
            padding: 8px;
            justify-content: space-around;

            &-item {
                width: 25%;
                display: flex;
                padding: 8px;
                justify-content: center;
                flex-direction: column;
                align-items: center;

                &:hover {
                    cursor: pointer;
                    border-radius: 4px;
                    background-color: rgba(6, 131, 238, 0.2);
                }

            }
        }

        &-content {
            flex: 0.7;
            border-radius: 4px;
            border: 4px #5EADFF solid;
        }
    }

}

</style>
