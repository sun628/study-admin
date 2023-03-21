<template>
  <el-row>
    <el-col :span="12">
      <doc title="Any 类型 和 unknown 顶级类型">
        <p>1.没有强制限定哪种类型，随时切换类型都可以 我们可以对 any 进行任何操作，不需要检查类型</p>
        <highlight :code="anyType"></highlight>
      </doc>
    </el-col>
  </el-row>
</template>
<script setup lang="ts">
const anyType = `let anys:any = 123
anys = '123'
anys = true
`;
</script>

<style scoped lang="scss"></style>
