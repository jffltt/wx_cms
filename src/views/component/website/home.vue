<template>
    <el-carousel indicator-position="outside" height="600px">
        <el-carousel-item v-for="i in 3" :key="i">
            <img style="width: 100%; height: 100%;" :src="require(`@/assets/banner_${i}.png`)" />
        </el-carousel-item>
    </el-carousel>

    <div class="about">
        <div class="title">单位介绍</div>
        <div class="introduce">{{ introduce }}</div>
    </div>
</template>

<script setup>
const introduce = `
镇江市行业老干部管理服务办公室是镇江市机构编制委员会根据《镇江市人民政府机构改革实施意见》（镇发〔2010〕11号）和2010年4月23日市政府常务会议精神，于2010年6月批准（镇编委〔2010〕5号），在市国资委组建成立的。
镇江市行业老干部管理服务办公室（以下简称老干部办）主要职责为:承担原各行业管理办公室离退休干部的日常管理和服务工作，具体包括原16个工业(商业)主管局、国资委和体改办机关的离休、退休干部及其所属破产终结企业的离休干部的服务管理工作。
2022年底，老干部办服务管理离退休干部及遗属762人，其中，离休干部及厅级退休61人，机关退休干部538人（其中县处级退休干部79人），离退休干部遗属163人；现有离退休干部党员448名，设置四个党总支、十八个党支部。
现有“文化养老”社团（老干部合唱团、舞蹈队、文学社、摄影社、书画社、表演艺术社、智力运动社和程志强文化惠民银发人才工作站）和志愿服务中队（暖企分队、宣讲分队、帮困救助分队等10个服务分队和周汉清暖企服务银发人才工作站）组织。
镇江市委对老干部工作的指...
`
</script>
  
<style>
.el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
}

.about {
  width: 1200px;
  margin: 0 auto;
}

.introduce{
  line-height: 35px;
  font-size: 1.2rem;
  text-indent: 2.4rem;
  text-transform: capitalize;
  margin-bottom: 30px;
}
.introduce::first-letter{
  font-size: 1.5rem;
  font-weight: 600;
}

.title {
  font-size: 1.8rem;
  font-weight: 800;
  line-height: 6rem;
  color: brown;
}
</style>