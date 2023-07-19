<template>
	<el-card>
		<doc title="never 类型">
			<p class="tip">never 类型在 TypeScript 中表示一个永远不会发生的值的类型。（该说不说很抽象）</p>
			<p class="tip">1.函数返回类型：当函数永远不会返回时，可以将其返回类型标注为 never。例如，一个抛出错误的函数：</p>
			<Highlight :code="neverCode" />
			<p class="tip">2.永远不会有值的变量：当变量在某些条件下永远不会被赋予值时，可以将其类型标注为 never。例如：</p>
			<Highlight :code="neverCode2" />
			<p class="tip">3.类型判断的穷尽性检查：当使用联合类型时，通过使用 never 可以确保你已经对所有的可能情况进行了处理。例如：</p>
			<Highlight :code="neverCode3" :auto="false" />
			<p class="tip">总结：never 类型表示一个不可能发生的值，它通常用于处理不会返回或不可能被赋值的情况，以及类型判断的穷尽性检查</p>
		</doc>
		<doc title="never 与 void 的差异">
			<Highlight :code="neverAndVoid" />
		</doc>
	</el-card>
</template>
<script setup lang="ts">
const neverCode = `function throwError(message: string): never {
  throw new Error(message);
}`;
const neverCode2 = `let unreachable: never;
if (Math.random() > 0.5) {
  unreachable = throwError("Unreachable code");
}
// 在这个例子中，unreachable 变量根据条件可能被赋予 never 类型的值。`;
const neverCode3 = `type Result = Success | Failure;

function processResult(result: Result): string {
  if (result.type === "success") {
    return result.data;
  } else if (result.type === "failure") {
    return result.error;
  } else {
    const exhaustiveCheck: never = result;  // 确保所有情况都被处理
    throw new Error("Unhandled case:", exhaustiveCheck);
  }
}
// 在这个例子中，通过将类型为 never 的变量 exhaustiveCheck 分配给 result，我们可以确保所有的情况都已经被处理。


type  bb = "唱" | "跳" | "rap" | "篮球"
 
function  kun (value:bb){
  switch (value) {
      case "唱":
          break
      case "跳":
          break
      case "rap":
          break
      default:
          //兜底逻辑
          const error:never = value;
          return error          
          
  }
 }`;
const neverAndVoid = `// void类型只是没有返回值 但本身不会出错
function Void():void {
  console.log();
}

// 只会抛出异常没有返回值
function Never():never {
  throw new Error('aaa')
}`;
</script>

<style scoped lang="scss"></style>
