# BFC IFC FFC GFC

### 1.什么是BFC?

BFC (Block Formatting Context) 块格式化上下文，是css视觉渲染的一部分，主要用来决定块盒的布局及浮动相互影响范围的一个区域

### 2.如何创建BFC？

- 根元素(在页面中html是根元素，它自己就形成了一个BFC)；
- 浮动(float不为none);
- 绝对定位元素或固定定位（元素的position为absolute或fixed);
- 行内块inline-block(元素为：display:inline-block);
- 表格单元格（元素的display: table-cell）;
- overflow的值不为visible的元素；
- 弹性盒子flex boxes(元素的display:flex/inline-flex);
- 网格盒子grid boxes(元素的display:grid);

最常见的是overflow:hidden、float:left/right、position:absolute、display:flex,当看到这些属性的时候就代表该元素已经创建了一个BFC;

### 3.BFC的范围

在MDN中有这样的描述

#### A block formatting context contains everything inside of the element creating it that is not also inside a descendant element that creates a new block formatting context.

什么意思？ BFC包含创建该上下文元素的所有子元素，但不包含创建了新的BFC的子元素的内部元素

举个栗子：

```html
<div id="school" class="BFC" >
    <div  id="teacher1">
        <div id="student1"></div>
        <div  id="student2"></div>
    </div>
    <div id="teacher2" class="BFC">
        <div id="student3"></div>
        <div id="student4"></div>
    </div>
</div>
```

上面的代码表示#school创建了一个BFC，这个BFC包含了teacher1，student1，student2，teacher2。teacher1中的子元素student1和student2也属于#school所创建的BFC,但是#teacher2自己也形成了一个BFC，所以#student3和#student4是不属于#school的BFC;

#### 注意：同一个元素不能同时存在于两个BFC中；

#### BFC一个重要的特性就是BFC内部的元素和外部的元素是相互隔离的，使内外元素的定位不会相互影响。

### 4.归纳一下BFC的特性：

- BFC内部的盒子会在垂直方向上一个接一个排列(可以看作在BFC中有一个常规流);
- 处于同一个BFC中的元素相互影响，可能会发生margin collapse;
- 每个元素的margin box的左边，与容器块的border box的左边接触；
- BFC就是页面中的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素，反之亦然；
- 计算BFC的高度时候，考虑BFC所包含的所有元素，连浮动元素也参与计算；
- 浮动盒区域不叠加到BFC（如果盒子浮动了，但是父元素没有形成BFC,会导致高度塌陷）；

### 5.BFC的作用

#### 1.清除浮动

```html
<div class="par">
    <section class="son1"></section>
    <section class="son2"></section>
</div>
```
```css
.par {
    background-color: #888;
    width: 100%;
    margin-left: 50px;
}
.son1 {
    width: 200px;
    height: 300px;
    background-color: pink;
    float: left;
    opacity: 0.5;
}
.son2 {
    width: 400px;
    height: 100px;
    background-color: blue;
    opacity: 0.5;
}
```



![img](https://user-gold-cdn.xitu.io/2019/4/23/16a4a4623d8ec66a)

```html
<!-- 清除浮动：-->
<div class="par BFC">
    <section class="son1"></section>
    <section class="son2"></section>
</div>
```
```css
.BFC {
   overflow:hidden;
}
```



![img](https://user-gold-cdn.xitu.io/2019/4/23/16a4a49c5784bce7)



#### 2.防止与浮动元素重叠，形成2栏布局

```html
<div class="par BFC">
    <section class="son1"></section>
    <section class="son2 BFC">
        <div class="gs"></div>
        <div class="gs"></div>
        <div class="gs"></div>
    </section>
</div>
```
```css
.par {
    background-color: #888;
    width: 100%;
    margin-left: 50px;
}
.son1 {
    width: 200px;
    height: 300px;
    background-color: pink;
    float: left;
    opacity: 0.5;
}
.son2 {
    width: 400px;
    height: 260px;
    background-color: blue;
    opacity: 0.5;
}
.gs {
    width: 30px;
    height: 30px;
    background-color: #fff;
    margin: 20px;
}
.BFC {
    overflow:hidden;
}
效果：
复制代码
```



![img](https://user-gold-cdn.xitu.io/2019/4/23/16a4a56e3c3cf12f)



#### 3.在BFC内部块元素的上下margin会发生塌陷，可以给其中的一个块元素添加父元素，形成BFC，从而防止margin塌陷

```
html：
<div class="par BFC">
    <section class="son1"></section>
    <section class="son2 BFC">
        <div class="gs"></div>
        <div class="wrap BFC">   <!-- 包裹一层div，使其形成BFC -->
           <div class="gs"></div>
        </div>  
    </section>
</div>
css:
.par {
    background-color: #888;
    width: 100%;
    margin-left: 50px;
}
.son1 {
    width: 200px;
    height: 300px;
    background-color: pink;
    float: left;
    opacity: 0.5;
}
.son2 {
    width: 400px;
    height: 260px;
    background-color: blue;
    opacity: 0.5;
}
.gs {
    width: 30px;
    height: 30px;
    background-color: #fff;
    margin: 20px;
}
.BFC {
    overflow:hidden;
}
```



![img](<https://user-gold-cdn.xitu.io/2019/4/23/16a4a5dd102c1a3e>)



### 总结，BFC就是在页面中形成一独立的容器，在这个容器中的元素与容器外的元素相互独立，互不影响。

作者：不断学习的前端工程师

链接：https://juejin.im/post/5cbeb4a45188250a9576c327

来源：掘金

著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。