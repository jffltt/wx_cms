<template>
  <div class="about">
    <div class="title">今后是否会公司的交换机上的</div>
    <div>注意，虽然这里的 组件可能根本不关心这些 props，但为了使 能访问到它们，仍然需要定义并向下传递。如果组件链路非常长，可能会影响到更多这条路上的组件。这一问题被称为“prop
      逐级透传”，显然是我们希望尽量避免的情况。provide 和 inject 可以帮助我们解决这一问题。 [1]
      一个父组件相对于其所有的后代组件，会作为依赖提供者。任何后代的组件树，无论层级有多深，都可以注入由父组件提供给整条链路的依赖。</div>
  </div>
</template>

<style scoped>
.about {
  width: 1200px;
  margin: 0 auto;
}

.title {
  font-size: 20px;
  line-height: 80px;
}
</style>