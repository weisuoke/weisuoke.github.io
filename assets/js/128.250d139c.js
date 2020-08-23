(window.webpackJsonp=window.webpackJsonp||[]).push([[128],{306:function(a,s,e){"use strict";e.r(s);var v=e(2),_=Object(v.a)({},function(){var a=this,s=a.$createElement,e=a._self._c||s;return e("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[e("h1",{attrs:{id:"webassembly"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#webassembly","aria-hidden":"true"}},[a._v("#")]),a._v(" WebAssembly")]),a._v(" "),e("h2",{attrs:{id:"_1-首先，让我们看看webassembly做什么"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_1-首先，让我们看看webassembly做什么","aria-hidden":"true"}},[a._v("#")]),a._v(" 1. 首先，让我们看看WebAssembly做什么")]),a._v(" "),e("p",[a._v("首先，我们有必要了解一下asm.js。2012年，Mozilla 的工程师 Alon Zakai 在研究 LLVM 编译器时突发奇想：许多 3D 游戏都是用 C / C++ 语言写的，如果能将 C / C++ 语言编译成 JavaScript 代码，它们不就能在浏览器里运行了吗？众所周知，JavaScript 的基本语法与 C 语言高度相似。于是，他开始研究怎么才能实现这个目标，为此专门做了一个编译器项目 Emscripten。这个编译器可以将 C / C++ 代码编译成 JS 代码，但不是普通的 JS，而是一种叫做 asm.js 的 JavaScript 变体，性能差不多是原生代码的50%。")]),a._v(" "),e("p",[a._v("之后Google开发了Portable Native Client，也是一种能让浏览器运行C/C++代码的技术。 后来可能是因为彼此之间有共同的更高追求，Google, Microsoft, Mozilla, Apple等几家大公司一起合作开发了一个面向Web的通用二进制和文本格式的项目，那就是WebAssembly。asm.js 与 WebAssembly 功能基本一致，就是转出来的代码不一样：asm.js 是文本，WebAssembly 是二进制字节码，因此运行速度更快、体积更小。")]),a._v(" "),e("p",[a._v("WebAssembly(又称 wasm) 是一种新的字节码格式，主流浏览器都已经支持 WebAssembly。 和 JS 需要解释执行不同的是，WebAssembly 字节码和底层机器码很相似可快速装载运行，因此性能相对于 JS 解释执行大大提升。 也就是说 WebAssembly 并不是一门编程语言，而是一份字节码标准，需要用高级编程语言编译出字节码放到 WebAssembly 虚拟机中才能运行， 浏览器厂商需要做的就是根据 WebAssembly 规范实现虚拟机。")]),a._v(" "),e("h2",{attrs:{id:"_2-webassembly-加载时间"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_2-webassembly-加载时间","aria-hidden":"true"}},[a._v("#")]),a._v(" 2. WebAssembly 加载时间")]),a._v(" "),e("p",[a._v("WebAssembly 在浏览器中加载速度更快，因为只有已经编译好的 wasm 文件需要通过internet传输。wasm 是一种低级汇编语言，具有非常简洁的二进制格式。")]),a._v(" "),e("h2",{attrs:{id:"_3-webassembly-执行速度"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_3-webassembly-执行速度","aria-hidden":"true"}},[a._v("#")]),a._v(" 3. WebAssembly 执行速度")]),a._v(" "),e("p",[a._v("如今 Wasm 运行速度只比"),e("strong",[a._v("原生代码")]),a._v("慢 20%，这是一个令人惊喜的结果。它是这样的一种格式，会被编译进沙箱环境中且在大量的约束条件下运行以保证没有任何安全漏洞或者使之强化。和真正的"),e("strong",[a._v("原生代码")]),a._v("比较，执行速度的下降微乎其微。更重要的是，未来将会更加快速。")]),a._v(" "),e("p",[a._v("更好的是，它与浏览器无关——所有主要引擎都增加了对 WebAssembly的支持，且执行速度相差无几。")]),a._v(" "),e("p",[a._v("为了理解与JavaScript相比WebAssembly的执行速度有多快，应该首先阅读关于"),e("a",{attrs:{href:"https://segmentfault.com/a/1190000017369465",target:"_blank",rel:"noopener noreferrer"}},[a._v("JavaScript引擎如何工作"),e("OutboundLink")],1),a._v("的文章。")]),a._v(" "),e("p",[a._v("让我们快速浏览下 V8 的运行机制：")]),a._v(" "),e("p",[e("img",{attrs:{src:"https://wsk-mweb.oss-cn-hangzhou.aliyuncs.com/ipic/2020-04-06-151447.png",alt:"图片描述"}})]),a._v(" "),e("p",[a._v("在左边，是一些JavaScript源代码，包含JavaScript函数。首先需要解析它，以便将所有字符串转换为标记并生成抽象语法树(AST)。AST 是JavaScript程序逻辑结构在内存中的表示形式。一旦生成了 AST，V8 直接进入到机器码阶段。其后遍历树，生成机器码，就得到了编译好的函数，在这个过程中是没有提高遍历速度的。")]),a._v(" "),e("p",[a._v("现在，让我们看看V8管道在下一阶段的工作:")]),a._v(" "),e("p",[e("img",{attrs:{src:"https://wsk-mweb.oss-cn-hangzhou.aliyuncs.com/ipic/2020-04-06-151451.png",alt:"图片描述"}})]),a._v(" "),e("p",[a._v("现在有了V8 的新的优化编译器 (TurboFan), 当 JavaScript应用程序在运行时，很多代码都在 V8 中运行。"),e("strong",[a._v("TurboFan")]),a._v(" 监测是否有代码运行缓慢，是否存在性能瓶颈和热点(内存使用过高的地方)，以便对其进行优化。它把以上监视得到的代码推向后端即优化过的即时编译器，该编译器把消耗大量 CPU 资源的函数转换为性能更优的代码。")]),a._v(" "),e("p",[a._v("它解决了性能的问题，但这种处理方式有个缺点，分析代码和决定优化哪些内容的过程也会消耗CPU，这意味着更高的耗电量，特别是在移动设备上。")]),a._v(" "),e("p",[a._v("但是，wasm 并不需要以上的全部步骤－如下所示是它被插入到执行过程示意图：")]),a._v(" "),e("p",[e("img",{attrs:{src:"https://wsk-mweb.oss-cn-hangzhou.aliyuncs.com/ipic/2020-04-06-151456.png",alt:"图片描述"}})]),a._v(" "),e("p",[a._v("在编译阶段，WebAssembly 不需要被转换，因为它已经是字节码了。总之，以上的解析不在需要，你拥有优化后的二进制代码可以直接插入到后端（即时编译器）并生成机器码。编译器在前端已经完成了所有的代码优化工作。")]),a._v(" "),e("p",[a._v("由于跳过了编译过程中的不少步骤，这使得 wasm 的执行更加高效。")]),a._v(" "),e("h2",{attrs:{id:"_4-webassembly-内存模型"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_4-webassembly-内存模型","aria-hidden":"true"}},[a._v("#")]),a._v(" 4. WebAssembly 内存模型")]),a._v(" "),e("p",[e("img",{attrs:{src:"https://wsk-mweb.oss-cn-hangzhou.aliyuncs.com/ipic/2020-04-06-151501.png",alt:"图片描述"}})]),a._v(" "),e("p",[a._v("例如，编译 成WebAssembly 的c++ 程序的内存是一个连续的内存块，其中没有“漏洞”。wasm 有助于提高安全性的一个特性是执行堆栈与线性内存分离的概念。在 c++ 程序中，如果有一个堆，从堆的底部进行分配，然后从其顶部获得内存来增加内存堆栈的大小。你可以获得一个指针然后在堆栈内存中遍历以操作你不应该接触到的变量。")]),a._v(" "),e("p",[a._v("这是大多数可疑软件可以利用的漏洞。")]),a._v(" "),e("p",[a._v("WebAssembly采用了完全不同的内在模式。执行堆栈与 WebAssembly 程序本身是分开的，因此无法在其中修改和更改诸如变量的值。同样，这些函数使用整数偏移量，而不是指针。函数指向一个间接函数表。之后，这些直接的计算出的数字进入模块中的函数。通过这种方式构建的，可以同时加载多个 wasm 模块，偏移所有索引且每个模块都运行良好。")]),a._v(" "),e("p",[a._v("更多关于 JavaScript 内存模型和管理的文章详见"),e("a",{attrs:{href:"https://blog.sessionstack.com/how-javascript-works-memory-management-how-to-handle-4-common-memory-leaks-3f28b94cfbec",target:"_blank",rel:"noopener noreferrer"}},[a._v("这里"),e("OutboundLink")],1),a._v("。")]),a._v(" "),e("h2",{attrs:{id:"_5-webassembly-垃圾收集"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_5-webassembly-垃圾收集","aria-hidden":"true"}},[a._v("#")]),a._v(" 5. WebAssembly 垃圾收集")]),a._v(" "),e("p",[a._v("在 JavaScript 中，开发者不需要担心内存中无用变量的回收。JS 引擎使用一个叫垃圾回收器的东西来自动进行垃圾回收处理。")]),a._v(" "),e("p",[a._v("现在，WebAssembly 根本不支持垃圾回收。内存是手动管理的（就像 C/C++）。虽然这些可能让开发者编程更困难，但它的确提升了性能。")]),a._v(" "),e("p",[a._v("目前，WebAssembly 是专门围绕 C++ 和 RUST 的使用场景设计的。由于 wasm 是非常底层的语言，这意味着只比汇编语言高一级的编程语言会容易被编译成 WebAssembly。C 语言可以使用 malloc，C++ 可以使用智能指针，Rust 使用完全不同的模式（一个完全不同的话题）。这些语言没有使用内存垃圾回收器，所以他们不需要所有复杂运行时的东西来追踪内存。WebAssembly 自然就很适合于这些语言。")]),a._v(" "),e("p",[a._v("另外，这些语言并不能够 100% 地应用于复杂的 JavaScript 使用场景比如监听 DOM 变化 。用 C++ 来写整个的 HTML 程序是毫无意义的因为 C++ 并不是为此而设计的。大多数情况下，工程师用使用 C++ 或 Rust 来编写 WebGL 或者高度优化的库（比如大量的数学运算）。")]),a._v(" "),e("p",[a._v("然而，将来 WebAssembly 将会支持不带内存垃圾回功能的的语言。")]),a._v(" "),e("h2",{attrs:{id:"_6-webassembly-平台接口访问"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_6-webassembly-平台接口访问","aria-hidden":"true"}},[a._v("#")]),a._v(" 6. WebAssembly 平台接口访问")]),a._v(" "),e("p",[a._v("依赖于执行 JavaScript 的运行时环境，对特定于平台的api的访问是公开的，可以通过 JavaScript 程序来直接访问这些平台所暴露出的指定接口。例如，如果您在浏览器中运行JavaScript，有一组Web API, Web 应用程序可以调用这些API来控制Web浏览器/设备功能，并访问 DOM、CSSOM、WebGL、IndexedDB、Web Audio API 等等。")]),a._v(" "),e("p",[a._v("然而，WebAssembly 模块不能访问任何平台api。所有的这一切都得由 JavaScript 来进行中转。如果想在 WebAssembly 模块中访问一些特定于平台的api，必须通过JavaScript调用它。")]),a._v(" "),e("p",[a._v("例如，如果想使用 "),e("code",[a._v("console.log")]),a._v("，你必须通过JavaScript调用它，而不是 c++ 代码。而这些 JavaScript 调用会产生一定的性能损失。")]),a._v(" "),e("p",[a._v("情况不会一成不变的。规范将会为在未来为 wasm 提供访问指定平台的接口，这样你就可以不用在你的程序中内置 JavaScript。")]),a._v(" "),e("h2",{attrs:{id:"_7-从源码转换讲起"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_7-从源码转换讲起","aria-hidden":"true"}},[a._v("#")]),a._v(" 7. 从源码转换讲起")]),a._v(" "),e("p",[a._v("JavaScript脚本正变得越来越复杂。大部分源码（尤其是各种函数库和框架）都要经过转换，才能投入生产环境。")]),a._v(" "),e("p",[a._v("常见的源码转换，主要是以下三种情况：")]),a._v(" "),e("ol",[e("li",[a._v("压缩，减小体积。比如jQuery 1.9的源码，压缩前是252KB，压缩后是32KB。")]),a._v(" "),e("li",[a._v("多个文件合并，减少HTTP请求数。")]),a._v(" "),e("li",[a._v("其他语言编译成JavaScript。最常见的例子就是CoffeeScript。")])]),a._v(" "),e("p",[a._v("这三种情况，都使得实际运行的代码不同于开发代码，除错（debug）变得困难重重。")]),a._v(" "),e("p",[a._v("通常，JavaScript的解释器会告诉你，第几行第几列代码出错。但是，这对于转换后的代码毫无用处。举例来说，jQuery 1.9压缩后只有3行，每行3万个字符，所有内部变量都改了名字。你看着报错信息，感到毫无头绪，根本不知道它所对应的原始位置。")]),a._v(" "),e("p",[a._v("这就是Source map想要解决的问题。")]),a._v(" "),e("h2",{attrs:{id:"_8-source-map"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_8-source-map","aria-hidden":"true"}},[a._v("#")]),a._v(" 8. Source map")]),a._v(" "),e("p",[a._v("简单说，Source map就是一个信息文件，里面储存着位置信息。也就是说，转换后的代码的每一个位置，所对应的转换前的位置。有了它，出错的时候，除错工具将直接显示原始代码，而不是转换后的代码。这无疑给开发者带来了很大方便。")]),a._v(" "),e("p",[e("img",{attrs:{src:"https://wsk-mweb.oss-cn-hangzhou.aliyuncs.com/ipic/2020-04-06-151507.png",alt:"图片描述"}})]),a._v(" "),e("p",[a._v("由于没有规范定义Source map，所以目前 WebAssembly 并不支持，但最终会有的(可能快了)。当你在 C++ 代码中设置了断点，你将会看到 C++ 代码而不是 WebAssembly。至少，这是 WebAssembly 源码映射的目标。")]),a._v(" "),e("h2",{attrs:{id:"_9-多线程"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_9-多线程","aria-hidden":"true"}},[a._v("#")]),a._v(" 9. 多线程")]),a._v(" "),e("p",[a._v("JavaScript 是单线程的。有一些方法可以利用事件循环并利用异步编程，这个之前在 JavaScript是如何工作的:"),e("a",{attrs:{href:"https://segmentfault.com/a/1190000017419328",target:"_blank",rel:"noopener noreferrer"}},[a._v("事件循环和异步编程的崛起+ 5种使用 async/await 更好地编码方式"),e("OutboundLink")],1),a._v(" 已经讲过了。")]),a._v(" "),e("p",[a._v("JavaScript 也使用 Web Workers 但是只有在极其特殊的情况下－大体上，可以把任何可能阻塞 UI 主线程的密集的 CPU 计算移交给 Web Worker 执行以获得更好的性能。但是，Web Worker 不能够访问 DOM。")]),a._v(" "),e("p",[a._v("目前 WebAssembly 不支持多线程。但是，这有可能是接下来 WebAssembly 要实现的。Wasm 将会接近实现原生的线程（比如，C++ 风格的线程）。拥有真正的线程将会在浏览器中创造出很多新的机遇。并且当然，会增加滥用的可能性。")]),a._v(" "),e("h2",{attrs:{id:"_10-可移植性"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_10-可移植性","aria-hidden":"true"}},[a._v("#")]),a._v(" 10. 可移植性")]),a._v(" "),e("p",[a._v("现在JavaScript几乎可以在任何地方运行，从浏览器到服务器端，甚至在嵌入式系统中。")]),a._v(" "),e("p",[a._v("WebAssembly的设计宗旨是安全、便携。就像JavaScript。它将运行在每个支持 wasm 的环境中(例如，每个浏览器)。")]),a._v(" "),e("p",[a._v("WebAssembly 拥有和早年 Java 使用 Applets 来实现可移植性的同样的目标。")]),a._v(" "),e("h2",{attrs:{id:"_11-webassembly-使用场景"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_11-webassembly-使用场景","aria-hidden":"true"}},[a._v("#")]),a._v(" 11. WebAssembly 使用场景")]),a._v(" "),e("p",[a._v("WebAssembly 的最初版本主要是为了解决大量计算密集型的计算的（比如处理数学问题）。最为主流的应用场景就是游戏——处理大量的像素。你可以使用你熟悉的 OpenGL 绑定来编写 C++/Rust 程序，然后编译成 wasm。之后，它就可以在浏览器中运行。")]),a._v(" "),e("h4",{attrs:{id:"_11-1-在浏览器中"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_11-1-在浏览器中","aria-hidden":"true"}},[a._v("#")]),a._v(" 11.1 "),e("strong",[a._v("在浏览器中")])]),a._v(" "),e("ul",[e("li",[a._v("更好的让一些语言和工具可以编译到 Web 平台运行。")]),a._v(" "),e("li",[a._v("图片/视频编辑。")]),a._v(" "),e("li",[a._v("游戏：\n"),e("ul",[e("li",[a._v("需要快速打开的小游戏")]),a._v(" "),e("li",[a._v("AAA 级，资源量很大的游戏。")]),a._v(" "),e("li",[a._v("游戏门户（代理/原创游戏平台）")])])]),a._v(" "),e("li",[a._v("P2P 应用（游戏，实时合作编辑）")]),a._v(" "),e("li",[a._v("音乐播放器（流媒体，缓存）")]),a._v(" "),e("li",[a._v("图像识别")]),a._v(" "),e("li",[a._v("视频直播")]),a._v(" "),e("li",[a._v("VR 和虚拟现实")]),a._v(" "),e("li",[a._v("CAD 软件")]),a._v(" "),e("li",[a._v("科学可视化和仿真")]),a._v(" "),e("li",[a._v("互动教育软件和新闻文章。")]),a._v(" "),e("li",[a._v("模拟/仿真平台(ARC, DOSBox, QEMU, MAME, …)。")]),a._v(" "),e("li",[a._v("语言编译器/虚拟机。")]),a._v(" "),e("li",[a._v("POSIX用户空间环境，允许移植现有的POSIX应用程序。")]),a._v(" "),e("li",[a._v("开发者工具（编辑器，编译器，调试器...）")]),a._v(" "),e("li",[a._v("远程桌面。")]),a._v(" "),e("li",[a._v("VPN。")]),a._v(" "),e("li",[a._v("加密工具。")]),a._v(" "),e("li",[a._v("本地 Web 服务器。")]),a._v(" "),e("li",[a._v("使用 NPAPI 分发的插件，但受限于 Web 安全协议，可以使用 Web APIs。")]),a._v(" "),e("li",[a._v("企业软件功能性客户端（比如：数据库）")])]),a._v(" "),e("h4",{attrs:{id:"_11-2-脱离浏览器"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_11-2-脱离浏览器","aria-hidden":"true"}},[a._v("#")]),a._v(" 11.2 "),e("strong",[a._v("脱离浏览器")])]),a._v(" "),e("ul",[e("li",[a._v("游戏分发服务（便携、安全）。")]),a._v(" "),e("li",[a._v("服务端执行不可信任的代码。")]),a._v(" "),e("li",[a._v("服务端应用。")]),a._v(" "),e("li",[a._v("移动混合原生应用。")]),a._v(" "),e("li",[a._v("多节点对称计算")])])])},[],!1,null,null,null);s.default=_.exports}}]);