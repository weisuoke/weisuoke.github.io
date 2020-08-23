(window.webpackJsonp=window.webpackJsonp||[]).push([[129],{297:function(t,s,a){"use strict";a.r(s);var e=a(2),n=Object(e.a)({},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"websocket"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#websocket","aria-hidden":"true"}},[t._v("#")]),t._v(" Websocket")]),t._v(" "),a("h2",{attrs:{id:"深入探索-websocket-和-http-2-与-sse-如何选择选择正确的路径"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#深入探索-websocket-和-http-2-与-sse-如何选择选择正确的路径","aria-hidden":"true"}},[t._v("#")]),t._v(" 深入探索 websocket 和 HTTP/2 与 SSE + 如何选择选择正确的路径")]),t._v(" "),a("p",[t._v("如今，功能丰富、动态 ui 的复杂 web 应用程序被认为是理所当然。这并不奇怪——互联网自诞生以来已经走过了漫长的道路。")]),t._v(" "),a("p",[t._v("最初，互联网并不是为了支持这种动态和复杂的 web 应用程序而构建的。它被认为是 HTML 页面的集合，相互链接形成一个包含信息的 “web” 概念。一切都是围绕 HTTP 的所谓 请求/响应 范式构建的。客户端加载一个页面，然后在用户单击并导航到下一个页面之前什么都不会发生。")]),t._v(" "),a("p",[t._v("大约在 2005 年，AJAX 被引入，很多人开始探索在客户端和服务器之间建立双向连接的可能性。尽管如此，所有 HTTP 通信都由客户端引导，客户端需要用户交互或定期轮询以从服务器加载新数据。")]),t._v(" "),a("h3",{attrs:{id:"_1-让-http-变成“双向”交互"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-让-http-变成“双向”交互","aria-hidden":"true"}},[t._v("#")]),t._v(" 1. 让 HTTP 变成“双向”交互")]),t._v(" "),a("p",[t._v("让服务器能够“主动”向客户机发送数据的技术已经出现了相当长的时间。例如“Push”和“Comet”。")]),t._v(" "),a("p",[t._v("最常见的一种黑客攻击方法是让服务器产生一种需要向客户端发送数据的错觉，这称为"),a("strong",[t._v("长轮询")]),t._v("。通过长轮询，客户端打开与服务器的 HTTP 连接，使其保持打开状态，直到发送响应为止。 每当服务器有新数据时需要发送时，就会作为响应发送。")]),t._v(" "),a("p",[t._v("看看一个非常简单的长轮询代码片段是什么样的:")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("poll")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("setTimeout")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    $"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("ajax")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      url"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"https://api.example.com/endpoint"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token function-variable function"}},[t._v("success")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("data")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// Do something with `data`")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// ...")]),t._v("\n\n        "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//Setup the next poll recursively")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("poll")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      dataType"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"json"')]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("10000")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),a("p",[t._v("这基本上是一个自执行函数，第一次立即运行时，它设置了 10 秒间隔，在对服务器的每个异步 Ajax 调用之后，回调将再次调用 Ajax。")]),t._v(" "),a("p",[t._v("其他技术涉及 Flash 或 XHR multipart request 和所谓的 htmlfiles 。")]),t._v(" "),a("p",[t._v("但是，所有这些工作区都有一个相同的问题:它们都带有 HTTP 的开销，这使得它们不适合于低延迟应用程序。想想浏览器中的多人第一人称射击游戏或任何其他带有实时组件的在线游戏。")]),t._v(" "),a("h3",{attrs:{id:"_2-websockets-的引入"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-websockets-的引入","aria-hidden":"true"}},[t._v("#")]),t._v(" 2. WebSockets 的引入")]),t._v(" "),a("p",[a("a",{attrs:{href:"https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API",target:"_blank",rel:"noopener noreferrer"}},[t._v("WebSocket"),a("OutboundLink")],1),t._v(" 规范定义了在 web 浏览器和服务器之间建立“套接字”连接的 API。简单地说:客户机和服务器之间存在长久连接，双方可以随时开始发送数据。")]),t._v(" "),a("p",[a("img",{attrs:{src:"https://wsk-mweb.oss-cn-hangzhou.aliyuncs.com/ipic/2020-03-31-151241.png",alt:"图片描述"}})]),t._v(" "),a("p",[t._v("客户端通过 WebSocket "),a("strong",[t._v("握手")]),t._v(" 过程建立 WebSocket 连接。这个过程从客户机向服务器发送一个常规 HTTP 请求开始，这个请求中包含一个升级头，它通知服务器客户机希望建立一个 WebSocket 连接。")]),t._v(" "),a("p",[t._v("客户端建立 WebSocket 连接方式如下：")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("// Create a new WebSocket with an encrypted connection.\nvar socket = new WebSocket('ws://websocket.example.com')\n")])])]),a("blockquote",[a("p",[t._v("WebSocket url 使用 ws 方案。还有 wss 用于安全的 WebSocket 连接，相当于 HTTPS。")])]),t._v(" "),a("p",[t._v("这个方案只是打开 websocket.example.com 的 WebSocket 连接的开始。")]),t._v(" "),a("p",[t._v("下面是初始请求头的一个简化示例：")]),t._v(" "),a("p",[a("img",{attrs:{src:"https://wsk-mweb.oss-cn-hangzhou.aliyuncs.com/ipic/2020-03-31-151245.png",alt:"图片描述"}})]),t._v(" "),a("p",[t._v("如果服务器支持 WebSocke t 协议，它将同意升级，并通过响应中的升级头进行通信。")]),t._v(" "),a("p",[t._v("Node.js 的实现方式：")]),t._v(" "),a("p",[a("img",{attrs:{src:"https://wsk-mweb.oss-cn-hangzhou.aliyuncs.com/ipic/2020-03-31-151250.png",alt:"图片描述"}})]),t._v(" "),a("p",[t._v("建立连接后，服务器通过升级头部中内容时行响应:")]),t._v(" "),a("p",[a("img",{attrs:{src:"https://wsk-mweb.oss-cn-hangzhou.aliyuncs.com/ipic/2020-03-31-151254.png",alt:"图片描述"}})]),t._v(" "),a("p",[t._v("一旦建立连接，open 事件将在客户端 WebSocket 实例上被触发:")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" socket "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("WebSocket")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"ws://websocket.example.com"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// Show a connected message when the WebSocket is opened.")]),t._v("\nsocket"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function-variable function"}},[t._v("onopen")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("event")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  console"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"WebSocket is connected."')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),a("p",[t._v("现在握手已经完成，初始 HTTP 连接被使用相同底层 TCP/IP 连接的 WebSocket 连接替换。此时，双方都可以开始发送数据。")]),t._v(" "),a("p",[t._v("使用 WebSockets，可以传输任意数量的数据，而不会产生与传统 HTTP 请求相关的开销。数据作为消息通过 WebSocket 传输，每个消息由一个或多个帧组成，其中包含正在发送的数据(有效负载)。为了确保消息在到达客户端时能够正确地进行重构，每一帧都以负载的 4-12 字节数据为前缀， 使用这种基于帧的消息传递系统有助于减少传输的非有效负载数据量，从而大大的减少延迟。")]),t._v(" "),a("blockquote",[a("p",[t._v("注意:值得注意的是，只有在接收到所有帧并重构了原始消息负载之后，客户机才会收到关于新消息的通知。")])]),t._v(" "),a("h3",{attrs:{id:"_3-websocket-urls"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_3-websocket-urls","aria-hidden":"true"}},[t._v("#")]),t._v(" 3. WebSocket URLs")]),t._v(" "),a("p",[t._v("之前简要提到过 WebSockets 引入了一个新的 URL 方案。实际上，他们引入了两个新的方案:ws:// 和 wss://。")]),t._v(" "),a("p",[t._v("url 具有特定方案的语法。WebSocket url 的特殊之处在于它们不支持锚点(#sample_anchor)。")]),t._v(" "),a("p",[t._v("同样的规则适用于 WebSocket 风格的 url 和 HTTP 风格的 url。ws 是未加密的，默认端口为 80，而 wss 需要 TLS 加密，默认端口为 443。")]),t._v(" "),a("h3",{attrs:{id:"_4-帧协议"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_4-帧协议","aria-hidden":"true"}},[t._v("#")]),t._v(" 4. 帧协议")]),t._v(" "),a("p",[t._v("更深入地了解帧协议，这是 "),a("a",{attrs:{href:"https://tools.ietf.org/html/rfc6455#page-27",target:"_blank",rel:"noopener noreferrer"}},[t._v("RFC"),a("OutboundLink")],1),t._v(" 为我们提供的：")]),t._v(" "),a("p",[t._v("在 RFC 指定的 WebSocket 版本中，每个包前面只有一个报头。然而，这是一个相当复杂的报头。以下是它的构建模块:")]),t._v(" "),a("p",[a("img",{attrs:{src:"https://wsk-mweb.oss-cn-hangzhou.aliyuncs.com/ipic/2020-03-31-151259.png",alt:"图片描述"}})]),t._v(" "),a("ul",[a("li",[a("code",[t._v("FIN")]),t._v(" ：1bit ，表示是消息的最后一帧，如果消息只有一帧那么第一帧也就是最后一帧，Firefox 在 32K 之后创建了第二个帧。")])]),t._v(" "),a("ul",[a("li",[a("code",[t._v("RSV1，RSV2，RSV3")]),t._v("：每个 1bit，必须是 0，除非扩展定义为非零。如果接受到的是非零值但是扩展没有定义，则需要关闭连接。")])]),t._v(" "),a("ul",[a("li",[a("p",[a("code",[t._v("Opcode")]),t._v("：4bit，解释 Payload 数据，规定有以下不同的状态，如果是未知的，接收方必须马上关闭连接。状态如下：")]),t._v(" "),a("ul",[a("li",[t._v("0x00: 附加数据帧")]),t._v(" "),a("li",[t._v("0x01：文本数据帧")]),t._v(" "),a("li",[t._v("0x02：二进制数据帧")]),t._v(" "),a("li",[t._v("0x3-7：保留为之后非控制帧使用")]),t._v(" "),a("li",[t._v("0x8：关闭连接帧")]),t._v(" "),a("li",[t._v("0x9：ping")]),t._v(" "),a("li",[t._v("0xA：pong")]),t._v(" "),a("li",[t._v("0xB-F(保留为后面的控制帧使用)")])])])]),t._v(" "),a("ul",[a("li",[a("code",[t._v("Mask")]),t._v("：1bit，掩码，定义 payload 数据是否进行了掩码处理，如果是 1 表示进行了掩码处理。")])]),t._v(" "),a("ul",[a("li",[a("code",[t._v("Masking-key")]),t._v(":域的数据即是掩码密钥，用于解码 PayloadData。客户端发出的数据帧需要进行掩码处理，所以此位是 1。")])]),t._v(" "),a("ul",[a("li",[a("code",[t._v("Payload_len")]),t._v("：7 位，7 + 16 位，7+64 位，payload 数据的长度，如果是 0-125，就是真实的 payload 长度，如果是 126，那么接着后面的 2 个字节对应的 16 位无符号整数就是 payload 数据长度；如果是 127，那么接着后面的 8 个字节对应的 64 位无符号整数就是 payload 数据的长度。")])]),t._v(" "),a("ul",[a("li",[a("code",[t._v("Masking-key")]),t._v("：0 到 4 字节，如果 MASK 位设为 1 则有 4 个字节的掩码解密密钥，否则就没有。")])]),t._v(" "),a("ul",[a("li",[a("code",[t._v("Payload data")]),t._v("：任意长度数据。包含有扩展定义数据和应用数据，如果没有定义扩展则没有此项，仅含有应用数据。")])]),t._v(" "),a("p",[t._v("为什么 WebSocket 是基于帧而不是基于流？我不知道，就像你一样，我很想了解更多，所以如果你有想法，请随时在下面的回复中添加评论和资源。另外，关于这个主题的讨论可以在 "),a("a",{attrs:{href:"https://news.ycombinator.com/item?id=3377406",target:"_blank",rel:"noopener noreferrer"}},[t._v("HackerNews"),a("OutboundLink")],1),t._v(" 上找到。")]),t._v(" "),a("h3",{attrs:{id:"_5-帧数据"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_5-帧数据","aria-hidden":"true"}},[t._v("#")]),t._v(" 5. 帧数据")]),t._v(" "),a("p",[t._v("如上所述，数据可以被分割成多个帧。 传输数据的第一帧有一个操作码，表示正在传输什么类型的数据。 这是必要的，因为 JavaScript 在开始规范时几乎不存在对二进制数据的支持。 0x01 表示 utf-8 编码的文本数据，0x02 是二进制数据。大多数人会发送 JSON ，在这种情况下，你可能要选择文本操作码。 当你发送二进制数据时，它将在浏览器特定的 "),a("a",{attrs:{href:"https://developer.mozilla.org/en-US/docs/Web/API/Blob",target:"_blank",rel:"noopener noreferrer"}},[t._v("Blob"),a("OutboundLink")],1),t._v(" 中表示。")]),t._v(" "),a("p",[t._v("通过 WebSocket 发送数据的 API 非常简单:")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" socket "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("WebSocket")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"ws://websocket.example.com"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\nsocket"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function-variable function"}},[t._v("onopen")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("event")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  socket"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("send")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Some message"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// Sends data to server.")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),a("p",[t._v("当 WebSocket 接收数据时(在客户端)，会触发一个消息事件。此事件包括一个名为 data 的属性，可用于访问消息的内容。")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// Handle messages sent by the server.")]),t._v("\nsocket"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function-variable function"}},[t._v("onmessage")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("event")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" message "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" event"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("data"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  console"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("message"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),a("p",[t._v("在 Chrome 开发工具:可以很容易地观察 WebSocket 连接中每个帧中的数据：")]),t._v(" "),a("p",[a("img",{attrs:{src:"https://wsk-mweb.oss-cn-hangzhou.aliyuncs.com/ipic/2020-03-31-151305.png",alt:"图片描述"}})]),t._v(" "),a("h3",{attrs:{id:"_6-消息分片"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_6-消息分片","aria-hidden":"true"}},[t._v("#")]),t._v(" 6. 消息分片")]),t._v(" "),a("p",[t._v("有效载荷数据可以分成多个单独的帧。接收端应该对它们进行缓冲，直到设置好 "),a("code",[t._v("fin")]),t._v(" 位。因此，可以将字符串“Hello World”发送到 11 个包中，每个包的长度为 6(报头长度)+ 1 字节。控件包不允许分片。但是，规范希望能够处理"),a("a",{attrs:{href:"https://en.wikipedia.org/wiki/Interleaving_%28data%29",target:"_blank",rel:"noopener noreferrer"}},[t._v("交错"),a("OutboundLink")],1),t._v("的控制帧。这是 TCP 包以任意顺序到达的情况。")]),t._v(" "),a("p",[t._v("连接帧的逻辑大致如下：")]),t._v(" "),a("ul",[a("li",[t._v("接收第一帧")]),t._v(" "),a("li",[t._v("记住操作码")]),t._v(" "),a("li",[t._v("将帧有效负载连接在一起，直到 fin 位被设置")]),t._v(" "),a("li",[t._v("断言每个包的操作码是零")])]),t._v(" "),a("p",[t._v("分片目的是发送长度未知的消息。如果不分片发送，即一帧，就需要缓存整个消息，计算其长度，构建 frame 并发送；使用分片的话，可使用一个大小合适的 buffer，用消息内容填充 buffer，填满即发送出去。")]),t._v(" "),a("h3",{attrs:{id:"_7-什么是跳动检测？"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_7-什么是跳动检测？","aria-hidden":"true"}},[t._v("#")]),t._v(" 7. 什么是跳动检测？")]),t._v(" "),a("p",[t._v("主要目的是保障客户端 websocket 与服务端连接状态，该程序有心跳检测及自动重连机制，当网络断开或者后端服务问题造成客户端 websocket 断开，程序会自动尝试重新连接直到再次连接成功。")]),t._v(" "),a("p",[t._v("在使用原生 websocket 的时候，如果设备网络断开，不会触发任何函数，前端程序无法得知当前连接已经断开。这个时候如果调用 websocket.send 方法，浏览器就会发现消息发不出去，便会立刻或者一定短时间后（不同浏览器或者浏览器版本可能表现不同）触发 onclose 函数。")]),t._v(" "),a("p",[t._v("后端 websocket 服务也可能出现异常，连接断开后前端也并没有收到通知，因此需要前端定时发送心跳消息 ping，后端收到 ping 类型的消息，立马返回 pong 消息，告知前端连接正常。如果一定时间没收到 pong 消息，就说明连接不正常，前端便会执行重连。")]),t._v(" "),a("p",[t._v("为了解决以上两个问题，以前端作为主动方，定时发送 ping 消息，用于检测网络和前后端连接问题。一旦发现异常，前端持续执行重连逻辑，直到重连成功。")]),t._v(" "),a("h3",{attrs:{id:"_8-错误处理"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_8-错误处理","aria-hidden":"true"}},[t._v("#")]),t._v(" 8. 错误处理")]),t._v(" "),a("p",[t._v("以通过监听 error 事件来处理所有错误：")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" socket "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("WebSocket")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"ws://websocket.example.com"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// Handle any error that occurs.")]),t._v("\nsocket"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function-variable function"}},[t._v("onerror")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("error")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  console"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"WebSocket Error: "')]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),t._v(" error"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),a("h3",{attrs:{id:"_9-关闭连接"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_9-关闭连接","aria-hidden":"true"}},[t._v("#")]),t._v(" 9. 关闭连接")]),t._v(" "),a("p",[t._v("要关闭连接，客户机或服务器都应该发送包含操作码"),a("code",[t._v("0x8")]),t._v("的数据的控制帧。当接收到这样一个帧时，另一个对等点发送一个关闭帧作为响应，然后第一个对等点关闭连接，关闭连接后接收到的任何其他数据都将被丢弃：")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// Close if the connection is open.")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("socket"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("readyState "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("===")]),t._v(" WebSocket"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token constant"}},[t._v("OPEN")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  socket"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("close")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("p",[t._v("另外，为了在完成关闭之后执行其他清理，可以将事件侦听器附加到关闭事件：")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// Do necessary clean up.")]),t._v("\nsocket"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function-variable function"}},[t._v("onclose")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("event")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  console"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Disconnected from WebSocket."')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),a("p",[t._v("服务器必须监听关闭事件以便在需要时处理它：")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[t._v("connection"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("on")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"close"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("reasonCode"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" description")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// The connection is getting closed.")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),a("h3",{attrs:{id:"_10-websockets-和-http-2-比较"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_10-websockets-和-http-2-比较","aria-hidden":"true"}},[t._v("#")]),t._v(" 10. WebSockets 和 HTTP/2 比较")]),t._v(" "),a("p",[t._v("虽然 HTTP/2 提供了很多功能，但它并没有完全满足对现有推送/流技术的需求。")]),t._v(" "),a("p",[t._v("关于 HTTP/2 的第一个重要的事情是它并不能替代所有的 HTTP 。verb、状态码和大部分头信息将保持与目前版本一致。HTTP/2 是意在提升数据在线路上传输的效率。")]),t._v(" "),a("p",[t._v("比较 HTTP/2 和 WebSocket，可以看到很多相似之处:")]),t._v(" "),a("p",[a("img",{attrs:{src:"https://segmentfault.com/img/bV9OCI?w=716&h=321",alt:"图片描述"}})]),t._v(" "),a("p",[t._v("正如我们在上面看到的，HTTP/2 引入了 "),a("a",{attrs:{href:"https://en.wikipedia.org/wiki/Push_technology?oldformat=true",target:"_blank",rel:"noopener noreferrer"}},[t._v("Server Push"),a("OutboundLink")],1),t._v("，它使服务器能够主动地将资源发送到客户机缓存。但是，它不允许将数据下推到客户机应用程序本身，服务器推送只由浏览器处理，不会在应用程序代码中弹出，这意味着应用程序没有 API 来获取这些事件的通知。")]),t._v(" "),a("p",[t._v("这就是服务器发送事件(SSE)变得非常有用的地方。SSE 是一种机制，它允许服务器在建立客户机-服务器连接之后异步地将数据推送到客户机。然后，只要有新的“数据块”可用，服务器就可以决定发送数据。它可以看作是单向"),a("a",{attrs:{href:"https://en.wikipedia.org/wiki/Publish%E2%80%93subscribe_pattern",target:"_blank",rel:"noopener noreferrer"}},[t._v("发布-订阅"),a("OutboundLink")],1),t._v("模式。它还提供了一个名为 "),a("a",{attrs:{href:"http://caniuse.com/#feat=eventsource",target:"_blank",rel:"noopener noreferrer"}},[t._v("EventSource API"),a("OutboundLink")],1),t._v(" 的标准 JavaScript，作为 W3C HTML5 标准的一部分，在大多数现代浏览器中实现。不支持 EventSource API 的浏览器可以轻松地使用 polyfilled 方案来解决。")]),t._v(" "),a("p",[t._v("由于 SSE 基于 HTTP ，因此它与 HTTP/2 非常合适，可以结合使用以实现最佳效果：HTTP/2 处理基于多路复用流的高效传输层，SSE 将 API 提供给应用以启用数据推送。")]),t._v(" "),a("p",[t._v("为了理解 Streams 和 Multiplexing 是什么，首先看一下``IETF`定义:“stream”是在 HTTP/2 连接中客户机和服务器之间交换的独立的、双向的帧序列。它的一个主要特征是，一个 HTTP/2 连接可以包含多个并发打开的流，任何一个端点都可以从多个流中交错帧。")]),t._v(" "),a("p",[a("img",{attrs:{src:"https://wsk-mweb.oss-cn-hangzhou.aliyuncs.com/ipic/2020-03-31-151310.png",alt:"图片描述"}})]),t._v(" "),a("p",[t._v("SSE 是基于 HTTP 的,这说明在 HTTP/2 中，不仅可以将多个 SSE 流交织到单个 TCP 连接上，而且还可以通过多个 SSE 流（服务器到客户端的推送）和多个客户端请求（客户端到服务器）。因为有 HTTP/2 和 SSE 的存在，现在有一个纯粹的 HTTP 双向连接和一个简单的 API 就可以让应用程序代码注册到服务器推送服务上。在比较 SSE 和 WebSocket 时，缺乏双向能力往往被认为是一个主要的缺陷。有了 HTTP/2，不再有这种情况。这样就可以跳过 WebSocket ，而坚持使用基于 HTTP 的信号机制。")]),t._v(" "),a("h3",{attrs:{id:"_11-如何选择-websocket-和-http-2"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_11-如何选择-websocket-和-http-2","aria-hidden":"true"}},[t._v("#")]),t._v(" 11. 如何选择 WebSocket 和 HTTP/2?")]),t._v(" "),a("p",[t._v("WebSockets 会在 HTTP/2 + SSE 的领域中生存下来，主要是因为它是一种已经被很好地应用的技术，并且在非常具体的使用情况下，它比 HTTP/2 更具优势，因为它已经被构建用于具有较少开销(如报头)的双向功能。")]),t._v(" "),a("p",[t._v("假设建立一个大型多人在线游戏，需要来自连接两端的大量消息。在这种情况下，WebSockets 的性能会好很多。")]),t._v(" "),a("p",[t._v("一般情况下，只要需要客户端和服务器之间的真正"),a("strong",[t._v("低延迟")]),t._v("，接近实时的连接，就使用 WebSocket ，这可能需要重新考虑如何构建服务器端应用程序，以及将焦点转移到队列事件等技术上。")]),t._v(" "),a("p",[t._v("使用的方案需要显示实时的市场消息，市场数据，聊天应用程序等，依靠 HTTP/2 + SSE 将为你提供高效的双向通信渠道，同时获得留在 HTTP 领域的各种好处：")]),t._v(" "),a("ul",[a("li",[t._v("当考虑到与现有 Web 基础设施的兼容性时，WebSocket 通常会变成一个痛苦的源头，因为它将 HTTP 连接升级到完全不同于 HTTP 的协议。")]),t._v(" "),a("li",[t._v("规模和安全性：Web 组件（防火墙，入侵检测，负载均衡）是以 HTTP 为基础构建，维护和配置的，这是大型/关键应用程序在弹性，安全性和可伸缩性方面更偏向的环境。")])])])},[],!1,null,null,null);s.default=n.exports}}]);