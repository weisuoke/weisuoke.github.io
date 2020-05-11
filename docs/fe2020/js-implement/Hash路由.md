# 实现一个 Hash 路由

实现原理就是监听 url 的哈希值变化了

```html
<!DOCTYPE html>
<html>
  <head>
    <title>hash 路由</title>
  </head>
  <body>
    <header>
      <a href="#home">首页</a>
      <a href="#center">个人中心页</a>
      <a href="#help">帮助页</a>
    </header>
    <section id="content"></section>
    <script>
      window.addEventListener("hashchange", e => {
        let content = document.getElementById("content");
        content.innerText = location.hash;
      });
    </script>
  </body>
</html>
```
