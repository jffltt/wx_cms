<template>
  <div class="menu-content">
    <div class="menu">
      <div class="menu-box">
        <div v-for="(menu, index) in menuList" :key="index" class="menu-item">
          <div class="sub-menu">
            <div class="sub-menu-item" v-for="(subMenu, i) in menu.sub_button.list" :key="i">
              <span class="sub-menu-label">{{subMenu.name}}</span>
            </div>
          </div>
          <span class="menu-label" @click="changeMenu(menu, index)">{{menu.name}}</span>
        </div>
      </div>
    </div>
    <div class="main">
      <el-form :model="currentMenu">
        <el-row>
          <el-col :span="6">
            <el-form-item label="菜单名称">
              <el-input  v-model="currentMenu.name"></el-input>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="2" :offset="1">
            <el-button type="primary" size="small" style="margin-top: 5px" @click="moveUp">前移</el-button>
          </el-col>
          <el-col :span="2">
            <el-button type="primary" size="small" style="margin-top: 5px" @click="moveDown">后移</el-button>
          </el-col>
          <el-col :span="2">
            <el-button type="danger" size="small" style="margin-top: 5px" @click="deleteMenu">删除</el-button>
          </el-col> -->
        </el-row>
      </el-form>
      <el-table :data="currentMenu.sub_button.list">
        <el-table-column label="专栏名称">
          <template #default="{row}">
            <el-input v-model="row.name"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="url地址">
          <template #default="{row}">
            <el-input v-model="row.url"></el-input>
          </template>
        </el-table-column>
      </el-table>
      <div class="tool">
        <el-button type="primary" @click="saveMenu">保存自定义菜单</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import {post} from "@/api/public.js";
export default {
  data () {
    return {
      menuList: [],
      currentMenu: {
        sub_button: {
          list: []
        }
      },
      currentIndex: 0,
    }
  },
  methods: {
    init() {
      let data = {
        method: "get",
        url: "https://api.weixin.qq.com/cgi-bin/get_current_selfmenu_info?access_token",
        params: {},
      };
      post("/wx/curlApi", data).then((res) => {
        this.menuList = res.data.selfmenu_info.button;
        this.currentMenu = this.menuList[0];
        this.currentIndex = 1;
      });
    },
    changeMenu(menu, index){
      this.currentMenu = menu;
      this.currentIndex = index;
    },
    deleteMenu() {

    },
    moveUp() {

    },
    moveDown() {
      let tmp = this.menuList[this.currentIndex + 1]
      this.menuList[this.currentIndex + 1] = this.currentMenu;
      this.menuList[this.menuList] = tmp;
    },
    saveMenu() {
      let newMenu = []
      this.menuList.map(menu => {
        newMenu.push({
          name: menu.name,
          sub_button: menu.sub_button.list,
        })
      })

      let data = {
        method: "post",
        url: "https://api.weixin.qq.com/cgi-bin/menu/create?access_token",
        params: {
          button: newMenu
        },
      };
      post("/wx/curlApi", data).then((res) => {
        if(res.data.errcode === 0) {
          this.$message.success("自定义菜单已保存,请到公众号查看")
        }
      })
    }
  },
  created() {
    this.init();
  },
};
</script>

<style scoped lang="less">
.menu-content{
  width: 100%;
  height: calc(100vh - 140px);
  .menu{
    width: 470px;
    height: calc(100% - 30px);
    border: 10px solid #ccc;
    padding: 5px;
    border-radius: 8px;
    position: relative;
    float: left;
    .menu-box{
      position: absolute;
      bottom: 5px;
      width: 470px;
      .menu-item{
        float: left;
        width: 32%;
        margin-left: 1%;
        cursor: pointer;
        .menu-label{
          display: block;
          height: 40px;
          text-align: center;
          line-height: 40px;
          background-color: #3e4c7a;
          color: #fff;
        }
        .sub-menu{
          width: 100%;
          background-color: #5e7ce0;
          cursor: pointer;
          color: white;
          .sub-menu-item{
            height: 35px;
            line-height: 35px;
            text-align: center;
            border-bottom: 1px solid #fff;
          }
        }
      }
    }
  }
  .main{
    width: calc(100% - 530px);
    height: calc(100% - 20px);
    padding: 10px;
    margin-left: 10px;
    background-color: #f1f1f1;
    float: left;
    position: relative;
    .tool{
      width: 100%;
      position: absolute;
      bottom: 10px;
      text-align: center;
      border-top: 1px solid #ccc;
      line-height: 45px;
    }
  }
}
</style>