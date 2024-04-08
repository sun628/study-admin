## md 文档学习

文本换行

==>(加两个空格或者空格+回车)

**文本加粗** 
__文本加粗__

*文本斜体*

***文本斜体加粗***

~~文本添加横杠~~

**~~文本添加横杠并加粗~~**

添加分割线，后面不能写东西 ***或者- - - 
*** 
- - - 

# 一级标题
## 二级标题
### 三级标题

**无序列表 * -  + 都行(但是不能混用，会隔开)**
* 无序列表1
* 无序列表2
- 无序列表1
- 无序列表2
+ 无序列表1
+ 无序列表2

**有序列表**

1. 有序列表1
2. 有序列表2
3. 有序列表3

**有序二级列表（前加4个空格）**

4. 有序列表1
    1. 有序二级列表1
    2. 有序列表2
5. 有序列表2    
    内容文本信息

***勾选框*** 
- [ ] 未完成的任务1
* [ ] 未完成的任务2

- [x] 已完成的任务1
* [x] 已完成的任务2

**代码片段**
  ```typeScript
  declare module '*.vue' {
    import { DefineComponent } from 'vue';
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
    const component: DefineComponent<{}, {}, any>;
    export default component;
  }
  ```

行内文本信息中带有`typeScript`代码

> 引用部分 
> - 嵌套其他内容
> 
> 滴答滴答滴答滴答滴答滴答的

添加链接，[百度](https://baidu.com)

**插入图片**

![图片](/public/vite.svg)

<img src="./public/vite.svg"/>

**表格**

**: 控制文本位置**

|                         事件名 |      说明       | 回调参数                       |
| -----------------------------: | :-------------: | :----------------------------- |
| changechangechangechangechange | tab切换时会触发 | (item: TabItem)(item: TabItem) |

**自定义html内容**

文本换行<br>使用br
文字变<span style="color:red">红</span>