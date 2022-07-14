<template>
    <div class="information">
        <content-resolver>

        </content-resolver>
    </div>
</template>
<script>

import ContentResolver from "./components/ContentResolver";
export default {
    name: "information",
    components: {ContentResolver},
    data() {
        return {
        }
    },

}

</script>
<style lang="scss" scoped>
.information {
    padding: 8px;

}
</style>
