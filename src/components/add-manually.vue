<template>
  <div class="cover">
    <div class="wap">
      <div class="title">添加文章</div>
      <el-form
        :model="newArticle"
        class="content"
        label-position="top"
        ref="newArticle"
        :rules="rules"
      >
        <el-row>
          <el-col :span="11">
            <el-form-item label="选择栏目分类:" prop="article_class_id">
              <el-select
                v-model="newArticle.article_class_id"
                style="width: 100%"
              >
                <el-option
                  v-for="(item, index) in classList"
                  :key="index"
                  :label="item.clumn_name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="11" :offset="2">
            <el-form-item label="标题:" required prop="title">
              <el-input
                v-model="newArticle.title"
                placeholder="请输入标题"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="文章链接:" required prop="url">
          <el-input
            v-model="newArticle.url"
            placeholder="请输入标题"
          ></el-input>
        </el-form-item>
        <el-form-item label="封面:" required prop="thumb_url">
          <el-upload
            class="avatar-uploader"
            action="https://project.amasion.cn/base/richUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            ref="upload"
          >
            <img
              v-if="newArticle.thumb_url"
              :src="newArticle.thumb_url"
              class="avatar"
            />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>
      </el-form>
      <div class="operate">
        <el-button type="primary" size="small" @click="confirm">确认</el-button>
        <el-button type="info" size="small" @click="cancel">取消</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { Plus } from "@element-plus/icons-vue";
import request from "@/api/request.js";
export default {
  components: { Plus },
  data() {
    return {
      list: [],
      classId: 0,
      newArticle: {
        content: "手动导入没有内容",
        thumb_url: "",
      },
      rules: {
        article_class_id: [{required: true, message: '请选择栏目分类', trigger: 'change'}],
        url: [{required: true, message: '请输入文章链接', trigger: 'blur'}],
        thumb_url: [{required: true, message: '请上传封面', trigger: 'change'}],
        title: [{required: true, message: '输入标题', trigger: 'blur'}]
      }
    };
  },
  props: {
    classList: [Array],
  },
  mounted() {
    this.list = [...this.classList];
  },
  methods: {
    async confirm() {
      await this.$refs.newArticle.validate((valid, fields) => {
        if (valid) {
          let params = {
            params: this.newArticle
          }
          request.post("/wx/AddArticleManually", params).then(res => {
            if(res.data.code === '0000') {
              this.$message.success("添加成功");
              this.$emit("confirm")
            } else {
              this.$message.error(res.data.msg)
            }
          })
        } else {
          console.log("error submit!", fields);
        }
      });
    },
    cancel() {
      this.$emit("cancel");
    },

    beforeAvatarUpload(rawFile) {
      if (rawFile.type !== "image/png") {
        this.$message.error("只能上传图片!");
        return false;
      } else if (rawFile.size / 1024 / 1024 > 2) {
        this.$message.error("大小不超过2M!");
        return false;
      }
      return true;
    },

    handleAvatarSuccess(response) {
      this.$refs.upload.clearFiles();
      this.newArticle.thumb_url = response.imgurl;
    },
  },
};
</script>

<style lang="less" scoped>
.cover {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 5;
  .wap {
    width: 800px;
    height: 500px;
    background-color: #fff;
    margin: calc(50vh - 250px) auto;
    position: relative;
    .content {
      width: 90%;
      margin: 0 auto;
    }
    .title {
      width: 96%;
      padding: 0 2%;
      line-height: 35px;
      background-color: #5e7ce0;
      margin-bottom: 10px;
      color: #fff;
    }
    .radio-item {
      width: 160px;
      margin: 0 20px;
      display: block;
    }
    .operate {
      position: absolute;
      bottom: 0;
      height: 40px;
      line-height: 40px;
      width: 100%;
      text-align: center;
      border-top: 1px solid #ececec;
    }
  }
}
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>