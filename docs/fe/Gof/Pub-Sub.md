# 发布订阅模式(Pub-Sub)

## 概念

观察者模式又叫发布订阅模式（Publish/Subscribe），它定义了一种一对多的关系，让多个观察者对象同时监听某一个主题对象，这个主题对象的状态发生变化时就会通知所有的观察者对象，使得它们能够自动更新自己。

使用观察者模式的好处：

1. 支持简单的广播通信，自动通知所有已经订阅过的对象。
2. 页面载入后目标对象很容易与观察者存在一种动态关联，增加了灵活性。
3. 目标对象与观察者之间的抽象耦合关系能够单独扩展以及重用

> 发布订阅模式属于广义上的观察者模式

发布订阅模式是最常用的一种观察者模式的实现，并且从解耦和重用角度来看，更优于典型的观察者模式

<span style="color:red; font-weight: bold;">发布订阅模式多了个事件通道</span>

![](https://user-images.githubusercontent.com/18718461/53536375-228ba180-3b41-11e9-9737-d71f85040cfc.png)

在观察者模式中，观察者需要直接订阅目标事件；在目标发出内容改变的事件后，直接接收事件并作出响应

在发布订阅模式中，发布者和订阅者之间多了一个发布通道；一方面从发布者接收事件，另一方面向订阅者发布事件；订阅者需要从事件通道订阅事件

## 代码实现

> 需求：数据打包下载功能

### 用观察者模式实现

定义一个DownloadTask类作为观察者

```js
function DownloadTask(id) {
  this.id = id;
  this.loaded = false;
  this.url = null;
}

DownloadTask.prototype.finish = function(url) {
  this.loaded = true;
  this.url = url;
  console.log('Task ' + this.id + ' load data from ' + url);
}
```

再定义一个 DownloadTaskList类方便管理多个下载任务

```js
function DownloadTaskList() {
  this.downloadTaskList = [];
}

DownloadTaskList.prototype.getCount = function() {
  return this.downloadTaskList.length;
}

DownloadTaskList.prototype.get = function(index) {
  return this.downloadTaskList[index];
}

DownloadTaskList.prototype.add = function(obj) {
  return this.downloadTaskList.push(obj);
}

DownloadTaskList.prototype.remove = function(obj) {
  const downloadTaskCount = this.downloadTasks.getCount();
  while (i < downloadTaskCount) {
    if (this.downloadTaskList[i] === obj) {
      this.downloadTaskList.splice(i, 1);
      break;
    } 
    i++;
  }
};
```

定义一个DataHub作为被观察目标

```js
function DataHub() {
  this.downloadTasks = new DownloadTaskList();
}

DataHub.prototype.addDownloadTask = function(downloadTask) {
  this.downloadTasks.add(downloadTask);
};

DataHub.prototype.removeDownloadTask = function(downloadTask) {
  this.downloadTasks.remove(downloadTask);
};

DataHub.prototype.notify = function(url) {
  const downloadTaskCount = this.downloadTasks.getCount();
  for (var i = 0; i < downloadTaskCount; i++) {
    this.downloadTasks.get(i).finish(url);
  }
};
```

创建一个数据中心

```js
var dataHub = new DataHub();
```

现在用户来取数据了，创建两个任务

```js
var downloadTask1 = new DownloadTask(1);
var downloadTask2 = new DownloadTask(2);

dataHub.addDownloadTask(downloadTask1);
dataHub.addDownloadTask(downloadTask2);
```

数据打包完成了

```js
dataHub.notify('http://somedomain.someaddress')
```

### 用发布订阅模式实现

定义 DataHub 类作为发布者

```js
function DataHub() {}

DataHub.prototype.notify = function(url, callback) {
  callback(url);
}
```

定义 DownloadManager 类作为事件通道

```js
function DownloadManager() {
  this.events = {};
  this.uId = -1;
}

DownloadManager.prototype.publish = function(eventType, url) {
  if (!this.events[eventType]) {
    return false;
  }
  
  var subscribers = this.events[eventType],
      	count = subscribers ? subscribers.length : 0;
  
  while (count--) {
    var subscriber = subscribers[count];
    subscriber.handler(eventType, subscriber.taskId, url);
  }
}

DownloadManager.prototype.subscribe = function(eventType, handler) {
  if (!this.events[eventType]) {
    this.events[eventType] = [];
  }
  
  var taskId = (++this.uId).toString();
  this.events[eventType].push({
    taskId: taskId,
    handler: handler
  })
  
  return taskId
}
```

创建一个数据中心

```js
var dataHub = new DataHub();
```

创建一个下载事件管理器

```js
var downloadManager = new DownloadManager();
```

创建一个下载器

```js
var dataLoader = function(eventType, taskId, url) {
  console.log('Task ' + taskId + ' load data from ' + url);
}
```

用户来请求数据了

```js
var downloadTask1 = downloadManager.subscribe('dataReady', dataLoader);
```

数据打包完成了

```js
dataHub.notify('http://somedomain.someaddress', function(url){
  downloadManager.publish('dataReady', url);
});
```

> 总结起来就是，一个是紧密耦合，一个是松散耦合。优缺点也很明显，紧密耦合的方式简单直接，扩展性差，而且要求两端同时存在。松散耦合不直接产生依赖，更容易扩展，懒加载的时候会有优势，但稍显复杂。

> 很多人把观察者模式和订阅模式混淆一谈，其实订阅模式有一个调度中心，对订阅事件进行统一管理。而观察者模式可以随意注册事件，调用事件，虽然实现原理都雷同，设计模式上有一定的差别，实际代码运用中差别在于：订阅模式中，可以抽离出调度中心单独成一个文件，可以对一系列的订阅事件进行统一管理。这样和观察者模式中的事件漫天飞就有千差万别了，在开发大型项目的时候，订阅/发布模式会让业务更清晰！

### 发布订阅模式和观察者模式的区别

1. 在**观察者**模式中，观察者是知道Subject的，Subject一直保持对观察者进行记录。然而，在**发布订阅**模式中，发布者和订阅者**不知道对方的存在**。它们只有通过消息代理进行通信。
2. 在**发布订阅**模式中，组件是松散耦合的，正好和观察者模式相反。
3. **观察者模式**大多数时候是**同步**的，比如当事件触发，Subject就会去调用观察者的方法。而**发布-订阅**模式大多数时候是**异步的**（使用消息队列）。
4. **观察者** 模式需要在单个应用程序地址空间中实现，而**发布-订阅**更像交叉应用模式。



## 参考阅读

- [观察者模式 vs 发布-订阅模式](<https://juejin.im/post/5a14e9edf265da4312808d86>)