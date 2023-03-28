<template>
  <div class="header">
    <div class="site-name">
      <i>{{ siteName }}</i>
    </div>
    <div class="site-menu">
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect"
        :background-color="theme.headerBackground" :text-color="theme.headerTextColor"
        :active-text-color="theme.headerTextColor" unique-opened router>
        <el-menu-item index="/index/home">首页</el-menu-item>
        <el-menu-item index="/index/about">关于我们</el-menu-item>
        <el-menu-item index="/index/news">时事新闻</el-menu-item>
      </el-menu>
    </div>
    <div class="site-login">
      <el-dropdown trigger="click">
        <span class="user-name">{{ userName || '访客' }}</span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item v-if="!userName">注册</el-dropdown-item>
            <el-dropdown-item>{{ userName ? '退出登录' : '登录' }}</el-dropdown-item>
            <el-dropdown-item v-if="userName">修改密码</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
  <div class="site-content">
    <div class="site-main">
      <router-view></router-view>
    </div>
    <div class="site-foot">
      <div>
        <el-row>
          <el-col :span="8">
            <h3>友情链接</h3>
            <span class="link-item" v-for="i in 4" :key="i">23523</span>
          </el-col>
          <el-col :span="8">
            <h3>共享服务</h3>
            <span class="link-item" v-for="i in 4" :key="i">23523</span>
          </el-col>
          <el-col :span="8">
            <h3>联系方式</h3>
            <span class="link-item">地址：江苏省镇江市京口区运河路208号</span>
            <span class="link-item">联系电话：0511-85985266</span>
            <span class="link-item">邮箱：laoganbu@163.com</span>
          </el-col>
        </el-row>
      </div>
      <div class="record-info">
        <div>苏ICP备25487145号 镇江市行业老干部管理服务办公室 @1987~2023</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';

const theme = reactive({
  backgroundColor: '#cccccc',
  headerBackground: '#c21f1f',
  headerTextColor: '#ffffff',
  textColor: '#000000',
  footBackground: '#636363',
  footTextColor: '#ffffff',
})

let activeIndex = ref('1');
let siteName = ref('镇江市行业老干部管理服务办公室');
let userName = ref('admin');

</script>

<style scoped lang="less">
.header {
  height: 80px;
  background-color: v-bind('theme.headerBackground');
  color: v-bind('theme.headerTextColor');
  overflow: hidden;

  .site-name {
    width: calc(50vw - 500px);
    height: 80px;
    float: left;
    text-align: center;
    line-height: 80px;
    font-size: 1.2rem;
  }

  .site-login {
    width: calc(50vw - 500px);
    height: 80px;
    float: left;
    text-align: center;

    .user-name {
      cursor: pointer;
      color: v-bind('theme.headerTextColor');
      line-height: 80px;
    }
  }

  .site-menu {
    width: 1000px;
    float: left;
  }
}

.site-content {
  height: calc(100vh - 80px);
  width: 100vw;
  overflow-y: auto;

  .site-main {
    min-height: 700px;
  }

  .site-foot {
    background-color: v-bind('theme.footBackground');
    color: v-bind('theme.footTextColor');

    &>div {
      width: 1200px;
      margin: 0 auto;

      .link-item {
        display: block;
        line-height: 35px;
      }
    }

    .record-info {
      text-align: center;
      width: 100%;
      line-height: 35px;
      background-color: black;
    }
  }
}
</style>

<style >
.header .el-menu--horizontal {
  border-bottom: none;
  height: 80px;
}
</style>