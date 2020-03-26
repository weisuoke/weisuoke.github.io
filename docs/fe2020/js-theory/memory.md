# 内存管理

## 1 JavaScript 中的垃圾收集

- 程序运行时需要内存，只要程序要求，操作系统就必须提供内存
- JavaScript 使用自动内存管理，这被称为"垃圾回收机制"(garbage collector)
- 有点是可以简化开发、节省代码
- 缺点是无法完整的掌握内存的分配与回收的具体过程

### 1.1 NodeJS 中的内存管理

- 网页端的内存泄露
- 对于持续运行的服务进程 Node 服务器端程序，必须及时释放不再用到的内存。否则，内存越来越高，轻则影响系统的性能，重则导致进程崩溃。
- 如果不再用到的内存没有及时释放，就叫内存泄露

### 1.2 V8 内存管理

#### 1.2.1 V8 内存限制

- 在 64 位操作系统可以使用 1.4G 内存
- 在 32 位操作系统可以使用 0.7G 内存

#### 1.2.2 V8 内存管理

- JS 对象都是通过 V8 进行分配管理内存的
- `process.memoryUsage`返回一个对象，包含了 Node 进程的内存占用信息

```javascript
console.log(process.memoryUsage());

/*
	{
    rss: 21221376,
    heapTotal: 7708672,
    heapUsed: 4270272,
    external: 8224 
  }
*/
```

- rss(resident set size)：所有内存占用，包括指令区和堆栈。栈：存放本地变量、指针。HeapTotal(堆)： 存放对象，闭包。
- heapTotal: "堆"占用的内存，包括用到的和没用到的
- heapUsed: 用到的堆的部分。判断内存泄露，以`heapUsed`字段为准
- external: V8 引擎内部的 C++对象占用的内存

![](https://wsk-mweb.oss-cn-hangzhou.aliyuncs.com/ipic/2020-03-24-144608.jpg)

![](https://wsk-mweb.oss-cn-hangzhou.aliyuncs.com/ipic/2020-03-24-144617.jpg)

#### 1.2.3 为何限制内存大小

- 因为 V8 的垃圾工作原理导致的，1.4G 内存完成一次垃圾收集需要 1s 以上
- 这个暂停时间成为 Stop The World，在这个期间，应用的性能和响应能力都会下降。

#### 1.2.4 如何打开内存限制

- 一旦初始化成功，生效后不能再修改
- -max-new-space-size，最大 new space 大小，执行 scanvenge 回收，默认 16M，单位 KB
- -max-old-space-size，最大 old space 大小，执行 MarkSweep 回收，默认 1G，单位 MB

```shell
node --max-new-space-size=1024 app.js	# 单位是KB
node --max-old-space-size=2000 app.js # 单位是M
```

## 2. V8 的垃圾回收机制

- V8 是基于分代的垃圾回收
- 不同代垃圾回收机制也不一样
- 按存活时间分为新生代和老生代

### 2.1 分代

- 年龄小的是新生代，由 From 区域和 To 区域两个区域组成
  - 在 64 位系统里，新生代内存是 32M，From 区域和 To 区域各占用 16M
  - 在 32 位系统里，新生代内存是 16M，From 区域和 To 区域各占用 8M
- 年龄大的是老生代，默认情况下
  - 64 位系统下老生代内存是 1400M
  - 32 位系统下老生代内存是 700M

![](https://wsk-mweb.oss-cn-hangzhou.aliyuncs.com/ipic/2020-03-24-144623.jpg)

### 2.2 新生代垃圾回收

- 新生代区域一分为二，每个 16M，一个使用，一个空闲
- 开始垃圾回收，会检查 FROM 区域中的存活对象，如果还活着，拷贝到 TO 空间，完成后释放空间
- 完成后 FROM 和 TO 互换
- 新生代扫描的时候是一种广度优先的扫描策略
- 新生代的空间小，存活对象少
- 当一个对象经过多次的垃圾回收依然存活的时候，生存周期比较长的对象会被移动到老生代，这个移动过程被称为晋升或者升级。
  - 经过 5 次以上的回收还存在
  - TO 的空间使用占比超过 25%，或者超大对象

![](https://wsk-mweb.oss-cn-hangzhou.aliyuncs.com/ipic/2020-03-24-144632.jpg)

### 2.3 引用计数

- 语言引擎有一张引用表，保存了内存里所有的资源的引用次数。
- 如果一个值的引用次数是 0，就表示这个值不再用到了，因此可以将这块内存释放。

![](https://wsk-mweb.oss-cn-hangzhou.aliyuncs.com/ipic/2020-03-24-144639.jpg)

```javascript
let objB = {};
let objC = {};
let objF = {};
global.objA = {
  objB,
  objC
};
```

#### 2.3.1 一个实际的例子

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Document</title>
  </head>
  <body>
    <script>
      function Person(name) {
        this.name = name;
      }

      let p1 = new Person("weisuoke1");
      let p2 = new Person("weisuoke2");

      // 销毁内存
      setTimeout(function() {
        p1 = null;
      }, 3000);
    </script>
  </body>
</html>
```

![](https://wsk-mweb.oss-cn-hangzhou.aliyuncs.com/ipic/2020-03-24-144646.jpg)

### 2.4 老生代

- mark-sweep(标记清除) mark-compact(标记整理)
- 老生代空间大，大部分都是活着的对象，GC 耗时比较长
- 在 GC 期间无法响应，STOP-THE-WORLD
- V8 有一个优化方案，增量处理，把一个大暂停换成多个小暂停 INCREMENT-GC

![](https://wsk-mweb.oss-cn-hangzhou.aliyuncs.com/ipic/2020-03-24-144650.jpg)

#### 2.4.1 mark-sweep(标记清除)

- 标记活着的对象，随后清除在标记阶段没有标记的对象，只清理死亡对象
- 问题在于清除后会出现内存不连续的情况，这种内存碎片会对后续的内存分配产生影响
- 如果要分配一个大对象，碎片空间无法分配

#### 2.4.2 mark-compact(标记整理)

- 标记死亡后会对对象进行整理，活着的对象向左移动，移动完成后直接清理掉边界外的内存。

#### 2.4.3 inuremental marking 增量标记

- 以上三种回收时都需要暂停程序执行，收集完成后才能恢复，*STOP-THE-WORLD*在新生代影响不大，但是老生代影响就非常大。
- 增量标记就是把标记改为了增量标记，把一口气的停顿拆分成了多个小步骤，做完一步程序运行一会儿，垃圾回收和应用程序运行交替进行，停顿时间可以减少 1/6 左右

![](https://wsk-mweb.oss-cn-hangzhou.aliyuncs.com/ipic/2020-03-24-144655.jpg)

## 3. 参考阅读

- [JavaScript 如何工作:内存管理+如何处理 4 个常见的内存泄漏](https://segmentfault.com/a/1190000017392370)
