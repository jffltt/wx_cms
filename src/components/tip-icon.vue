<template>
  <span>
    <el-tooltip effect="light" :content="text" placement="top-start">
      <el-icon size="14" :color="colorMap[type]" v-bind="$attrs" class="tip-icon">
        <OperateIcon></OperateIcon>
      </el-icon>
    </el-tooltip>
  </span>
</template>

<script setup>
import { defineProps, shallowRef} from 'vue';
import { Edit } from '@element-plus/icons-vue';

let props = defineProps({
  text: {
    default: '提示图标',
  },
  icon: {
    default: Edit,
  },
  type: {
    default: 'primary'
  }
})

let OperateIcon = shallowRef(props.icon)

const colorMap = {
  primary: '#5e7ce0',
  success: '#67C23A',
  warning: '#E6A23C',
  danger: '#F56C6C',
}
</script>

<style scoped>
.tip-icon {
  cursor: pointer;
  margin: 0 5px;
}
</style>