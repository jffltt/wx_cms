<template>
  <div>
    <div class="page-top">
      <el-button type="primary">添加</el-button>
      <el-button type="primary">全部选中</el-button>
      <el-button type="danger" @click="deleteMetrail">删除</el-button>
    </div>
    <div class="page-content" v-loading="loading">
      <div class="material-img" v-for="(item, index) in materialList" :key="index">
        <div class="operate">
          <el-checkbox v-model="item.checked" style="margin-right: 15px"></el-checkbox>
          <span>{{item.name}}</span>
        </div>
        <el-image :src="item.url" class="img-item" fit="cover"></el-image>
      </div>
    </div>
    <el-pagination class="pagination" background layout="total, prev, pager, next" :total="materialCount" @current-change="changePage"></el-pagination>
  </div>
</template>

<script>
import {post} from "@/api/public";
export default {
  data() {
    return {
      materialList: [1, 1, 1, 1, 1, 1, 1],
      page: 1,
      size: 15,
      materialCount: 0,
      loading: true,
    };
  },

  methods: {
    getMaterialList() {
      this.loading = true;
      let data = {
        method: "post",
        url: "https://api.weixin.qq.com/cgi-bin/material/batchget_material?access_token",
        params: {
          type: "image",
          offset: (this.page - 1) * this.size,
          count: this.size,
        },
      };
      post("/wx/curlApi", data).then((res) => {
        this.materialList = res.data.item;
        this.materialCount = res.data.total_count;
        this.loading = false;
      });
    },

    changePage(page) {
      this.page = page;
      this.getMaterialList();
    },

    deleteMetrail() {
      // let selectedList = this.materialList.filter(item => {return item.checked})
      // console.log(selectedList)
      window.open("/editor.html")
    }
  },

  created() {
    this.getMaterialList();
  },
};
</script>

<style lang="less" scoped>
.page-top{
  border-bottom: 1px solid #ccc;
  margin-bottom: 10px;
  padding-bottom: 15px;
}
.material-img{
  width: 20%;
  height: 200px;
  float: left;
  text-align: center;
  margin-bottom: 15px;
  .operate{
    background-color: rgb(236, 236, 236);
    width: 96%;
    margin-left: 2%;
  }
  .img-item{
    width: 96%;
    height: 170px;
  }
}
.page-content{
  height: 600px;
}
.pagination{
  float: right;
  margin-top: 20px;
}
</style>