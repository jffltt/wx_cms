<template>
  <div v-bind="$attrs">
    <div class="toolBar">
      <el-button class="tool-item" size="small" type="primary" @click="activeClassBox">批量归类</el-button>
      <el-button class="tool-item" size="small" auto-insert-space type="primary" :disabled="limitExportSerach"
        @click="exportSearchArticle">导出</el-button>
      <el-button type="primary" size="small" @click="addManually">添加微信公众号图文链接</el-button>
    </div>
    <el-table :data="list" height="76vh" v-loading="loading" stripe border @selection-change="selecteArticle"
      ref="articleTabel">
      <el-table-column type="selection" width="55" align="center" fixed="left" />
      <el-table-column width="600">
        <template #header>
          <span class="label">标题</span>
          <StringFilter class="label-icon" v-model:keyWord="search.title"></StringFilter>
        </template>
        <template #default="{ row }">
          <el-tooltip effect="light" :content="row.title" placement="top">
            <span class="label-text">{{ row.title }}</span>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column width="200">
        <template #header>
          <span class="label">分类</span>
          <ListFilter class="label-icon" :list="classList" v-model:checkList="search.classList"></ListFilter>
        </template>
        <template #default="{ row }">
          <span>{{ columnMap[row.article_class] }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="sort" label="排序权重" width="150" align="center">
        <template #default="{ row }">
          <span>{{ row.sort }}</span>
          <el-popover placement="bottom" :width="400" :visible="showEditId === row.id">
            <template #reference>
              <el-button type="primary" link style="margin-left: 16px" @click="showEditId = row.id">修改</el-button>
            </template>
            <div style="width: 360px">
              <el-input v-model="row.sort" style="width: 100%"></el-input>
              <el-button @click="updateArticle(row)" style="float: right; margin-top: 20px" size="small"
                type="primary">保存</el-button>
              <el-button @click="showEditId = 0" style="float: right; margin-top: 20px; margin-right: 10px;" size="small"
                type="info">取消</el-button>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column width="240">
        <template #header>
          <span class="label">发布日期</span>
          <DateFilter class="label-icon" v-model:dateDate="search.date"></DateFilter>
        </template>
        <template #default="{ row }">
          <span>{{ row.create_time }}</span>
        </template>
      </el-table-column>
      <el-table-column width="600">
        <template #header>
          <span class="label">文章链接</span>
          <StringFilter class="label-icon"></StringFilter>
        </template>
        <template #default="{ row }">
          <span class="label-text">{{ row.url }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="130px" fixed="right" align="center">
        <template #header>
          <span style="margin-right: 10px">操作</span>
          <el-tag style="cursor: pointer" @click="search = { classList: [] }">清除筛选</el-tag>
        </template>
        <template #default="{ row }">
          <tip-icon text="编辑" :icon="Edit" @click="openEdit(row)"></tip-icon>
          <el-popconfirm title="将永久删除这篇文章，您确定要删除吗?" @confirm="submitDelete(row.id)">
            <template #reference>
              <tip-icon text="删除" :icon="Delete" type="danger"></tip-icon>
            </template>
          </el-popconfirm>
          <tip-icon text="查看" type="success" @click="view(row)" :icon="View"></tip-icon>
          <tip-icon text="归类" type="primary" @click="activeClassBox(row)" :icon="Connection"></tip-icon>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination class="el-pagination" background :page-size="size" layout="total, jumper, pager, next" :total="total"
        @current-change="changePage" />
    </div>
    <Classified v-if="confirmClassShow" :classList="classList" @confirm="confirmClassified" @cancel="cancleClassified">
    </Classified>
    <AddManually v-if="addManuallyShow" :classList="classList" @confirm="confirmAddArticle" :edit-data="editData" @cancel="cancelAddArticle">
    </AddManually>
  </div>
</template>

<script>
import StringFilter from "../../../components/string-filter.vue";
import ListFilter from "../../../components/list-filter.vue";
import DateFilter from "../../../components/date-filter.vue";
import Classified from "../../../components/classified.vue";
import AddManually from "../../../components/add-manually.vue";
import TipIcon from "@/components/tip-icon.vue";
import createExcel from "@/api/exportXlsx.js";
import { get, post, patch, remove} from '@/api/public';
export default {
  components: {
    StringFilter,
    ListFilter,
    DateFilter,
    Classified,
    AddManually,
    TipIcon,
  },
  data() {
    return {
      list: [],
      page: 1,
      size: 20,
      total: 0,
      loading: true,
      columnMap: {},
      classList: [],
      search: {
        classList: [],
      },
      checkedList: [],
      confirmClassShow: false,

      currentClassId: 0,
      addManuallyShow: false,
      showEditId: 0,
      limitExportSerach: false,
      editData: undefined,
    };
  },
  mounted() {
    this.getArticleTypes().then((res) => {
      if (res === "success") {
        this.getList();
      }
    });
  },
  watch: {
    search: {
      handler: function () {
        this.page = 1;
        this.getList();
      },
      deep: true,
    },
  },
  methods: {
    getList() {
      this.loading = true;
      let params = {
        page: this.page,
        size: this.size,
        title: this.search.title,
        article_class: this.search.classList.join(','),
      }
      get("/wx_article_manage", params).then((res) => {
        this.list = res.data.results;
        this.total = res.data.count;
        this.loading = false;
      });
    },

    getArticleTypes() {
      return new Promise((resolve) => {
        get("/wx_article_class_manage/all")
          .then((res) => {
            this.classList = res.data;
            res.data.forEach((val) => {
              this.columnMap[val.id] = val.column_name;
            });
            resolve("success");
          })
      });
    },
    view(row) {
      window.open(row.url);
    },
    changePage(page) {
      this.loading = true;
      this.page = page;
      this.getList();
    },

    selecteArticle(data) {
      this.checkedList = data;
    },

    activeClassBox(row = {}) {
      if (row?.id) {
        this.checkedList = [row];
      }
      if (!this.checkedList.length) {
        this.$message.warning("请选择要归类的文章");
      } else {
        this.confirmClassShow = true;
      }
    },

    cancleClassified() {
      this.checkedList = [];
      this.$refs.articleTabel.clearSelection();
      this.confirmClassShow = false;
    },

    confirmClassified(article_class) {
      let params = {
        article_class: article_class,
        ids: [],
      };
      this.checkedList.map((item) => {
        params.ids.push(item.id);
      });

      post("/wx_article_manage/classification/", params).then(() => {
        this.$message.success("设置栏目分类成功");
        this.page = 1;
        this.getList();
        this.confirmClassShow = false;
      });
    },

    updateArticle(row) {
      row.updater = localStorage.getItem('userName');
      patch(`/wx_article_manage/${row.id}/`, row).then(() => {
        this.$message.success("编辑已保存");
        this.showEditId = 0;
        this.page = 1;
        this.getList();
      });
    },

    cancelAddArticle() {
      this.addManuallyShow = false;
    },

    addManually() {
      this.addManuallyShow = true;
    },

    confirmAddArticle() {
      this.getList();
      this.addManuallyShow = false;
    },

    exportSearchArticle() {
      let fileName = "文章列表" + new Date().getTime();
      let columnName = "标题,归属栏目,文章链接,排序,导入时间";
      let columnValue = "title,article_class,url,sort,create_time";
      get("/wx_article_manage", {
        condition: this.search,
        page: 1,
        size: this.total,
      },)
        .then((res) => {
          let data = res.data.results;
          createExcel({
            fileName,
            columnName,
            columnValue,
            data,
          });
        });
    },

    async submitDelete(id) {
      try {
        await remove(`/wx_article_manage/${id}`)
        this.$message.success('文章已删除');
        this.getList();
      } catch {
        this.$message.error('删除出错, 请检查网络请求');
      }
    },

    openEdit(row) {
      this.editData = row;
      this.addManuallyShow = true;
    }
  },
};
</script>

<script setup>
import { Edit, Delete, View, Connection } from '@element-plus/icons-vue';
</script>

<style lang="less" scoped>
.toolBar {
  width: 100%;
  height: 45px;
  background-color: rgb(233, 233, 233);
  line-height: 45px;

  .tool-item {
    margin-left: 10px;
  }
}

.pagination {
  height: 45px;
  float: right;
  margin-top: 5px;
}

.label {
  margin-top: 5px;
  float: left;
}

.label-icon {
  margin-top: 5px;
  float: right;
}

.label-text {
  width: 100%;
  word-wrap: break-word;
  /*强制换行*/
  overflow: hidden;
  /*超出隐藏*/
  text-overflow: ellipsis;
  /*隐藏后添加省略号*/
  white-space: nowrap;
  /*强制不换行*/
}
</style>
