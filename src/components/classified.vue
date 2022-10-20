<template>
  <div class="cover">
    <div class="wap">
      <div class="title">请选择归属栏目</div>
      <el-radio-group v-model="classId" class="content">
        <el-radio
          class="radio-item"
          v-for="(item, index) in list"
          :key="index"
          :label="item.id"
          >{{ item.clumn_name }}</el-radio
        >
      </el-radio-group>
      <div class="operate">
        <el-button type="primary" size="small" @click="confirm">确认</el-button>
        <el-button type="info" size="small" @click="cancel">取消</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      classId: 0,
    };
  },
  props: {
    classList: [Array],
  },
  mounted() {
    this.list = [...this.classList];
  },
  methods: {
    confirm() {
      if(!this.classId) {
        this.$message.warning("请选择归属栏目");
        return;
      }
      this.$emit("confirm", this.classId);
    },
    cancel() {
      this.$emit("cancel");
    }
  }
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
    height: 300px;
    background-color: #fff;
    margin: calc(50vh - 150px) auto;
    position: relative;
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
    .operate{
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
</style>