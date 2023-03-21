<template>
    <el-carousel indicator-position="outside" :height="isMobile ? '15rem' : '35rem'">
        <el-carousel-item v-for="item in 4" :key="item">
            <h3 text="2xl" justify="center">{{ item }}</h3>
        </el-carousel-item>
    </el-carousel>
</template>
<script setup>
import {inject} from 'vue';

let isMobile = inject('isMobile')

</script>
<style scoped lang="less">
.el-carousel__item h3 {
    display: flex;
    color: #475669;
    opacity: 0.75;
    margin: 0;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
}
</style>