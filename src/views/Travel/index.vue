<template>
    <div class="blob">
        <div class="out-box">
            <div v-for="item in 6" :class="'box'+item">
                <el-image style="width: 400px; height: 400px" :src="require(`./images/0${item}.png`)"></el-image>
            </div>
        </div>
        <div class="blob-container">
            <div class="blob-container-header">
                <div class="item" v-for="item in blobList">
                    <div class="text-bolder font-bold"><span class="title" @click="handleClick(item)">{{ item.title }}</span></div>
                    <div>{{ item.description }}</div>
                    <div class="p-flex mt-4 ml-8">
                        <div :class="'type-'+item.articleType">{{ item.articleType === 1 ? '原创' : '转载' }}</div>
                        <div class="ml-8">发布博客：{{ $dayjs(item.postTime).format('YYYY-MM-DD') }}</div>
                        <div class="ml-8"> {{ item.viewCount }}阅读</div>
                        <div class="ml-8"> {{ item.diggCount }}点赞</div>
                        <div class="ml-8"> {{ item.commentCount }}评论</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {getBlobList} from "../../api/blob";
import Vue from "vue";

export default {
    name: "Travel",
    data() {
        return {
            blobList: []
        }
    },
    methods: {
        handleClick(val) {
            window.open(val.url)
        }
    },
    mounted() {
        getBlobList().then(res => {
            this.blobList = res.result
        })
    }
}

</script>
<style lang="scss" scoped>
.blob {
    background-image: url("./images/universe.png");
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

    .out-box {
        position: relative;
        transform-style: preserve-3d;
        animation: rotate 5s infinite linear;
        @keyframes rotate {
            from {
                transform: rotateX(0) rotateY(0) rotateZ(0);
            }
            to {
                transform: rotateX(360deg) rotateY(360deg) rotateZ(360deg);
            }
        }

        div {
            position: absolute;
            transform: translate(-50%, -50%);
            opacity: 0.9;

        }

        //前
        .box1 {
            transform: rotateY(0deg) translateZ(200px);
        }

        //后
        .box2 {
            transform: rotateY(180deg) translateZ(200px);
        }

        //左
        .box3 {
            transform: rotateY(90deg) translateZ(200px);
        }

        //右
        .box4 {
            transform: rotateY(270deg) translateZ(200px);
        }

        //上
        .box5 {
            transform: rotateX(270deg) translateZ(200px);
        }

        //下
        .box6 {
            transform: rotateX(90deg) translateZ(200px);
        }
    }

    &-container {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        margin: 0 auto;
        padding: 8px;
        opacity: 1;
        width: 75%;
        display: flex;
        flex-direction: column;

        &-header {
            height: 0;
            flex: 1;
            margin: 8px 0;
            overflow-y: scroll;

            .item {
                padding: 16px 0;

                .title:hover {
                    cursor: pointer;
                    color: #e33e33;;
                }

                & + .item {
                    border-top: 1px #f0f0f0 solid;
                }

                .type-1 {
                    background-color: rgba(255, 192, 203, 0.8);
                    text-align: center;
                    color: #e33e33;
                    width: 34px;
                    height: 20px;
                    border-radius: 2px;
                    font-size: 12px;
                    margin-right: 8px;
                }
            }

        }
    }
}
</style>
