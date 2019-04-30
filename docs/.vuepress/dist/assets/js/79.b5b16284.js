(window.webpackJsonp=window.webpackJsonp||[]).push([[79],{250:function(t,s,a){"use strict";a.r(s);var n=a(2),e=Object(n.a)({},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"javascript中的类型以及如何进行类型判断"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#javascript中的类型以及如何进行类型判断","aria-hidden":"true"}},[t._v("#")]),t._v(" JavaScript中的类型以及如何进行类型判断")]),t._v(" "),a("p",[t._v("Javascript 由于各种各样的原因，在判断一个变量的数据类型方面一直存在着一些问题，其中最典型的问题恐怕就是 "),a("code",[t._v("typeof null")]),t._v(" 会返回 "),a("code",[t._v("object")]),t._v(" 了吧。因此在这里简单的总结一下判断数据类型时常见的陷阱，以及正确的处理姿势。")]),t._v(" "),a("h2",{attrs:{id:"_1-javascript-数据类型"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-javascript-数据类型","aria-hidden":"true"}},[t._v("#")]),t._v(" 1. javascript 数据类型")]),t._v(" "),a("blockquote",[a("p",[a("a",{attrs:{href:"https://link.juejin.im/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FJavaScript%2FData_structures",target:"_blank",rel:"noopener noreferrer"}},[t._v("MDN 数据类型"),a("OutboundLink")],1)])]),t._v(" "),a("h3",{attrs:{id:"_1-1-数据类型"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-1-数据类型","aria-hidden":"true"}},[t._v("#")]),t._v(" 1.1 数据类型")]),t._v(" "),a("p",[t._v("这里先谈一下 javascript 这门语言的数据类型。javascript 中有七种数据类型，其中有六种简单数据类型，一种复杂数据类型。")]),t._v(" "),a("h4",{attrs:{id:"_1-1-1-六种简单数据类型"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-1-1-六种简单数据类型","aria-hidden":"true"}},[t._v("#")]),t._v(" 1.1.1 六种简单数据类型")]),t._v(" "),a("ul",[a("li",[t._v("String")]),t._v(" "),a("li",[t._v("Number")]),t._v(" "),a("li",[t._v("Boolean")]),t._v(" "),a("li",[t._v("Null")]),t._v(" "),a("li",[t._v("Undefined")]),t._v(" "),a("li",[t._v("Symbol (ECMAScript 6 新定义)")])]),t._v(" "),a("h4",{attrs:{id:"_1-1-3-复杂数据类型"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-1-3-复杂数据类型","aria-hidden":"true"}},[t._v("#")]),t._v(" 1.1.3 复杂数据类型")]),t._v(" "),a("p",[a("code",[t._v("Object")]),t._v(" 是唯一的复杂数据类型。 "),a("code",[t._v("Object Array Function")]),t._v(" 这些引用类型值最终都可以归结为 "),a("code",[t._v("Object")]),t._v(" 复杂数据类型。")]),t._v(" "),a("hr"),t._v(" "),a("h2",{attrs:{id:"_2-各种陷阱"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-各种陷阱","aria-hidden":"true"}},[t._v("#")]),t._v(" 2. 各种陷阱")]),t._v(" "),a("h3",{attrs:{id:"_2-1-typeof-的陷阱"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-1-typeof-的陷阱","aria-hidden":"true"}},[t._v("#")]),t._v(" 2.1 typeof 的陷阱")]),t._v(" "),a("blockquote",[a("p",[a("a",{attrs:{href:"https://link.juejin.im/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FJavaScript%2FReference%2FOperators%2Ftypeof",target:"_blank",rel:"noopener noreferrer"}},[t._v("MDN typeof"),a("OutboundLink")],1)])]),t._v(" "),a("p",[a("code",[t._v("typeof")]),t._v(" 是用来检测变量数据类型的操作符，对一个值使用 "),a("code",[t._v("typeof")]),t._v(" 操作符可能会返回下列某个字符串")]),t._v(" "),a("ul",[a("li",[t._v('"undefined" --- 如果这个值未定义')]),t._v(" "),a("li",[t._v('"string" --- 如果这个值是字符串')]),t._v(" "),a("li",[t._v('"boolean" --- 如果这个值是布尔类型值')]),t._v(" "),a("li",[t._v('"number" --- 如果这个值是数值')]),t._v(" "),a("li",[t._v('"object" --- 如果这个值是对象或者 null')]),t._v(" "),a("li",[t._v('"function" --- 如果这个值是函数')])]),t._v(" "),a("h4",{attrs:{id:"_2-1-1-object-对象检测的陷阱"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-1-1-object-对象检测的陷阱","aria-hidden":"true"}},[t._v("#")]),t._v(" 2.1.1. Object 对象检测的陷阱")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("isObj")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("obj")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("typeof")]),t._v(" obj "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("===")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'object'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'It is object'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'It is not object'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("p",[t._v("这个函数的本意是想检测传入的参数是否是 Object 对象。但是这个函数其实是非常不安全的。")]),t._v(" "),a("p",[t._v("比如")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" a "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("2")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("3")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("isObj")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("a"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("   "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 'It is object'")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" b "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("null")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("isObj")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("b"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("   "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 'It is object'")]),t._v("\n")])])]),a("p",[t._v("这样明显是不对的，因为 "),a("code",[t._v("typeof []")]),t._v(" 和 "),a("code",[t._v("typeof null")]),t._v(" 都是是会返回 "),a("code",[t._v("'object'")]),t._v("的。")]),t._v(" "),a("h4",{attrs:{id:"_2-1-2-array-对象检测的陷阱"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-1-2-array-对象检测的陷阱","aria-hidden":"true"}},[t._v("#")]),t._v(" 2.1.2. Array 对象检测的陷阱")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("typeof")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//  'object'")]),t._v("\n")])])]),a("p",[t._v("上面说到了对一个数组使用 typeof 操作符也是会返回 "),a("code",[t._v("'object'")]),t._v("，因此 typeof 并不能判断数组对象的类型")]),t._v(" "),a("h3",{attrs:{id:"_2-2-instanceof-的陷阱-与-基本包装类型"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-2-instanceof-的陷阱-与-基本包装类型","aria-hidden":"true"}},[t._v("#")]),t._v(" 2.2 instanceof 的陷阱 与 基本包装类型")]),t._v(" "),a("h4",{attrs:{id:"_2-2-1-instanceof"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-2-1-instanceof","aria-hidden":"true"}},[t._v("#")]),t._v(" 2.2.1. instanceof")]),t._v(" "),a("blockquote",[a("p",[a("a",{attrs:{href:"https://link.juejin.im/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FJavaScript%2FReference%2FOperators%2Finstanceof",target:"_blank",rel:"noopener noreferrer"}},[t._v("MDN instanceof"),a("OutboundLink")],1)])]),t._v(" "),a("p",[t._v("instanceof 运算符用来测试一个对象在其原型链中是否存在一个构造函数的 prototype 属性。")]),t._v(" "),a("h4",{attrs:{id:"_2-2-2-基本包装类"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-2-2-基本包装类","aria-hidden":"true"}},[t._v("#")]),t._v(" 2.2.2. 基本包装类")]),t._v(" "),a("blockquote",[a("p",[t._v("《Javascript》高级程序设计 第五章第六节 基本包装类型")])]),t._v(" "),a("p",[t._v("javascript 为了方便操作基本类型值，ECMAscript 提供了3个特殊的引用类型：Boolean、Number 和 String。 每当读取一个基本类型值的时候，后台就会创建一个对应的基本包装类型的对象，从而让我们能够调用一些方法来操作这些数据。")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" s1 "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"some text"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" s2 "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" s1"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("substring")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("2")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),a("p",[t._v("上面的代码中，先创建了一个字符串保存在了变量 s1，字符串当然是基本类型值。但是在下一行中我们又调用了 s1 的方法。我们知道基本类型值不是对象，理论上它不应该拥有方法（但它们确实有方法）。其实，为了让我们实现这种直观的操作，后台已经帮助我们完成了一系列的操作。当我们在第二行代码中访问 s1 变量时，访问过程处于读取模式，而在读取模式中访问字符串时，后台都会自动完成下列处理。")]),t._v(" "),a("ol",[a("li",[t._v("创建 String 类型的一个实例；")]),t._v(" "),a("li",[t._v("在实例上调用指定的方法；")]),t._v(" "),a("li",[t._v("销毁这个实例。")])]),t._v(" "),a("p",[t._v("可以将以上三个步骤想像成是执行了下列代码")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" s1 "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("String")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"some text"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" s2 "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" s1"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("substring")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("2")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\ns1 "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("null")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),a("h4",{attrs:{id:"_2-2-3-instanceof-判断基本类型值的陷阱"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-2-3-instanceof-判断基本类型值的陷阱","aria-hidden":"true"}},[t._v("#")]),t._v(" 2.2.3. instanceof 判断基本类型值的陷阱")]),t._v(" "),a("p",[t._v("上面提到基本包装类，就是为了说明 instanceof 这个陷阱")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" str "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'text'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\nstr "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("instanceof")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("String")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// false")]),t._v("\n")])])]),a("p",[t._v("本来我也是想当然的认为 "),a("code",[t._v("str instanceof String")]),t._v(" 会使 str 变量处于读取模式，自动建立基本包装类。但是根据上述代码所体现表象来看，instanceof 运算符是直接访问的变量的原始值。")]),t._v(" "),a("p",[t._v("因此 instanceof 并不能用来判断五种基本类型值")]),t._v(" "),a("h4",{attrs:{id:"_2-2-4-instanceof-判断-object类型的陷阱"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-2-4-instanceof-判断-object类型的陷阱","aria-hidden":"true"}},[t._v("#")]),t._v(" 2.2.4. instanceof 判断 Object类型的陷阱")]),t._v(" "),a("p",[t._v("这里先说一下，用 instanceof 判断 Array 类型基本上是非常ok的")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" arr "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("2")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("3")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\narr "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("instanceof")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Array")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("   "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// true")]),t._v("\n")])])]),a("p",[t._v("但是 instanceof 却不能安全的判断 Object 类型，因为 Array 构造函数是继承自 Object 对象的，因此在 arr 变量上是可以访问到 Object 的 prototype 属性的。如下例所示：")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" arr "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("2")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("3")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\narr "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("instanceof")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Object")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// true")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 会返回 true ，是因为 Object 构造函数的 prototype 属性存在与 arr 这个数组实例的原型链上。")]),t._v("\n")])])]),a("hr"),t._v(" "),a("h2",{attrs:{id:"_3-一个高效但危险的变量类型判断方法"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_3-一个高效但危险的变量类型判断方法","aria-hidden":"true"}},[t._v("#")]),t._v(" 3. 一个高效但危险的变量类型判断方法")]),t._v(" "),a("h3",{attrs:{id:"_3-1-用对象的-constructor-来判断对象类型"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_3-1-用对象的-constructor-来判断对象类型","aria-hidden":"true"}},[t._v("#")]),t._v(" 3.1 用对象的 constructor 来判断对象类型")]),t._v(" "),a("p",[a("a",{attrs:{href:"https://link.juejin.im/?target=https%3A%2F%2Fstackoverflow.com%2Fquestions%2F767486%2Fhow-do-you-check-if-a-variable-is-an-array-in-javascript",target:"_blank",rel:"noopener noreferrer"}},[t._v("stack overflow"),a("OutboundLink")],1),t._v(" 上有人做了实验，说是目前运算最快的判断变量类型的方式。")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("cstor")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("variable")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" cst "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" variable"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("constructor"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("switch")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("cst"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("case")]),t._v(" Number"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n            "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Number'")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("case")]),t._v(" String"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n            "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'String'")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("case")]),t._v(" Boolean"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n            "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Boolean'")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("case")]),t._v(" Array"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n            "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Array'")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("case")]),t._v(" Object"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n            "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Object'")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("p",[t._v("上面是一个判断变量类型的方法，工作的非常高效完美。但是用 constructor 判断变量类型有一个致命的缺陷，就是当检测 null 或者 undefined 类型的 constructor 属性时，js会报错！")]),t._v(" "),a("p",[t._v("也就是说下面代码会报错！")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[t._v("cstor")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("null")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 若传入 null 或者 undefined 作为参数时")]),t._v("\n              "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// cstor 函数第一行就会报错，因为 null 和 undefined 根本就没有 constructor 属性")]),t._v("\n")])])]),a("p",[t._v("因此我们在利用变量的 constructor 属性来判断变量类型时，必须要先保证变量有 不会是 null 或者 undefined。")]),t._v(" "),a("p",[t._v("改造以上函数如下：")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("cstor")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("variable")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("variable "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("===")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("null")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("||")]),t._v(" variable "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("===")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("undefined")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Null or Undefined'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" cst "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" variable"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("constructor"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("switch")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("cst"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("case")]),t._v(" Number"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n            "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Number'")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("case")]),t._v(" String"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n            "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'String'")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("case")]),t._v(" Boolean"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n            "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Boolean'")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("case")]),t._v(" Array"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n            "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Array'")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("case")]),t._v(" Object"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n            "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Object'")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("p",[t._v("所以说使用 constructor 来判断对象类型时要无时无刻不伴随着排除 null 和 undefined 的干扰，否则就会产生致命的问题，因此本人并不推荐。")]),t._v(" "),a("hr"),t._v(" "),a("h2",{attrs:{id:"_4-正确判断变量类型的姿势"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_4-正确判断变量类型的姿势","aria-hidden":"true"}},[t._v("#")]),t._v(" 4. 正确判断变量类型的姿势")]),t._v(" "),a("h3",{attrs:{id:"_4-1-一个万金油方法-object-prototype-tostring-call"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_4-1-一个万金油方法-object-prototype-tostring-call","aria-hidden":"true"}},[t._v("#")]),t._v(" 4.1 一个万金油方法 Object.prototype.toString.call()")]),t._v(" "),a("blockquote",[a("p",[a("a",{attrs:{href:"https://link.juejin.im/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FJavaScript%2FReference%2FGlobal_Objects%2FObject%2FtoString",target:"_blank",rel:"noopener noreferrer"}},[t._v("MDN reference"),a("OutboundLink")],1)])]),t._v(" "),a("p",[a("code",[t._v("Object.prototype.toString.call(variable)")]),t._v(" 用这个方法来判断变量类型目前是最可靠的了，它总能返回正确的值。")]),t._v(" "),a("p",[t._v("该方法返回 "),a("code",[t._v('"[object type]"')]),t._v(", 其中type是对象类型。")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Object")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("prototype"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("toString")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("call")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("null")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v('//  "[object Null]"')]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Object")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("prototype"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("toString")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("call")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v('//  "[object Array]"')]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Object")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("prototype"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("toString")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("call")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v('//  "[object Object]"')]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Object")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("prototype"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("toString")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("call")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("123")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v('//  "[object Number]"')]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Object")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("prototype"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("toString")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("call")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'123'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v('//  "[object String]"')]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Object")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("prototype"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("toString")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("call")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("false")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v('//  "[object Boolean]"')]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Object")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("prototype"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("toString")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("call")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("undefined")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v('//  "[object Undefined]"')]),t._v("\n")])])]),a("h3",{attrs:{id:"_4-2-string-boolean-number-undefined-四种基本类型的判断"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_4-2-string-boolean-number-undefined-四种基本类型的判断","aria-hidden":"true"}},[t._v("#")]),t._v(" 4.2 String Boolean Number Undefined 四种基本类型的判断")]),t._v(" "),a("p",[t._v("除了 "),a("code",[t._v("Null")]),t._v(" 之外的这四种基本类型值，都可以用 "),a("code",[t._v("typeof")]),t._v(" 操作符很好的进行判断处理。")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("typeof")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'abc'")]),t._v("  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v('// "string"')]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("typeof")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("false")]),t._v("  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v('// "boolean"')]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("typeof")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("123")]),t._v("  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v('// "number"')]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("typeof")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("undefined")]),t._v("  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v('// "undefined"')]),t._v("\n")])])]),a("h3",{attrs:{id:"_4-3-null-类型的判断"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_4-3-null-类型的判断","aria-hidden":"true"}},[t._v("#")]),t._v(" 4.3 Null 类型的判断")]),t._v(" "),a("p",[t._v("除了 "),a("code",[t._v("Object.prototype.toString.call(null)")]),t._v(" 之外，目前最好的方法就是用 "),a("code",[t._v("variable === null")]),t._v(" 全等来判断了。")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" a "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("null")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("a "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("===")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("null")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    console"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'a is null'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//  a is null")]),t._v("\n")])])]),a("h3",{attrs:{id:"_4-4-检测变量是否是一个-array-数组"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_4-4-检测变量是否是一个-array-数组","aria-hidden":"true"}},[t._v("#")]),t._v(" 4.4 检测变量是否是一个 Array 数组")]),t._v(" "),a("p",[a("code",[t._v("typeof []")]),t._v(" 会返回 "),a("code",[t._v("object")]),t._v(" 因此明显是不能够用 typeof 操作符进行数组类型判断的。目前常用的方法有以下几种")]),t._v(" "),a("h4",{attrs:{id:"_4-1-1-object-prototype-tostring-call"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_4-1-1-object-prototype-tostring-call","aria-hidden":"true"}},[t._v("#")]),t._v(" 4.1.1. Object.prototype.toString.call()")]),t._v(" "),a("p",[t._v("万金油方法是一种。")]),t._v(" "),a("h4",{attrs:{id:"_4-1-2-ecmascript5-新增-array-isarray"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_4-1-2-ecmascript5-新增-array-isarray","aria-hidden":"true"}},[t._v("#")]),t._v(" 4.1.2. ECMAscript5 新增 Array.isArray()")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[t._v("Array"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("isArray")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("   "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// true")]),t._v("\n")])])]),a("h4",{attrs:{id:"_4-1-3-instanceof-运算符"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_4-1-3-instanceof-运算符","aria-hidden":"true"}},[t._v("#")]),t._v(" 4.1.3. instanceof 运算符")]),t._v(" "),a("blockquote",[a("p",[a("a",{attrs:{href:"https://link.juejin.im/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FJavaScript%2FReference%2FOperators%2Finstanceof",target:"_blank",rel:"noopener noreferrer"}},[t._v("MDN reference"),a("OutboundLink")],1)])]),t._v(" "),a("p",[t._v("instanceof 运算符用来测试一个对象在其原型链中是否存在一个构造函数的 prototype 属性。")]),t._v(" "),a("p",[t._v("因此可以检测一个对象的原型链中是否存在 Array 构造函数的 prototype 属性来判断是不是数组。")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("instanceof")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Array")]),t._v("   "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// true")]),t._v("\n")])])]),a("h3",{attrs:{id:"_4-5-检测变量是否是一个-object-对象"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_4-5-检测变量是否是一个-object-对象","aria-hidden":"true"}},[t._v("#")]),t._v(" 4.5 检测变量是否是一个 Object 对象")]),t._v(" "),a("p",[t._v("typeof 和 instanceof 都不能安全的判断变量是否是 Object 对象。")]),t._v(" "),a("p",[t._v("目前判断变量是否是对象的最安全的方法就只有 "),a("code",[t._v("Object.prototype.toString.call()")]),t._v(" 了")])])},[],!1,null,null,null);s.default=e.exports}}]);