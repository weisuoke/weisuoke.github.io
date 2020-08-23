(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{400:function(t,a,s){"use strict";s.r(a);var n=s(2),e=Object(n.a)({},function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"vue-js必知必会"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#vue-js必知必会","aria-hidden":"true"}},[t._v("#")]),t._v(" Vue.js必知必会")]),t._v(" "),s("h2",{attrs:{id:"v-show-与-v-if-区别"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#v-show-与-v-if-区别","aria-hidden":"true"}},[t._v("#")]),t._v(" v-show 与 v-if 区别")]),t._v(" "),s("p",[s("code",[t._v("v-show")]),t._v(" 只是在 "),s("code",[t._v("display: none")]),t._v(" 和 "),s("code",[t._v("display: block")]),t._v(" 之间切换。无论初始条件是什么都会被渲染出来，后面只需要切换 CSS，DOM 还是一直保留着的。所以总的来说 "),s("code",[t._v("v-show")]),t._v(" 在初始渲染时有更高的开销，但是切换开销很小，更适合于频繁切换的场景。")]),t._v(" "),s("p",[s("code",[t._v("v-if")]),t._v(" 的话就得说到 Vue 底层的编译了。当属性初始为 "),s("code",[t._v("false")]),t._v(" 时，组件就不会被渲染，直到条件为 "),s("code",[t._v("true")]),t._v("，并且切换条件时会触发销毁/挂载组件，所以总的来说在切换时开销更高，更适合不经常切换的场景。")]),t._v(" "),s("p",[t._v("并且基于 "),s("code",[t._v("v-if")]),t._v(" 的这种惰性渲染机制，可以在必要的时候才去渲染组件，减少整个页面的初始渲染开销。")]),t._v(" "),s("h2",{attrs:{id:"组件中-data-什么时候可以使用对象"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#组件中-data-什么时候可以使用对象","aria-hidden":"true"}},[t._v("#")]),t._v(" 组件中 data 什么时候可以使用对象")]),t._v(" "),s("p",[t._v("组件复用时所有组件实例都会共享 data，如果 data 是对象的话，就会造成一个组件修改 data 以后会影响到其他所有组件，所以需要将 data 写成函数，每次用到就调用一次函数获得新的数据。")]),t._v(" "),s("p",[t._v("当我们使用 new Vue() 的方式的时候，无论我们将 data 设置为对象还是函数都是可以的，因为 new Vue() 的方式是生成一个根组件，该组件不会复用，也就不存在共享 data 的情况了。")]),t._v(" "),s("h2",{attrs:{id:"extend能做什么"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#extend能做什么","aria-hidden":"true"}},[t._v("#")]),t._v(" extend能做什么")]),t._v(" "),s("p",[t._v("这个 API 很少用到，作用是扩展组件生成一个构造器，通常会与 "),s("code",[t._v("$mount")]),t._v(" 一起使用。")]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 创建组件构造器")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" Component "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" Vue"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("extend")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  template"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'<div>test</div>'")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 挂载到 #app 上")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Component")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("$mount")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'#app'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 除了上面的方式，还可以用来扩展已有的组件")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" SuperComponent "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" Vue"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("extend")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("Component"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("SuperComponent")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("created")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        console"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("SuperComponent")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("$mount")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'#app'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),s("h2",{attrs:{id:"mixin和mixins的区别"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#mixin和mixins的区别","aria-hidden":"true"}},[t._v("#")]),t._v(" mixin和mixins的区别")]),t._v(" "),s("p",[s("code",[t._v("mixin")]),t._v(" 用于全局混入，会影响到每个组件实例，通常插件都是这样做初始化的。")]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[t._v("Vue"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("mixin")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("beforeCreate")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// ...逻辑")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 这种方式会影响到每个组件的 beforeCreate 钩子函数")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),s("p",[t._v("虽然文档不建议我们在应用中直接使用 "),s("code",[t._v("mixin")]),t._v("，但是如果不滥用的话也是很有帮助的，比如可以全局混入封装好的 "),s("code",[t._v("ajax")]),t._v(" 或者一些工具函数等等。")]),t._v(" "),s("p",[s("code",[t._v("mixins")]),t._v(" 应该是我们最常使用的扩展组件的方式了。如果多个组件中有相同的业务逻辑，就可以将这些逻辑剥离出来，通过 "),s("code",[t._v("mixins")]),t._v(" 混入代码，比如上拉下拉加载数据这种逻辑等等。")]),t._v(" "),s("p",[t._v("另外需要注意的是 "),s("code",[t._v("mixins")]),t._v(" 混入的钩子函数会先于组件内的钩子函数执行，并且在遇到同名选项的时候也会有选择性的进行合并，具体可以阅读 "),s("a",{attrs:{href:"https://link.juejin.im/?target=https%3A%2F%2Fcn.vuejs.org%2Fv2%2Fguide%2Fmixins.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("文档"),s("OutboundLink")],1),t._v("。")]),t._v(" "),s("h2",{attrs:{id:"computed-和-watch-区别"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#computed-和-watch-区别","aria-hidden":"true"}},[t._v("#")]),t._v(" computed 和 watch 区别")]),t._v(" "),s("p",[s("code",[t._v("computed")]),t._v(" 是计算属性，依赖其他属性计算值，并且 "),s("code",[t._v("computed")]),t._v(" 的值有缓存，只有当计算值变化才会返回内容。")]),t._v(" "),s("p",[s("code",[t._v("watch")]),t._v(" 监听到值的变化就会执行回调，在回调中可以进行一些逻辑操作。")]),t._v(" "),s("p",[t._v("所以一般来说需要依赖别的属性来动态获得值的时候可以使用 "),s("code",[t._v("computed")]),t._v("，对于监听到值的变化需要做一些复杂业务逻辑的情况可以使用 "),s("code",[t._v("watch")]),t._v("。")]),t._v(" "),s("p",[t._v("另外 "),s("code",[t._v("computed")]),t._v(" 和 "),s("code",[t._v("watch")]),t._v(" 还都支持对象的写法，这种方式知道的人并不多。")]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[t._v("vm"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("$watch")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'obj'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 深度遍历")]),t._v("\n    deep"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("true")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 立即触发")]),t._v("\n    immediate"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("true")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 执行的函数")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token function-variable function"}},[t._v("handler")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("val"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" oldVal")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" vm "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Vue")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  data"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" a"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  computed"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    aPlus"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// this.aPlus 时触发")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token function-variable function"}},[t._v("get")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("a "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// this.aPlus = 1 时触发")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token function-variable function"}},[t._v("set")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("v")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("a "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" v "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),s("h2",{attrs:{id:"编译过程"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#编译过程","aria-hidden":"true"}},[t._v("#")]),t._v(" 编译过程")]),t._v(" "),s("p",[t._v("想必大家在使用 Vue 开发的过程中，基本都是使用模板的方式。那么你有过「模板是怎么在浏览器中运行的」这种疑虑嘛？")]),t._v(" "),s("p",[t._v("首先直接把模板丢到浏览器中肯定是不能运行的，模板只是为了方便开发者进行开发。Vue 会通过编译器将模板通过几个阶段最终编译为 "),s("code",[t._v("render")]),t._v(" 函数，然后通过执行 "),s("code",[t._v("render")]),t._v(" 函数生成 Virtual DOM 最终映射为真实 DOM。")]),t._v(" "),s("p",[t._v("接下来我们就来学习这个编译的过程，了解这个过程中大概发生了什么事情。这个过程其中又分为三个阶段，分别为：")]),t._v(" "),s("ol",[s("li",[t._v("将模板解析为 AST")]),t._v(" "),s("li",[t._v("优化 AST")]),t._v(" "),s("li",[t._v("将 AST 转换为 "),s("code",[t._v("render")]),t._v(" 函数")])]),t._v(" "),s("p",[t._v("在第一个阶段中，最主要的事情还是通过各种各样的正则表达式去匹配模板中的内容，然后将内容提取出来做各种逻辑操作，接下来会生成一个最基本的 AST 对象")]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 类型")]),t._v("\n    type"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 标签")]),t._v("\n    tag"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 属性列表")]),t._v("\n    attrsList"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" attrs"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 属性映射")]),t._v("\n    attrsMap"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("makeAttrsMap")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("attrs"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 父节点")]),t._v("\n    parent"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 子节点")]),t._v("\n    children"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),s("p",[t._v("然后会根据这个最基本的 AST 对象中的属性，进一步扩展 AST。")]),t._v(" "),s("p",[t._v("当然在这一阶段中，还会进行其他的一些判断逻辑。比如说对比前后开闭标签是否一致，判断根组件是否只存在一个，判断是否符合 HTML5 "),s("a",{attrs:{href:"https://link.juejin.im/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FGuide%2FHTML%2FContent_categories",target:"_blank",rel:"noopener noreferrer"}},[t._v("Content Model"),s("OutboundLink")],1),t._v(" 规范等等问题。")]),t._v(" "),s("p",[t._v("接下来就是优化 AST 的阶段。在当前版本下，Vue 进行的优化内容其实还是不多的。只是对节点进行了静态内容提取，也就是将永远不会变动的节点提取了出来，实现复用 Virtual DOM，跳过对比算法的功能。在下一个大版本中，Vue 会在优化 AST 的阶段继续发力，实现更多的优化功能，尽可能的在编译阶段压榨更多的性能，比如说提取静态的属性等等优化行为。")]),t._v(" "),s("p",[t._v("最后一个阶段就是通过 AST 生成 "),s("code",[t._v("render")]),t._v(" 函数了。其实这一阶段虽然分支有很多，但是最主要的目的就是遍历整个 AST，根据不同的条件生成不同的代码罢了。")])])},[],!1,null,null,null);a.default=e.exports}}]);