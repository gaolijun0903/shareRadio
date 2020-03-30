<template>
    <div class="container">
        <TopMenu></TopMenu>
        <YScrollList></YScrollList>
    </div>
</template>

<script>
import TopMenu from "./TopMenu.vue";
import YScrollList from "./YScrollList.vue";

export default {
    name: "LiveBroadcast",
    components: {
        TopMenu,
        YScrollList
    }
}
</script>

<style scoped>
.container{
    width: 100%;
    height: 100%;
}
</style>