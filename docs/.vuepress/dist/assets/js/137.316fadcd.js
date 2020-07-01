(window.webpackJsonp=window.webpackJsonp||[]).push([[137],{311:function(t,a,s){"use strict";s.r(a);var n=s(2),e=Object(n.a)({},function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"内存管理"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#内存管理","aria-hidden":"true"}},[t._v("#")]),t._v(" 内存管理")]),t._v(" "),s("h2",{attrs:{id:"_1-javascript-中的垃圾收集"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_1-javascript-中的垃圾收集","aria-hidden":"true"}},[t._v("#")]),t._v(" 1 JavaScript 中的垃圾收集")]),t._v(" "),s("ul",[s("li",[t._v("程序运行时需要内存，只要程序要求，操作系统就必须提供内存")]),t._v(" "),s("li",[t._v('JavaScript 使用自动内存管理，这被称为"垃圾回收机制"(garbage collector)')]),t._v(" "),s("li",[t._v("有点是可以简化开发、节省代码")]),t._v(" "),s("li",[t._v("缺点是无法完整的掌握内存的分配与回收的具体过程")])]),t._v(" "),s("h3",{attrs:{id:"_1-1-nodejs-中的内存管理"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_1-1-nodejs-中的内存管理","aria-hidden":"true"}},[t._v("#")]),t._v(" 1.1 NodeJS 中的内存管理")]),t._v(" "),s("ul",[s("li",[t._v("网页端的内存泄露")]),t._v(" "),s("li",[t._v("对于持续运行的服务进程 Node 服务器端程序，必须及时释放不再用到的内存。否则，内存越来越高，轻则影响系统的性能，重则导致进程崩溃。")]),t._v(" "),s("li",[t._v("如果不再用到的内存没有及时释放，就叫内存泄露")])]),t._v(" "),s("h3",{attrs:{id:"_1-2-v8-内存管理"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_1-2-v8-内存管理","aria-hidden":"true"}},[t._v("#")]),t._v(" 1.2 V8 内存管理")]),t._v(" "),s("h4",{attrs:{id:"_1-2-1-v8-内存限制"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_1-2-1-v8-内存限制","aria-hidden":"true"}},[t._v("#")]),t._v(" 1.2.1 V8 内存限制")]),t._v(" "),s("ul",[s("li",[t._v("在 64 位操作系统可以使用 1.4G 内存")]),t._v(" "),s("li",[t._v("在 32 位操作系统可以使用 0.7G 内存")])]),t._v(" "),s("h4",{attrs:{id:"_1-2-2-v8-内存管理"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_1-2-2-v8-内存管理","aria-hidden":"true"}},[t._v("#")]),t._v(" 1.2.2 V8 内存管理")]),t._v(" "),s("ul",[s("li",[t._v("JS 对象都是通过 V8 进行分配管理内存的")]),t._v(" "),s("li",[s("code",[t._v("process.memoryUsage")]),t._v("返回一个对象，包含了 Node 进程的内存占用信息")])]),t._v(" "),s("div",{staticClass:"language-javascript extra-class"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[t._v("console"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("process"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("memoryUsage")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("/*\n\t{\n    rss: 21221376,\n    heapTotal: 7708672,\n    heapUsed: 4270272,\n    external: 8224 \n  }\n*/")]),t._v("\n")])])]),s("ul",[s("li",[t._v("rss(resident set size)：所有内存占用，包括指令区和堆栈。栈：存放本地变量、指针。HeapTotal(堆)： 存放对象，闭包。")]),t._v(" "),s("li",[t._v('heapTotal: "堆"占用的内存，包括用到的和没用到的')]),t._v(" "),s("li",[t._v("heapUsed: 用到的堆的部分。判断内存泄露，以"),s("code",[t._v("heapUsed")]),t._v("字段为准")]),t._v(" "),s("li",[t._v("external: V8 引擎内部的 C++对象占用的内存")])]),t._v(" "),s("p",[s("img",{attrs:{src:"https://wsk-mweb.oss-cn-hangzhou.aliyuncs.com/ipic/2020-03-24-144608.jpg",alt:""}})]),t._v(" "),s("p",[s("img",{attrs:{src:"https://wsk-mweb.oss-cn-hangzhou.aliyuncs.com/ipic/2020-03-24-144617.jpg",alt:""}})]),t._v(" "),s("h4",{attrs:{id:"_1-2-3-为何限制内存大小"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_1-2-3-为何限制内存大小","aria-hidden":"true"}},[t._v("#")]),t._v(" 1.2.3 为何限制内存大小")]),t._v(" "),s("ul",[s("li",[t._v("因为 V8 的垃圾工作原理导致的，1.4G 内存完成一次垃圾收集需要 1s 以上")]),t._v(" "),s("li",[t._v("这个暂停时间成为 Stop The World，在这个期间，应用的性能和响应能力都会下降。")])]),t._v(" "),s("h4",{attrs:{id:"_1-2-4-如何打开内存限制"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_1-2-4-如何打开内存限制","aria-hidden":"true"}},[t._v("#")]),t._v(" 1.2.4 如何打开内存限制")]),t._v(" "),s("ul",[s("li",[t._v("一旦初始化成功，生效后不能再修改")]),t._v(" "),s("li",[t._v("-max-new-space-size，最大 new space 大小，执行 scanvenge 回收，默认 16M，单位 KB")]),t._v(" "),s("li",[t._v("-max-old-space-size，最大 old space 大小，执行 MarkSweep 回收，默认 1G，单位 MB")])]),t._v(" "),s("div",{staticClass:"language-shell extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("node --max-new-space-size=1024 app.js\t# 单位是KB\nnode --max-old-space-size=2000 app.js # 单位是M\n")])])]),s("h2",{attrs:{id:"_2-v8-的垃圾回收机制"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_2-v8-的垃圾回收机制","aria-hidden":"true"}},[t._v("#")]),t._v(" 2. V8 的垃圾回收机制")]),t._v(" "),s("ul",[s("li",[t._v("V8 是基于分代的垃圾回收")]),t._v(" "),s("li",[t._v("不同代垃圾回收机制也不一样")]),t._v(" "),s("li",[t._v("按存活时间分为新生代和老生代")])]),t._v(" "),s("h3",{attrs:{id:"_2-1-分代"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_2-1-分代","aria-hidden":"true"}},[t._v("#")]),t._v(" 2.1 分代")]),t._v(" "),s("ul",[s("li",[t._v("年龄小的是新生代，由 From 区域和 To 区域两个区域组成\n"),s("ul",[s("li",[t._v("在 64 位系统里，新生代内存是 32M，From 区域和 To 区域各占用 16M")]),t._v(" "),s("li",[t._v("在 32 位系统里，新生代内存是 16M，From 区域和 To 区域各占用 8M")])])]),t._v(" "),s("li",[t._v("年龄大的是老生代，默认情况下\n"),s("ul",[s("li",[t._v("64 位系统下老生代内存是 1400M")]),t._v(" "),s("li",[t._v("32 位系统下老生代内存是 700M")])])])]),t._v(" "),s("p",[s("img",{attrs:{src:"https://wsk-mweb.oss-cn-hangzhou.aliyuncs.com/ipic/2020-03-24-144623.jpg",alt:""}})]),t._v(" "),s("h3",{attrs:{id:"_2-2-新生代垃圾回收"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_2-2-新生代垃圾回收","aria-hidden":"true"}},[t._v("#")]),t._v(" 2.2 新生代垃圾回收")]),t._v(" "),s("ul",[s("li",[t._v("新生代区域一分为二，每个 16M，一个使用，一个空闲")]),t._v(" "),s("li",[t._v("开始垃圾回收，会检查 FROM 区域中的存活对象，如果还活着，拷贝到 TO 空间，完成后释放空间")]),t._v(" "),s("li",[t._v("完成后 FROM 和 TO 互换")]),t._v(" "),s("li",[t._v("新生代扫描的时候是一种广度优先的扫描策略")]),t._v(" "),s("li",[t._v("新生代的空间小，存活对象少")]),t._v(" "),s("li",[t._v("当一个对象经过多次的垃圾回收依然存活的时候，生存周期比较长的对象会被移动到老生代，这个移动过程被称为晋升或者升级。\n"),s("ul",[s("li",[t._v("经过 5 次以上的回收还存在")]),t._v(" "),s("li",[t._v("TO 的空间使用占比超过 25%，或者超大对象")])])])]),t._v(" "),s("p",[s("img",{attrs:{src:"https://wsk-mweb.oss-cn-hangzhou.aliyuncs.com/ipic/2020-03-24-144632.jpg",alt:""}})]),t._v(" "),s("h3",{attrs:{id:"_2-3-引用计数"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_2-3-引用计数","aria-hidden":"true"}},[t._v("#")]),t._v(" 2.3 引用计数")]),t._v(" "),s("ul",[s("li",[t._v("语言引擎有一张引用表，保存了内存里所有的资源的引用次数。")]),t._v(" "),s("li",[t._v("如果一个值的引用次数是 0，就表示这个值不再用到了，因此可以将这块内存释放。")])]),t._v(" "),s("p",[s("img",{attrs:{src:"https://wsk-mweb.oss-cn-hangzhou.aliyuncs.com/ipic/2020-03-24-144639.jpg",alt:""}})]),t._v(" "),s("div",{staticClass:"language-javascript extra-class"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" objB "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" objC "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" objF "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\nglobal"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("objA "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  objB"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  objC\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),s("h4",{attrs:{id:"_2-3-1-一个实际的例子"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_2-3-1-一个实际的例子","aria-hidden":"true"}},[t._v("#")]),t._v(" 2.3.1 一个实际的例子")]),t._v(" "),s("div",{staticClass:"language-html extra-class"},[s("pre",{pre:!0,attrs:{class:"language-html"}},[s("code",[s("span",{pre:!0,attrs:{class:"token doctype"}},[t._v("<!DOCTYPE html>")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("html")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("lang")]),s("span",{pre:!0,attrs:{class:"token attr-value"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("en"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("head")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("meta")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("charset")]),s("span",{pre:!0,attrs:{class:"token attr-value"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("UTF-8"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("/>")])]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("meta")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("name")]),s("span",{pre:!0,attrs:{class:"token attr-value"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("viewport"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v(" "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("content")]),s("span",{pre:!0,attrs:{class:"token attr-value"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("width=device-width, initial-scale=1.0"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("/>")])]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("meta")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("http-equiv")]),s("span",{pre:!0,attrs:{class:"token attr-value"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("X-UA-Compatible"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v(" "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("content")]),s("span",{pre:!0,attrs:{class:"token attr-value"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("ie=edge"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("/>")])]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("title")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("Document"),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("title")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("head")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("body")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("script")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),s("span",{pre:!0,attrs:{class:"token script"}},[s("span",{pre:!0,attrs:{class:"token language-javascript"}},[t._v("\n      "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("Person")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("name")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("name "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" name"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n      "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" p1 "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Person")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"weisuoke1"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" p2 "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Person")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"weisuoke2"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n      "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 销毁内存")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("setTimeout")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        p1 "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("null")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("3000")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    ")])]),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("script")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("body")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("html")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n")])])]),s("p",[s("img",{attrs:{src:"https://wsk-mweb.oss-cn-hangzhou.aliyuncs.com/ipic/2020-03-24-144646.jpg",alt:""}})]),t._v(" "),s("h3",{attrs:{id:"_2-4-老生代"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_2-4-老生代","aria-hidden":"true"}},[t._v("#")]),t._v(" 2.4 老生代")]),t._v(" "),s("ul",[s("li",[t._v("mark-sweep(标记清除) mark-compact(标记整理)")]),t._v(" "),s("li",[t._v("老生代空间大，大部分都是活着的对象，GC 耗时比较长")]),t._v(" "),s("li",[t._v("在 GC 期间无法响应，STOP-THE-WORLD")]),t._v(" "),s("li",[t._v("V8 有一个优化方案，增量处理，把一个大暂停换成多个小暂停 INCREMENT-GC")])]),t._v(" "),s("p",[s("img",{attrs:{src:"https://wsk-mweb.oss-cn-hangzhou.aliyuncs.com/ipic/2020-03-24-144650.jpg",alt:""}})]),t._v(" "),s("h4",{attrs:{id:"_2-4-1-mark-sweep-标记清除"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_2-4-1-mark-sweep-标记清除","aria-hidden":"true"}},[t._v("#")]),t._v(" 2.4.1 mark-sweep(标记清除)")]),t._v(" "),s("ul",[s("li",[t._v("标记活着的对象，随后清除在标记阶段没有标记的对象，只清理死亡对象")]),t._v(" "),s("li",[t._v("问题在于清除后会出现内存不连续的情况，这种内存碎片会对后续的内存分配产生影响")]),t._v(" "),s("li",[t._v("如果要分配一个大对象，碎片空间无法分配")])]),t._v(" "),s("h4",{attrs:{id:"_2-4-2-mark-compact-标记整理"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_2-4-2-mark-compact-标记整理","aria-hidden":"true"}},[t._v("#")]),t._v(" 2.4.2 mark-compact(标记整理)")]),t._v(" "),s("ul",[s("li",[t._v("标记死亡后会对对象进行整理，活着的对象向左移动，移动完成后直接清理掉边界外的内存。")])]),t._v(" "),s("h4",{attrs:{id:"_2-4-3-inuremental-marking-增量标记"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_2-4-3-inuremental-marking-增量标记","aria-hidden":"true"}},[t._v("#")]),t._v(" 2.4.3 inuremental marking 增量标记")]),t._v(" "),s("ul",[s("li",[t._v("以上三种回收时都需要暂停程序执行，收集完成后才能恢复，"),s("em",[t._v("STOP-THE-WORLD")]),t._v("在新生代影响不大，但是老生代影响就非常大。")]),t._v(" "),s("li",[t._v("增量标记就是把标记改为了增量标记，把一口气的停顿拆分成了多个小步骤，做完一步程序运行一会儿，垃圾回收和应用程序运行交替进行，停顿时间可以减少 1/6 左右")])]),t._v(" "),s("p",[s("img",{attrs:{src:"https://wsk-mweb.oss-cn-hangzhou.aliyuncs.com/ipic/2020-03-24-144655.jpg",alt:""}})]),t._v(" "),s("h2",{attrs:{id:"_3-参考阅读"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_3-参考阅读","aria-hidden":"true"}},[t._v("#")]),t._v(" 3. 参考阅读")]),t._v(" "),s("ul",[s("li",[s("a",{attrs:{href:"https://segmentfault.com/a/1190000017392370",target:"_blank",rel:"noopener noreferrer"}},[t._v("JavaScript 如何工作:内存管理+如何处理 4 个常见的内存泄漏"),s("OutboundLink")],1)])])])},[],!1,null,null,null);a.default=e.exports}}]);