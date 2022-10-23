<template>
  <div id="content" name="content" v-html="$route.params.content"></div>
</template>

<script>
// import { ueditorConfig } from "../../public/Ueditor/ueditor.config";
// import { ueditorAll } from "../../public/Ueditor/ueditor.all";
export default {
  data() {
    return {
      editor: null,
    };
  },
  methods: {
    _init_() {
    //   ueditorConfig();
    //   ueditorAll();
      
    //   var ue = window.UE.getEditor('content');
    //   var filmDesc = this.$route.params.content;
    //   console.log(filmDesc)
    // //这个监听器是亮点
    //   ue.addListener('ready',function () {
    //     ue.execCommand('insertHtml',filmDesc);
    //   });
    },
  },
  mounted() {
    this._init_();
  },
};
</script>

<style scoped>
#content{
  width: 100vw;
  height: 100vh;
}
</style>