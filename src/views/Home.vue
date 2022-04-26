<template>
  <div class="home">
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      label-width="120px"
      class="demo-ruleForm"
    >
      <el-form-item label="文章标题" prop="name">
        <el-input v-model="ruleForm.name" />
      </el-form-item>
      <el-form-item label="文章链接" prop="name">
        <el-input v-model="ruleForm.name" />
      </el-form-item>
      <el-form-item label="选择归属分类" prop="region">
        <el-select v-model="ruleForm.region" placeholder="Activity zone">
          <el-option label="Zone one" value="shanghai" />
          <el-option label="Zone two" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item label="Activity time" required>
        <el-col :span="12">
          <el-form-item prop="date1">
            <el-upload
              class="avatar-uploader"
              action="https://wx.amasion.cn/base/richUpload"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
            </el-upload>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button icon="plus" type="primary">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { Plus } from "@element-plus/icons-vue";
export default {
  components: { Plus },
  data() {
    return {
      ruleForm: {
        name: "Hello",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      rules: {
        name: [
          {
            required: true,
            message: "Please input Activity name",
            trigger: "blur",
          },
          {
            min: 3,
            max: 5,
            message: "Length should be 3 to 5",
            trigger: "blur",
          },
        ],
        region: [
          {
            required: true,
            message: "Please select Activity zone",
            trigger: "change",
          },
        ],
        date1: [
          {
            type: "date",
            required: true,
            message: "Please pick a date",
            trigger: "change",
          },
        ],
        date2: [
          {
            type: "date",
            required: true,
            message: "Please pick a time",
            trigger: "change",
          },
        ],
        type: [
          {
            type: "array",
            required: true,
            message: "Please select at least one activity type",
            trigger: "change",
          },
        ],
        resource: [
          {
            required: true,
            message: "Please select activity resource",
            trigger: "change",
          },
        ],
        desc: [
          {
            required: true,
            message: "Please input activity form",
            trigger: "blur",
          },
        ],
      },
      imageUrl: "",
    };
  },
  methods: {
    handleAvatarSuccess(res) {
      this.imageUrl = res.imgurl;
    },

    beforeAvatarUpload() {},
  },
};
</script>

<style scoped>
.demo-ruleForm {
  width: 1200px;
  height: 400px;
  margin: 5vh auto;
  box-shadow: 0 0 16px 2px rgb(241, 241, 241);
  padding: 30px 15px;
}

.avatar-uploader .el-upload {
  border: 1px dashed #3d3d3d;
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
  border: 1px solid #e0e0e0;
}
</style>
