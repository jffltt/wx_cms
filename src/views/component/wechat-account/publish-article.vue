<template>
  <div>
    <div class="page-top">
      <el-button type="success" size="small" @click="updateToSystem(selected)"
        >批量同步</el-button
      >
      <el-button type="primary" size="small" @click="navgatToEdit">添加文章</el-button>
    </div>
    <div class="page-content" v-loading="loading">
      <el-table
        :data="publishArticleList"
        row-key="id"
        border
        height="60vh"
        @selection-change="selectedData"
      >
        <el-table-column type="selection"></el-table-column>
        <el-table-column label="标题" sortable min-width="300">
          <template #default="{ row }">
            <el-popover
              placement="bottom"
              :width="600"
              trigger="hover"
              :content="row.title"
            >
              <template #reference>
                <span class="label-text">{{ row.title }}</span>
              </template>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          prop="is_update"
          label="是否已同步"
          sortable
          min-width="100"
          align="center"
        >
          <template #default="{ row }">
            <el-tag v-if="titleMap[row.title]" class="ml-2" type="success"
              >完成</el-tag
            >
            <el-tag v-else class="ml-2" type="warning">待同步</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="author" label="作者" sortable min-width="180" />
        <el-table-column label="url" sortable min-width="300">
          <template #default="{ row }">
            <el-popover
              placement="bottom"
              :width="600"
              trigger="hover"
              :content="row.url"
            >
              <template #reference>
                <span class="label-text">{{ row.url }}</span>
              </template>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180">
          <template #default="{ row }">
            <el-button size="small" type="primary" @click="copyUrl(row)"
              >复制URL</el-button
            >
            <el-button size="small" type="success" @click="updateToSystem(row)"
              >同步</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-pagination
      class="pagination"
      :page-size="size"
      background
      layout="total, prev, pager, next"
      :total="materialCount"
      @current-change="changePage"
    ></el-pagination>
  </div>
</template>

<script>
import {post} from "@/api/public.js";
export default {
  data() {
    return {
      publishArticleList: [],
      page: 1,
      size: 5,
      materialCount: 0,
      loading: true,
      selected: [],
      titleMap: {},
    };
  },
  methods: {
    getPublishArticleList() {
      this.loading = true;
      let data = {
        method: "post",
        url: "https://api.weixin.qq.com/cgi-bin/freepublish/batchget?access_token",
        params: {
          no_content: 0,
          offset: (this.page - 1) * this.size,
          count: this.size,
        },
      };
      post("/wx/curlApi", data).then((res) => {
        const list = [];
        const titles = [];
        this.materialCount = res.data.total_count;

        for (let row of res.data.item) {
          for (let col of row.content.news_item) {
            titles.push(col.title);
          }
        }

        post("/check_titles", { titles: titles }).then((checks) => {
          this.titleMap = {};
          for (let check of checks.data) {
            this.titleMap[check.title] = true;
          }
          for (let [index, item] of res.data.item.entries()) {
            let news = item.content.news_item.slice(0, 1)[0];
            news.children = item.content.news_item.slice(
              1,
              item.content.news_item.length
            );
            news.id = index;
            list.push(news);
          }
          this.publishArticleList = list;
          this.loading = false;
        });
      });
    },

    navgatToEdit() {
      window.location.href = "https://amasion.cn/ueditor/index.html";
    },

    changePage(page) {
      this.page = page;
      this.getPublishArticleList();
    },

    selectedData(data) {
      this.selected = data;
    },

    updateToSystem(data) {
      let list = data?.length === undefined ? [data] : data;
      if (!list.length) {
        this.$message.warning("请选择要同步的数据");
        return;
      }
      list = list.filter((item) => {
        return !this.titleMap[item.title];
      });
      if (!list.length) {
        this.$message.warning("你选择的数据中没有需要同步的");
        return;
      }

      let updateList = [];
      for (let item of list) {
        updateList.push({
          title: item.title,
          cover_img: item.thumb_url,
          content: item.content,
          url: item.url,
          sort: 0,
        });
        if (item.children) {
          for (let subItem of item.children) {
            updateList.push({
              title: subItem.title,
              cover_img: subItem.thumb_url,
              content: subItem.content,
              url: subItem.url,
              publish_time: subItem.publish_time,
              sort: 0,
            });
          }
        }
      }
      this.loading = true;
      post("/wx_article_manage/", { list: updateList, article_class: 16}).then(() => {
        this.$message.success("同步完成");
        this.getPublishArticleList();
      }).catch(() => {
        this.$message.error("同步失败");
      })
    },

    copyUrl(row) {
      let oInput = document.createElement("input");
      oInput.value = row.url;
      document.body.appendChild(oInput);
      oInput.select();
      document.execCommand("Copy");
      this.$message.success("复制成功");
      oInput.remove();
    },
  },

  created() {
    this.getPublishArticleList();
  },
};
</script>

<style lang="less" scoped>
.page-top {
  border-bottom: 1px solid #ccc;
  margin-bottom: 10px;
  padding-bottom: 15px;
}
.material-img {
  width: 20%;
  height: 200px;
  float: left;
  text-align: center;
  margin-bottom: 15px;
  .operate {
    background-color: rgb(236, 236, 236);
    width: 96%;
    margin-left: 2%;
  }
  .img-item {
    width: 96%;
    height: 170px;
  }
}
.page-content {
  height: 60vh;
  .label-text {
    width: 100%;
    word-wrap: break-word;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
.pagination {
  float: right;
  margin-top: 20px;
}
</style>