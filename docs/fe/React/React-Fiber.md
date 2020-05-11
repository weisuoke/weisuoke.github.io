# React Fiber架构

React16 启用了全新的架构，叫做Fiber，其最大的使命是解决大型React项目的性能问题，再顺手解决之前的一些痛点。

### 痛点

主要有如下几个：

- 组件不能返回数组，最见的场合是UL元素下只能使用LI，TR元素下只能使用TD或TH，这时这里有一个组件循环生成LI或TD列表时，我们并不想再放一个DIV，这会破坏HTML的语义。
- 弹窗问题，之前一直使用不稳定的unstable_renderSubtreeIntoContainer。弹窗是依赖原来DOM树的上下文，因此这个API第一个参数是组件实例，通过它得到对应虚拟DOM，然后一级级往上找，得到上下文。它的其他参数也很好用，但这个方法一直没有转正。
- 异常处理，我们想知道哪个组件出错，虽然有了React DevTool，但是太深的组件树查找起来还是很吃力。希望有个方法告诉我出错位置，并且出错时能让我有机会进行一些修复工作
- HOC的流行带来两个问题，毕竟是社区兴起的方案，没有考虑到ref与context的向下传递。
- 组件的性能优化全凭人肉，并且主要集中在SCU，希望框架能干些事情，即使不用SCU，性能也能上去。

### 解决进度

- 16.0 让组件支持返回任何数组类型，从而解决数组问题; 推出createPortal API ,解决弹窗问题; 推出componentDidCatch新钩子， 划分出错误组件与边界组件， 每个边界组件能修复下方组件错误一次， 再次出错，转交更上层的边界组件来处理，解决异常处理问题。
- 16.2 推出Fragment组件，可以看作是数组的一种语法糖。
- 16.3 推出createRef与forwardRef解决Ref在HOC中的传递问题，推出new Context API，解决HOC的context传递问题（主要是SCU作崇）
- 而性能问题，从16.0开始一直由一些内部机制来保证，涉及到批量更新及基于时间分片的限量更新。

## 一个小实验

我们可以通过以下实验来窥探React16的优化思想。

```js
function randomHexColor(){
    return "#" + ("0000"+ (Math.random() * 0x1000000 << 0).toString(16)).substr(-6);
}
setTimeout(function() {
    var k = 0;
    var root = document.getElementById("root");
    for(var i = 0; i < 10000; i++){
        k += new Date - 0 ;
        var el = document.createElement("div");
        el.innerHTML = k;
        root.appendChild(el);
        el.style.cssText = `background:${randomHexColor()};height:40px`;
    }
}, 1000);
```

这是一个拥有10000个节点的插入操作，包含了innerHTML与样式设置，花掉1000ms。

我们再改进一下，分派次插入节点，每次只操作100个节点，共100次，发现性能异常的好！

```js
function randomHexColor() {
    return "#" + ("0000" + (Math.random() * 0x1000000 << 0).toString(16)).substr(-6);
}
var root = document.getElementById("root");
setTimeout(function () {
    function loop(n) {
        var k = 0;
        console.log(n);
        for (var i = 0; i < 100; i++) {
            k += new Date - 0;
            var el = document.createElement("div");
            el.innerHTML = k;
            root.appendChild(el);
            el.style.cssText = `background:${randomHexColor()};height:40px`;
        }
        if (n) {
            setTimeout(function () {
                loop(n - 1);
            }, 40);
        }
    }
    loop(100);
}, 1000);
```

究其原因是因为浏览器是单线程，它将GUI描绘，时间器处理，事件处理，JS执行，远程资源加载统统放在一起。当做某件事，只有将它做完才能做下一件事。如果有足够的时间，浏览器是会对我们的代码进行编译优化（JIT）及进行热代码优化，一些DOM操作，内部也会对reflow进行处理。reflow是一个性能黑洞，很可能让页面的大多数元素进行重新布局。

浏览器的运作流程

> 渲染 -> tasks -> 渲染 -> tasks -> 渲染 -> tasks -> ....

这些tasks中有些我们可控，有些不可控，比如setTimeout什么时候执行不好说，它总是不准时; 资源加载时间不可控。但一些JS我们可以控制，让它们分派执行，tasks的时长不宜过长，这样浏览器就有时间优化JS代码与修正reflow！下图是我们理想中的渲染过程

总结一句，**就是让浏览器休息好，浏览器就能跑得更快**。

