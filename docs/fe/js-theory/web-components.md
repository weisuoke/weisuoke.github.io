# Web Components

> - [Awesome Web Components](<https://github.com/mateusortiz/webcomponents-the-right-way#readme>)



库/框架：

- XTag
- Ploymer
- Omi



## 1. 什么是Web Components

> [Web Components](<https://developer.mozilla.org/zh-CN/docs/Web/Web_Components>)

Web Components是一套不同的技术，允许您创建可重用的定制元素（它们的功能封装在您的代码之外）并且在您的web应用中使用它们。

类似Vue, React的组件，但是这个是符合浏览器标准的自定义标签。而Vue,React的自定义标签是需要编译成html5标签的。Web Components是未来发展的一个趋势。

Web Components由下面四个技术组成：

1. **Custom elements（自定义元素）**
2. **Shadow DOM（影子DOM）**
3. **HTML templates（HTML模板）**
4. **HTML Imports（HTML导入）**



**流程**：

实现web component的基本方法通常如下所示：

1. 使用ECMAScript 2015类语法创建一个类，来指定web组件的功能(参阅[类](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Classes)获取更多信息)。
2. 使用[`CustomElementRegistry.define()`](https://developer.mozilla.org/zh-CN/docs/Web/API/CustomElementRegistry/define)方法注册您的新自定义元素 ，并向其传递要定义的元素名称、指定元素功能的类以及可选的，其所继承自的元素。
3. 如果需要的话，使用[`Element.attachShadow()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/attachShadow)方法将一个shadow DOM附加到自定义元素上。使用通常的DOM方法向shadow DOM中添加子元素、事件监听器等等。
4. 如果需要的话，使用[` 和 [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/slot)方法定义一个HTML模板。再次使用常规DOM方法克隆模板并将其附加到您的shadow DOM中。
5. 在页面任何您喜欢的位置使用自定义元素，就像使用常规HTML元素那样。



### 1.1 Custom elements（自定义元素）

一组JavaScript API，允许您定义custom elements及其行为，然后可以在您的用户界面中按照需要使用它们。

### 1.2 **Shadow DOM（影子DOM）**

一组JavaScript API，用于将封装的“影子”DOM树附加到元素（与主文档DOM分开呈现）并控制其关联的功能。通过这种方式，您可以保持元素的功能私有，这样它们就可以被脚本化和样式化，而不用担心与文档的其他部分发生冲突。

### 1.3 **HTML templates（HTML模板）：**

`<template>`和 [`<slot>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/slot) 元素使您可以编写不在呈现页面中显示的标记模板。然后它们可以作为自定义元素结构的基础被多次重用。



## 2. 教程

- [Using custom elements](https://developer.mozilla.org/zh-CN/docs/Web/Web_Components/Using_custom_elements)

  介绍如何使用自定义元素的功能来创建简单的web components，以及生命周期回调和其他更高级的功能。

- [Using shadow DOM](https://developer.mozilla.org/zh-CN/docs/Web/Web_Components/Using_shadow_DOM)

  介绍shadow DOM的基础知识，展示如何向元素中附加shadow DOM，添加到shadow DOM树，添加样式等等。

- [Using templates and slots](https://developer.mozilla.org/zh-CN/docs/Web/Web_Components/Using_templates_and_slots)

  介绍如何使用[` 和 [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/slot) 元素定义可重用的HTML结构，然后在Web components中使用该结构。