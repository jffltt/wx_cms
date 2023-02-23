<template>
  <div class="app-content">
    <div class="mobile-header" v-if="isMobile"></div>
    <div class="pc-header" v-else>
      <div>
        XXX技术有限责任公司
      </div>
      <div>
        <div>
          <span v-for="(item, index) in menuList" :key="index" :class="currentPath === item.path ? 'active-nav' : ''"
            @click="navGetTo(item)">
            <HomeFilled class="icon" />
            <span class="nav-item">{{ item.name }}</span>
          </span>
        </div>
      </div>
      <div>
        <el-button type="primary" text>Login</el-button>
      </div>
    </div>
    <div class="content">
      <div class="main">
        <router-view></router-view>
      </div>
      <div class="footer">
        <div>
          <h3>友情链接</h3>
          <el-row>
            <el-col v-for="i in 15" :span="6" :key="i">百度还是的后果</el-col>
          </el-row>
          <div style="margin-top: 10px;">联系电话：05112541548 地址：江苏省镇江市京口区大西路286号 邮箱：zjshylgbb@163.com</div>
        </div>
        <div>XXX技术有限责任公司版权所有 @2018~2022</div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed, provide, ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
let color = ref('red');
const router = useRouter();

let menuList = reactive([
  { name: '首页', path: '/index/home', icon: '' },
  { name: '关于我们', path: '/index/about', icon: '' },
  { name: '新闻动态', path: '/index/news', icon: '' },
  { name: '联系我们', path: '/index/connect', icon: '' },
])

let currentPath = ref('/index/home');

let isMobile = computed(() => {
  return document.body.clientWidth > 800 ? false : true;
});

function navGetTo(item) {
  this.currentPath = item.path;
  router.push({ path: item.path })
}

let activeName = ref('home');
console.log(activeName);
provide('isMobile', isMobile);
</script>
<style scoped lang="less">
.app-content {
  width: 100vw;
  height: 100vh;
  overflow: hidden;

  .pc-header {
    height: 99px;
    text-align: center;
    border-bottom: 1px solid #d1d1d1;
    background-color: #ffffff;

    &>div:nth-child(1) {
      height: 100px;
      width: 200px;
      float: left;
    }

    &>div:nth-child(2) {
      width: calc(100vw - 400px);
      height: 100px;
      float: left;
      text-align: center;

      &>div {
        &>span {
          display: inline-block;
          font-size: 18px;
          padding: 39px;
          cursor: pointer;
        }


        & :hover,
        .active-nav {
          background-color: v-bind('color');
          color: white;
        }

        .nav-item {
          float: left;
        }

        .icon {
          float: left;
          height: 1rem;
          width: 1rem;
          margin: 0 5px;
          margin-top: 5px;
        }
      }
    }

    &>div:nth-child(3) {
      width: 200px;
      height: 100px;
      float: left;
    }
  }

  .mobile-header {
    height: 100px;
    text-align: center;
    border-bottom: 1px solid #cccccc;
  }

  .content {
    height: calc(100vh - 100px);
    overflow: auto;
    .main {
      background-color: #f1f1f1;
      min-height: calc(100vh - 400px);
    }

    .footer {
      background-color: #5c5c5c;
      height: 300px;
      padding: 0;

      &>div:nth-child(1) {
        color: #ffffff;
        height: 255px;
        width: 80%;
        margin: 0 auto;
        line-height: 35px;
      }

      &>div:nth-child(2) {
        color: #ffffff;
        background-color: #000000;
        line-height: 45px;
        text-align: center;
      }
    }
  }
}
</style>
