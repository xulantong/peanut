<template>
    <div class="scroll" :class="direction" @mousedown="clickTrackHandler">
        <div class="scroll-thumb" :style="thumbStyle" @mousedown="clickThumbHandler"/>
    </div>
</template>
<script>
import {off, on} from "element-ui/src/utils/dom";

export const axisMap = {
    Y: {
        offset: 'offsetHeight',
        scroll: 'scrollTop',
        scrollSize: 'scrollHeight',
        size: 'height',
        client: 'clientY',
        direction: 'top'
    },
    X: {
        offset: 'offsetWidth',
        scroll: 'scrollLeft',
        scrollSize: 'scrollWidth',
        size: 'width',
        client: 'clientX',
        direction: 'left'
    }
};

export default {
    name: "TableScrollbar",
    props: {
        direction: {
            type: String,
            default: "vertical",
            validator: (value) => ['horizontal', 'vertical'].indexOf(value) > -1
        }
    },
    data() {
        return {
            move: 0,
            bodyWrapper: null
        };
    },
    computed: {
        thumbStyle() {
            let axis = this.direction === "vertical" ? "Y" : "X";
            const style = {};
            const translate = `translate${axis}(${ this.move }%)`;
            style.transform = translate;
            style.msTransform = translate;
            style.webkitTransform = translate;
            if (this.bodyWrapper) {
                if (axis === "X") {
                    const {scrollWidth, clientWidth} = this.bodyWrapper;
                    let percent = clientWidth * 100 / scrollWidth;
                    if (percent < 100) {
                        style.width = percent + "%";
                    }
                } else {
                    const {scrollHeight, clientHeight} = this.bodyWrapper;
                    let percent = clientHeight * 100 / scrollHeight;
                    if (percent < 100) {
                        style.height = percent + "%";
                    }
                }
            }
            return style;
        },
    },
    mounted() {
        this.bodyWrapper = this.$el.parentNode.querySelectorAll("div")[0];
        this.bodyWrapper.addEventListener('scroll', this.syncPosition, {passive: true});
    },
    beforeDestroy() {
        this.bodyWrapper.removeEventListener('scroll', this.syncPosition, {passive: true});
    },
    methods: {
        syncPosition() {
            const {scrollLeft, scrollTop, clientHeight, clientWidth} = this.bodyWrapper;
            if (this.direction === "vertical") {
                this.move = ((scrollTop * 100) / clientHeight);
            } else {
                this.move = ((scrollLeft * 100) / clientWidth);
            }
        },
        clickThumbHandler(e) {
            if (e.ctrlKey || e.button === 2) {
                return;
            }
            let axis = this.direction === "vertical" ? "Y" : "X";
            this.startDrag(e);
            let options = axisMap[axis];
            this.mouseDownPosition = (e.currentTarget[options.offset] - (e[options.client] - e.currentTarget.getBoundingClientRect()[options.direction]));
        },
        clickTrackHandler(e) {
            let axis = this.direction === "vertical" ? "Y" : "X";
            let options = axisMap[axis];
            const offset = Math.abs(e.target.getBoundingClientRect()[options.direction] - e[options.client]);
            const thumbHalf = (this.$el.querySelector(".scroll-thumb")[options.offset] / 2);
            const thumbPositionPercentage = ((offset - thumbHalf) * 100 / this.$el[options.offset]);

            this.bodyWrapper[options.scroll] = (thumbPositionPercentage * this.bodyWrapper[options.scrollSize] / 100);
        },
        startDrag(e) {
            e.stopImmediatePropagation();
            this.cursorDown = true;
            on(document, 'mousemove', this.mouseMoveDocumentHandler);
            on(document, 'mouseup', this.mouseUpDocumentHandler);
            document.onselectstart = () => false;
        },
        mouseMoveDocumentHandler(e) {
            if (this.cursorDown === false || !this.mouseDownPosition) return;
            let axis = this.direction === "vertical" ? "Y" : "X";
            let options = axisMap[axis];
            const offset = ((this.$el.getBoundingClientRect()[options.direction] - e[options.client]) * -1);
            const thumbClickPosition = (this.$el.querySelector(".scroll-thumb")[options.offset] - this.mouseDownPosition);
            const thumbPositionPercentage = ((offset - thumbClickPosition) * 100 / this.$el[options.offset]);
            this.bodyWrapper[options.scroll] = (thumbPositionPercentage * this.bodyWrapper[options.scrollSize] / 100);
        },
        mouseUpDocumentHandler(e) {
            this.cursorDown = false;
            this.mouseDownPosition = 0;
            off(document, 'mousemove', this.mouseMoveDocumentHandler);
            document.onselectstart = null;
        }
    }
}
</script>
<style scoped lang="scss">
.scroll {
    position: absolute;
    z-index: 4;
    padding: 2px;
    opacity: 0;

    .scroll-thumb {
        background-color: rgba(0, 0, 0, 0.25);
        border-radius: 3px;
        cursor: pointer;

        &:hover {
            background-color: rgba(0, 0, 0, 0.45);
        }
    }

    &.horizontal {
        left: 0;
        bottom: 0;
        height: 10px;
        width: 100%;

        .scroll-thumb {
            width: 0;
            height: 6px;
        }
    }

    &.vertical {
        top: 0;
        right: 0;
        height: 100%;
        width: 10px;

        .scroll-thumb {
            width: 6px;
            height: 0;
        }
    }
}
</style>
