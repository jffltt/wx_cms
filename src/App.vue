<template>
  <router-view />
</template>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
body {
  padding: 0;
  margin: 0;
}
*::-webkit-scrollbar{
  height: 8px;
  width: 8px;
  background-color: #e7e7e7;
  border-radius: 4px;
}
*::-webkit-scrollbar-thumb{
  height: 8px;
  width: 8px;
  background-color: #2c3e50;
  border-radius: 4px;
}
</style>
