# Service Worker的生命周期及使用场景

![图片描述](<https://wsk-mweb.oss-cn-hangzhou.aliyuncs.com/ipic/2020-04-05-151513.jpg>)

你可能已经知道，[渐进式Web应用程序](https://developers.google.com/web/progressive-web-apps/) 只会越来越受欢迎，因为它们的目标是让Web应用程序用户体验更流畅，创建类似于原生应用程序的体验，而不是浏览器的外观和感觉。

构建渐进式Web应用程序的主要要求之一是使其在网络和加载方面非常可靠——它应该在不确定或不存在的网络条件下可用。

在这篇文章中，将深入探讨 **Service Workers**:它们是如何工作，你应该关心什么。最后，还列出了 Service Workers 中的一些独特优点在哪些场景下是值得我们使用的。

## 1. 简介

如果你还想了解更多 **Service Workers** 的知识，可以阅读作者关于 [Web Workers](https://segmentfault.com/a/1190000017578650) 的文章。

#### **1.1 Service Worker是什么**

[MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Service_Worker_API) 的介绍：

Service Worker 是一个浏览器背后运行的脚步，独立于 web 页面，为无需一个页面或用户交互的功能打开了大门。今日，它包含了推送通知和背景异步（push notifications and background sync）的功能。将来，Service Worker 将支持包括 periodic sync or geofencing 的功能。

基本上，Service Worker 是 Web Worker 的一个类型，更具体地说，它像 [Shared Worker](https://developer.mozilla.org/en-US/docs/Web/API/SharedWorker)：

- Service Worker 在其自己的全局上下文中运行
- 它没有绑定到特定的网页
- 它不能访问到 DOM

这是一个令人兴奋的 API 的原因是它允许你支持离线体验，让开发人员完全控制体验。

## 2. Service Worker 的生命周期

Service Worker 的生命周期与 web 页面完全分离。它包括以下几个阶段:

- 下载
- 安装
- 激活

### 2.1 下载

这是浏览器下载包含 Service Worker 的 `.js` 文件的时候。

### 2.2 安装

要为 web 应用程序安装 Service Worker，必须先注册它，这可以在 JavaScript 代码中完成。注册 Service Worker 后，它会提示浏览器在后台启动 Service Worker 安装步骤。

通过注册 Service Worker，你可以告诉浏览器你的 Service Worker 的 JavaScript 文件的位置。看看下面的代码:

![图片描述](<https://wsk-mweb.oss-cn-hangzhou.aliyuncs.com/ipic/2020-04-05-151518.png>)

上例代码首先检查当前环境中是否支持 Service Worker API。如果支持，则 `/sw.js` 这个 Service Worker 就被注册了。

每次页面加载时都可以调用 `register()` 方法，浏览器会判断 Service Worker 是否已经注册，根据注册情况会对应的给出正确处理。

`register()` 方法的一个重要细节是 Service Worker 文件的位置。在本例中，可以看到 Service Worker 文件位于域的根目录，这意味着 Service Worker 范围将是这个域下的。换句话说，这个 Service Worker 将为这个域中的所有内容接收 `fetch`事件。如果我们在 `/example/sw.js` 注册 Service Worker 文件，那么 Service Worker 只会看到以 `/example/` 开头的页面的 fetch 事件（例如 `/example/page1/`、`/example/page2/`）。

通常在安装步骤中，你需要缓存一些静态资源。 如果所有文件都缓存成功，则 Service Worker 将被安装。 如果任何文件无法下载和缓存，则安装步骤将失败，Service Worker 将不会激活（即不会被安装）。 如果发生这种情况，不要担心，下次再试一次。 但是，这意味着如果它安装，你知道你有这些静态资源在缓存中。

如果注册需要在加载事件之后发生，这就解答了你“注册是否需要在加载事件之后发生”的疑惑。这不是必要的，但绝对是推荐的。

为什么？让我们考虑用户第一次访问你的 Web 应用程序。目前还没有 Service Worker，而且浏览器无法预先知道最终是否会安装 Service Worker。如果安装了 Service Worker，浏览器将需要为这个额外的线程花费额外的 CPU 和内存，否则浏览器将把这些额外的 CPU 和内存用于呈现 Web 页面。

最重要的是，如果在页面上安装一个 Service Worker，就可能会有延迟加载和渲染的风险 —— 而不是尽快让你的用户可以使用该页面。

注意，这种情况对第一次的访问页面时才会有。后续的页面访问不会受到 Service Worker 安装的影响。一旦 Service Worker 在第一次访问页面时被激活，它就可以处理加载/缓存事件，以便后续访问 Web 应用程序。这一切都是有意义的，因为它需要准备好处理受限的的网络连接。

### 2.3 激活

安装 Service Worker 之后，下一步将是激活它，这是处理旧缓存管理的好机会。

在激活步骤之后，Service Worker 将控制所有属于其范围的页面，尽管第一次注册 Service Worker 的页面将不会被控制，直到再次加载。

Service Worker 一旦掌控，它将处于以下两种状态之一：

- 处理从网页发出网络请求或消息时发生的提取和消息事件
- Service Worker 将被终止以节省内存

Service Worker 生命周期如下：

![图片描述](<https://wsk-mweb.oss-cn-hangzhou.aliyuncs.com/ipic/2020-04-05-151522.png>)

## 3. Service Worker 安装的内部机制

在页面启动注册过程之后，看看 Service Worker 脚本中发生了什么，它通过向 Service Worker 实例添加事件监听来处理 `install` 事件：

以下是处理安装事件时需要采取的步骤:

- 开启一个缓存
- 缓存我们的文件
- 确认是否缓存了所有必需的资源

对于最基本的示例，你需要为安装事件定义回调并决定要缓存哪些文件。

```js
self.addEventListener('install', function(event) { // Perform install steps });
```

下面是 Service Worker 简单的一个内部安装过程:

![图片描述](<https://wsk-mweb.oss-cn-hangzhou.aliyuncs.com/ipic/2020-04-05-151527.png>)

从上例代码可以得到：

调用了`caches.open()` 和我们想要的缓存名称, 之后调用 `cache.addAll()` 并传入文件数组。 这是一个promise 链（ caches.open() 和 cache.addAll() ）。 `event.waitUntil()` 方法接受一个承诺，并使用它来知道安装需要多长时间，以及它是否成功。

如果成功缓存了所有文件，那么将安装 Service Worker。如果其中的一个文件下载失败，那么安装步骤将失败。这意味着需要小心在安装步骤中决定要缓存的文件列表，定义一长串文件将增加一个文件可能无法缓存的机会，导致你的 Service Worker 没有得到安装。

处理 `install` 事件完全是可选的，你可以避免它，在这种情况下，你不需要执行这里的任何步骤。

## 4. 运行时缓存请求

安装了 Service Worker 后，用户导航到另一个页面或刷新所在的页面，Service Worker 将收到 `fetch` 事件。下面是一个例子，演示如何返回缓存的资源或执行一个新的请求，然后缓存结果:

![图片描述](<https://wsk-mweb.oss-cn-hangzhou.aliyuncs.com/ipic/2020-04-05-151531.png>)

上述流程：

- 在这里我们定义了 `fetch` 事件，在 `event.respondWith()` 中，我们传递了一个来自 `caches.match()` 的 **promise**。 此方法查看请求，并查找来自 Service Worker 创建的任何缓存的任何缓存结果。
- 如果在缓存中，响应内容就被恢复了。
- 否则，将会执行 fetch。
- 检查状态码是不是 200，同时检查响应类型是 basic，表明响应来自我们最初的请求。在这种情况下，不会缓存对第三方资源的请求。
- 响应被缓存下来

如果通过检查，克隆响应。这是因为响应是 Stream，所以只能消耗一次。既然要返回浏览器使用的响应，并将其传递给缓存使用，就需要克隆它，以便可以一个发送到浏览器，一个发送到缓存。

## 5. 更新 Service Worker

当用户访问你的 Web 应用程序时，浏览器试图重新下载包含 Service Worker 代码的 `.js` 文件，这是在后台完成的。

如果现在下载的 Service Worker 的文件与当前 Service Worker 的文件相比如果有一个字节及以上的差异，浏览器将假设 Service Worker 文件已改过，浏览器就会启动新的 Service Worker。

新的 Service Worker 将启动并且安装事件将被移除。然而，在这一点上，旧的 Service Worker 仍在控制你的 web 应用的页面，这意味着新的 Service Worker 将进入 `waiting` 状态。

一旦你的 Web 应用程序当前打开的页面被关闭，旧的 Service Worker 将被浏览器杀死，新 Service Worker 接管了控制权，它的激活事件将被激发

为什么需要这些？为了避免 Web 应用程序的两个版本同时在不同的 tab 上运行的问题——这在 Web 上是非常常见的，并且可能会产生非常严重的bug(例如，在浏览器中本地存储数据时使用不同的模式)。

## 6. 从缓存中删除数据

在激活回调中发生的一个常见任务是缓存管理。你要在激活回调中这样做的原因是，如果你要在安装步骤中清除所有旧的缓存，任何保留所有当前页面的旧 Service Worker 将会突然停止服务来自该缓存的文件。

这里提供了一个如何从缓存中删除一些不在白名单中的文件的例子（在本例中，有 page-1、page-2 两个实体）：

![图片描述](<https://wsk-mweb.oss-cn-hangzhou.aliyuncs.com/ipic/2020-04-05-151535.png>)

## 7. 要求 HTTPS 的原因

在构建 Web 应用程序时，通过 localhost 使用 Service Workers，但是一旦将其部署到生产环境中，就需要准备好 HTTPS( 这是使用HTTPS 的最后一个原因)。

使用 Service Worker，可以很容易被劫持连接并伪造响应。如果不使用 HTTPs，人的web应用程序就容易受到黑客的攻击。

为了更安全，你需要在通过 HTTPS 提供的页面上注册 Service Worker，以便知道浏览器接收的 Service Worker 在通过网络传输时未被修改。

## 8. 浏览器支持

浏览器对 Service Worker 的支持正在变得越来越好：

![图片描述](<https://wsk-mweb.oss-cn-hangzhou.aliyuncs.com/ipic/2020-04-05-151540.png>)

## 9. Service Workers 特性将越来越完善及强大

Service Workers 提供的一些独特特性包括:

- **推送通知** — 允许用户选择从网络应用程序及时更新。
- **后台同步** — 允许延迟操作，直到用户具有稳定的连接。通过这种方式，可以确保用户想发送的任何内容实都可以发送。
- **定期同步(后续开放)** — 提供管理定期后台同步功能的 API。
- **Geofencing (后续开放)** — 可以定义参数，也称为围绕感兴趣领域的 geofences。当设备通过geofence 时，Web 应用程序会收到一个通知，该通知允许根据用户的地理位置提供更好的体验。

**原文：**

[https://blog.sessionstack.com...](https://blog.sessionstack.com/how-javascript-works-service-workers-their-life-cycle-and-use-cases-52b19ad98b58)