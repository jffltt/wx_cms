<template>
  <div class="page-head">
    <div>
      <h2>新闻动态</h2>
      <p>的好地方喝咖啡的空间浪费和克里夫看看风景回馈积分看JFK法国看来法国看滚</p>
    </div>
  </div>
  <div class="news-content">
    <div class="news-item" v-for="i in 12" :key="i">
      <div>
        <img src="../../../assets/bg.png" />
        <div>2022-03-15 17:30:26</div>
        <div>空间的疯狂攻击快递费是仅仅是但还是感觉决定更换的数据格式</div>
        <div>
          空间的疯狂攻击快递费是仅仅是但还是感觉决定更换的数据格式空间的疯狂攻击快递费是仅仅是但间的疯狂攻击快递费是仅仅是但还是感觉决定更换的数据格式空间的疯狂攻击快递费是仅仅是但还是感觉决定更换的数据格式空间的疯狂攻击快递费是仅仅是但还是感觉决定更换的数据格式空间的疯狂攻击快递费是仅仅是但还是感觉决定更换的数据格式空间的疯狂攻击快递费是仅仅是但还是感觉决定更换的数据格式
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.page-head {
  background-image: url('https://img0.baidu.com/it/u=730286945,402115301&fm=253&fmt=auto&app=120&f=JPEG?w=1280&h=800');
  width: 100%;
  height: 300px;
  position: relative;
  background-size: 100%;

  &>div {
    position: absolute;
    width: 1200px;
    margin: 0 calc(50vw - 600px);

    &>h2 {
      color: #ffffff;
      margin-top: 50px;
    }

    &>p {
      color: #ffffff;
      line-height: 30px;
    }
  }
}

.news-content {
  width: 1200px;
  margin: 0 auto;
  margin-bottom: 10px;

  .news-item {
    width: 400px;
    height: 600px;
    float: left;
    margin-top: 10px;

    &>div {
      width: 390px;
      height: 600px;
      margin: 0 5px;
      box-shadow: 0 0 16px 2px #e0e0e0;

      &>img {
        width: 100%;
        height: 300px;
      }

      &>div:nth-child(2) {
        height: 30px;
        border: 1px solid #5e7ce0;
        border-left: none;
        line-height: 30px;
        color: #5e7ce0;
        margin: 10px 0;
        width: 200px;
        border-bottom-right-radius: 15px;
      }

      &>div:nth-child(3) {
        width: 98%;
        margin: 10px 1%;
        font-size: 1.5rem;
        line-height: 35px;
        overflow: hidden;
        text-overflow: ellipsis;
        font-weight: 600;
        -webkit-line-clamp: 2;
        display: -webkit-box;
        -webkit-box-orient: vertical;
      }

      &>div:nth-child(4) {
        width: 98%;
        margin: 10px 1%;
        font-size: 1rem;
        line-height: 28px;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-line-clamp: 4;
        display: -webkit-box;
        -webkit-box-orient: vertical;
      }
    }
  }

  &::after {
    content: '';
    display: block;
    clear: both;
  }
}</style>