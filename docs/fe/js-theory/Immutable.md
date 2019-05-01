# Immutable.js的原理

[原文](<https://juejin.im/post/5b9b30a35188255c6418e67c>)

## 1. 简单的例子

在深入研究前，我们先看个简单的例子：

```js
let map1 = Immutable.Map({});

for (let i = 0; i < 800; i++) {
  map1 = map1.set(Math.random(), Math.random());
}

console.log(map1);复制代码
```

这段代码先后往map里写入了800对随机生成的key和value。我们先看一下控制台的输出结果，对它的数据结构有个大致的认知（粗略扫一眼就行了）：

![img](https://user-gold-cdn.xitu.io/2018/9/14/165d635e732bfa1d)
可以看到这是一个树的结构，子节点以数组的形式放在`nodes`属性里，`nodes`的最大长度似乎是 32 个。了解过 bitmap 的人可能已经猜到了这里`bitmap`属性是做什么的，它涉及到对树宽度的压缩，这些后面会说。

其中一个节点层层展开后长这样：

![img](https://user-gold-cdn.xitu.io/2018/9/14/165d635e67a54c23)



这个`ValueNode`存的就是一组值了，`entry[0]`是key，`entry[1]`是value。目前大致看个形状就行了，下面我们会由浅入深逐步揭开它的面纱。（第二篇文章里会对图中所有属性进行解释）



## 2. 基本原理

我们先看下维基对于`持久化数据结构`的定义：

> In computing, a persistent data structure is a data structure that always preserves the previous version of itself when it is modified.

通俗点解释就是，对于一个`持久化数据结构`，每次修改后我们都会得到一个新的版本，且旧版本可以完好保留。

Immutable.js 用树实现了`持久化数据结构`，先看下图这颗树：
![img](https://user-gold-cdn.xitu.io/2018/9/14/165d635e67c6de9f)
假如我们要在`g`下面插入一个节点`h`，如何在插入后让原有的树保持不变？最简单的方法当然是重新生成一颗树：
![img](https://user-gold-cdn.xitu.io/2018/9/14/165d635e5d7eedd0)
但这样做显然是很低效的，每次操作都需要生成一颗全新的树，既费时又费空间，因而有了如下的优化方案：
![img](https://user-gold-cdn.xitu.io/2018/9/14/165d635e63391b4c)
我们新生成一个根节点，对于有修改的部分，把相应路径上的所有节点重新生成，对于本次操作没有修改的部分，我们可以直接把相应的旧的节点拷贝过去，这其实就是`结构共享`。这样每次操作同样会获得一个全新的版本（根节点变了，新的`a`!==旧的`a`），历史版本可以完好保留，同时也节约了空间和时间。

至此我们发现，用树实现`持久化数据结构`还是比较简单的，Immutable.js提供了多种数据结构，比如回到开头的例子，一个map如何成为`持久化数据结构`呢？

## 3. Vector Trie

实际上对于一个map，我们完全可以把它视为一颗扁平的树，与上文实现`持久化数据结构`的方式一样，每次操作后生成一个新的对象，把旧的值全都依次拷贝过去，对需要修改或添加的属性，则重新生成。这其实就是`Object.assign`，然而这样显然效率很低，有没有更好的方法呢？



在实现`持久化数据结构`时，Immutable.js 参考了`Vector Trie`这种数据结构（其实更准确的叫法是`persistent bit-partitioned vector trie`或`bitmapped vector trie`，这是Clojure里使用的一种数据结构，Immutable.js 里的相关实现与其很相似），我们先了解下它的基本结构。



假如我们有一个 map ，key 全都是数字（当然你也可以把它理解为数组）`{0: ‘banana’, 1: ‘grape’, 2: ‘lemon’, 3: ‘orange’, 4: ‘apple’}`，为了构造一棵二叉`Vector Trie`，我们可以先把所有的key转换为二进制的形式：`{‘000’: ‘banana’, ‘001’: ‘grape’, ‘010’: ‘lemon’, ‘011’: ‘orange’, ‘100’: ‘apple’}`，然后如下图构建`Vector Trie`：
![img](https://user-gold-cdn.xitu.io/2018/9/14/165d635e6d01c49d)



可以看到，`Vector Trie`的每个节点是一个数组，数组里有`0`和`1`两个数，表示一个二进制数，所有值都存在叶子节点上，比如我们要找`001`的值时，只需顺着`0` `0` `1`找下来，即可得到`grape`。那么想实现`持久化数据结构`当然也不难了，比如我们想添加一个`5: ‘watermelon’`：
![img](https://user-gold-cdn.xitu.io/2018/9/14/165d635ebb85e04d)
可见对于一个 key 全是数字的map，我们完全可以通过一颗`Vector Trie`来实现它，同时实现`持久化数据结构`。如果key不是数字怎么办呢？用一套映射机制把它转成数字就行了。 Immutable.js 实现了一个[hash](https://link.juejin.im?target=https%3A%2F%2Fgithub.com%2Ffacebook%2Fimmutable-js%2Fblob%2Fe65e5af806ea23a32ccf8f56c6fabf39605bac80%2Fsrc%2FHash.js%23L10%3A17)函数，可以把一个值转换成相应数字。

这里为了简化，每个节点数组长度仅为2，这样在数据量大的时候，树会变得很深，查询会很耗时，所以可以扩大数组的长度，Immutable.js 选择了32。为什么不是31？40？其实数组长度必须是2的整数次幂，这里涉及到实现`Vector Trie`时的一个优化，接下来我们先研究下这点。

下面的部分内容对于不熟悉进制转换和位运算的人来说可能会相对复杂一些，不过只要认真思考还是能搞通的。



## 4. 数字分区（Digit partitioning）

`数字分区`指我们把一个 key 作为数字对应到一棵前缀树上，正如上节所讲的那样。

假如我们有一个 key `9128`，以 7 为基数，即数组长度是 7，它在`Vector Trie`里是这么表示的：

![img](https://user-gold-cdn.xitu.io/2018/9/14/165d635eca568dee)

需要5层数组，我们先找到`3`这个分支，再找到`5`，之后依次到`0`。为了依次得到这几个数字，我们可以预先把

`9128`转为7进制的`35420`，但其实没有这个必要，因为转为 7 进制形式的过程就是不断进行除法并取余得到每一位上的数，我们无须预先转换好，类似的操作可以在每一层上依次执行。



运用进制转换相关的知识，我们可以采用这个方法`key / radixlevel - 1 % radix`得到每一位的数（**为了简便，本文除代码外所有/符号皆表示除法且向下取整**），其中`radix`是每层数组的长度，即转换成几进制，`level`是当前在第几层，即第几位数。比如这里`key`是`9128`，`radix`是`7`，一开始`level`是`5`，通过这个式子我们可以得到第一层的数`3`。

代码实现如下：



```js
const RADIX = 7;

function find(key) {
  let node = root; // root是根节点，在别的地方定义了

  // depth是当前树的深度。这种计算方式跟上面列出的式子是等价的，但可以避免多次指数计算。这个size就是上面的radix^level - 1
  for (let size = Math.pow(RADIX, (depth - 1)); size > 1; size /= RADIX) {
    node = node[Math.floor(key / size) % RADIX];
  }

  return node[key % RADIX];
}
```



## 5. 位分区（Bit Partitioning）

显然，以上`数字分区`的方法是有点耗时的，在每一层我们都要进行两次除法一次取模，显然这样并不高效，`位分区`就是对其的一种优化。

`位分区`是建立在`数字分区`的基础上的，所有以2的整数次幂（2，4，8，16，32…）为基数的`数字分区`前缀树，都可以转为`位分区`。基于一些位运算相关的知识，我们就能避免一些耗时的计算。

`数字分区`把 key 拆分成一个个数字，而`位分区`把 key 分成一组组 bit。以一个 32 路的前缀树为例，`数字分区`的方法是把 key 以 32 为基数拆分（实际上就是 32 进制），而`位分区`是把它以 5 个 bits 拆分，因为32 = 25，那我们就可以把 32 进制数的每一位看做 5 个二进制位 。实际上就是把 32 进制数当成 2 进制进行操作，这样原本的很多计算就可以用更高效的位运算的方式代替。因为现在基数是 32，即`radix`为 32，所以前面的式子现在是`key / 32level - 1 % 32`，而既然`32 =``25`，那么该式子可以写成这样`key / 25 × (level - 1) % 25`。根据位运算相关的知识我们知道`a / 2n === a >>> n `、`a % 2n === a & (2n - 1) `。这样我们就能通过位运算得出该式子的值。

**如果你对位运算不太熟悉的话，大可不看上面的式子，举个例子就好理解了**：比如数字`666666`的二进制形式是`10100 **01011** 00001 01010`，这是一个20位的二进制数。如果我们要得到第二层那五位数`01011`，我们可以先把它右移`>>>`(左侧补0)10位，得到`00000 00000 10100 **01011**`，再`&`一下`00000 00000 00000 11111`，就得到了`**01011**`。
这样我们可以得到下面的代码：



```js
const BITS = 5;
const WIDTH = 1 << BITS, // 25 = 32
const MASK = WIDTH - 1; // 31，即11111

function find(key) {
  let node = root; 

  for (let bits = (depth - 1) * BITS; bits > 0; bits -= BITS) {
    node = node[(key >>> bits) & MASK];
  }

  return node[key & MASK];
}复制代码
```



这样我们每次查找的速度就会得到提升。可以看一张图进行理解，为了简化展示，假设我们用了一个4路前缀树，4 = 22，所以用两位二进制数分区。对于`626`，查找过程如下：
![img](https://user-gold-cdn.xitu.io/2018/9/14/165d635eed8fa23f)
`626`的二进制形式是`10 01 11 00 10`，所以通过上面的位运算方法，我们便可以高效地依次得到`10`、`01`…



## 6. 源码

说了这么多，我们看一下 Immutable.js 的源码吧。我们主要看一下查找的部分就够了，这是`Vector Trie`的核心。

```js
get(shift, keyHash, key, notSetValue) {
  if (keyHash === undefined) {
    keyHash = hash(key);
  }
  const idx = (shift === 0 ? keyHash : keyHash >>> shift) & MASK;
  const node = this.nodes[idx];
  return node
    ? node.get(shift + SHIFT, keyHash, key, notSetValue)
    : notSetValue;
}
```

可以看到， Immutable.js 也正是采用了位分区的方式，通过位运算得到当前数组的 index 选择相应分支。（到这里我也不由赞叹，短短10行代码包含了多少思想呀）

不过它的实现方式与上文所讲的有一点不同，上文中对于一个 key ，我们是“正序”存储的，比如上图那个`626`的例子，我们是从根节点往下依次按照`10 01 11 00 10`去存储，而 Immutable.js 里则是“倒序”，按照`10 00 11 01 10`存储。所以通过源码这段你会发现 Immutable.js 查找时先得到的是 key 末尾的 SHIFT 个 bit ，然后再得到它们之前的 SHIFT 个 bit ，依次往前下去，而前面我们的代码是先得到 key 开头的 SHIFT 个 bit，依次往后。

用这种方式的原因之一是key的大小（二进制长度）不固定。

## 7. 时间复杂度

因为采用了`结构共享`，在添加、修改、删除操作后，我们避免了将 map 中所有值拷贝一遍，所以特别是在数据量较大时，这些操作相比`Object.assign`有明显提升。

然而，查询速度似乎减慢了？我们知道 map 里根据 key 查找的速度是`O(1)`，这里由于变成了一棵树，查询的时间复杂度变成了`O(log N)`，因为是 32 叉树，所以准确说是`O(log32 N)`。

等等 32 叉树？这棵树可不是一般地宽啊，Javascript里对象可以拥有的key的最大数量一般不会超过`232`个（[ECMA-262第五版](https://link.juejin.im?target=http%3A%2F%2Fwww.ecma-international.org%2Fecma-262%2F5.1%2F%23sec-15.4.2.2)里定义了JS里由于数组的长度本身是一个 32 位数，所以数组长度不应大于 232 - 1 ，JS里对象的实现相对复杂，但大部分功能是建立在数组上的，所以在大部分场景下对象里 key 的数量不会超过 232 - 1。相关讨论见[这里](https://link.juejin.im?target=https%3A%2F%2Fstackoverflow.com%2Fquestions%2F30194088%2Fdo-javascript-variables-have-a-storage-limit)。而且假设我们有 232 个值、每个值是一个32bit的 Number ，只算这些值的话总大小也有17g了，前端一般是远不需要操作这个量级的数据的），这样就可以把查找的时间复杂度当做是“`O(log32 232)`”，差不多就是“`O(log 7)`”，所以我们可以认为在实际运用中，5bits (32路)的 Vector Trie 查询的时间复杂度是常数级的，32 叉树就是用了空间换时间。

空间…这个 32 叉树占用的空间也太大了吧？即便只有三层，我们也会有超过`32 × 32 × 32 = 32768`个节点。当然 Immutable.js 在具体实现时肯定不会傻乎乎的占用这么大空间，它对树的高度和宽度都做了“压缩”，此外，还对操作效率进行了其它一些优化。



## 8. HAMT

`HAMT`全称`hash array mapped trie`，其基本原理与上篇所说的`Vector Trie`非常相似，不过它会对树进行压缩，以节约一些空间。 Immutable.js 参考了`HAMT`对树进行了高度和节点内部的压缩。



## 9. 树高压缩

假设我们有一个 2 叉 `Vector Trie`，现在存了一个值，key为`110`（二进制形式）， 它会被存到`0` `1` `1`这条路径下，如下图：
![img](https://user-gold-cdn.xitu.io/2018/9/21/165fb2b790ba65a2)
显然，这图里展示的结构已经进行了最简单的优化，因为现在只存了一个值，所以把与`110`无关的节点去掉了。还能进行什么优化吗？我们发现，中间那两个节点也是可以去掉的，如下图：

![](<https://ygyooo.github.io/2018/09/19/%E6%B7%B1%E5%85%A5%E6%8E%A2%E7%A9%B6immutable.js%E7%9A%84%E5%AE%9E%E7%8E%B0%E6%9C%BA%E5%88%B6%EF%BC%88%E4%BA%8C%EF%BC%89/trie2.png>)

获取该值时，我们先从`0`找下来，发现这直接是一个根节点，那取它存储的值就行了。就是说在不产生混淆的情况下，我们可以用尽可能少的二进制位去标识这个 key 。这样我们就进行了高度上的压缩，既减少了空间，又减少了查找和修改的时间。
如果要添加一个值，它的 key 结尾也是`0`，该怎么做呢？很简单，如下图：
![img](<https://ygyooo.github.io/2018/09/19/%E6%B7%B1%E5%85%A5%E6%8E%A2%E7%A9%B6immutable.js%E7%9A%84%E5%AE%9E%E7%8E%B0%E6%9C%BA%E5%88%B6%EF%BC%88%E4%BA%8C%EF%BC%89/trie3.png>)
我们只要在需要的时候增加或减少节点即可。



## 10. 节点内部压缩-Bitmap

上一篇我们提到， Immutable.js 的 Trie 里，每个节点数组的长度是 32 ，然而在很多情况下，这 32 个位置大部分是用不到的，这么大的数组显然也占用了很大空间。使用`Bitmap`，我们就可以对数组进行压缩。
我们先拿长度为 8 的数组举例：

![](<https://ygyooo.github.io/2018/09/19/%E6%B7%B1%E5%85%A5%E6%8E%A2%E7%A9%B6immutable.js%E7%9A%84%E5%AE%9E%E7%8E%B0%E6%9C%BA%E5%88%B6%EF%BC%88%E4%BA%8C%EF%BC%89/bitmap1.png>)

我们实际上只是用了数组的下标对 key 进行索引，这样想数组第 5、6、7 位显然目前是毫无作用的，那 0、2、3 呢？我们有必要为了一个下标 4 去维持一个长度为5的数组吗？我们只需要指明“假想数组”中下标为 1 和为 4 的位置有数就可以了。这里就可以用到`bitmap`，如下：

![](<https://ygyooo.github.io/2018/09/19/%E6%B7%B1%E5%85%A5%E6%8E%A2%E7%A9%B6immutable.js%E7%9A%84%E5%AE%9E%E7%8E%B0%E6%9C%BA%E5%88%B6%EF%BC%88%E4%BA%8C%EF%BC%89/bitmap2.png>)



我们采用了一个数，以其二进制形式表达“假想的长度为8的数组”中的占位情况，1 表示数组里相应下标位置有值，0 则表示相应位置为空。比如这个二进制数第 4 位（从右往左，从 0 开始数）现在是 1 ，就表示数组下标为 4 的位置有值。这样原本的长度为 8 的数组就可以压缩到 2 。
注意这个数组中的元素还是按照“假想数组”中的顺序排列的，这样我们若要取“假想数组”中下标为 i 的元素时，首先是判断该位置有没有值，若有，下一步就是得到在它之前有几个元素，即在二进制数里第 i 位之前有多少位为 1 ，假设数量为 a ，那么该元素在当前压缩后的数组里下标就是 a 。
具体操作中，我们可以通过`bitmap & (1 << i - 1)`，得到一个二进制数，该二进制数中只有第 i 位之前有值的地方为 1 ，其余全为 0 ，下面我们只需统计该二进制数里 1 的数量即可得到下标。计算二进制数中 1 数量的过程被称作`popcount`，具体算法有很多，我了解不多就不展开了，前面点击后是维基的地址，感兴趣的可以研究下。
下面我们看一下这部分的源码：



```js
get(shift, keyHash, key, notSetValue) {
  if (keyHash === undefined) {
    keyHash = hash(key);
  }
  const bit = 1 << ((shift === 0 ? keyHash : keyHash >>> shift) & MASK);
  const bitmap = this.bitmap;
  return (bitmap & bit) === 0
    ? notSetValue
    : this.nodes[popCount(bitmap & (bit - 1))].get(
        shift + SHIFT,
        keyHash,
        key,
        notSetValue
      );
}
```



可见它与我们上一篇看到的源码并没有太大不同（Immutable.js 里如果一个数组占用不超过一半（ 16 个），就会对其进行压缩，上一篇的源码就是没有压缩下的情况），就是多了一个用 bitmap 计算数组下标的过程，方式也跟上文所讲的一样，对于这个`popCount`方法，我把源码也贴出来：

```js
function popCount(x) {
  x -= (x >> 1) & 0x55555555;
  x = (x & 0x33333333) + ((x >> 2) & 0x33333333);
  x = (x + (x >> 4)) & 0x0f0f0f0f;
  x += x >> 8;
  x += x >> 16;
  return x & 0x7f;
}
```



## 11. 为什么是32

上一篇我们提到了 Immutable.js 的 Vector Trie 采用了 32 作为数组的长度，也解释了由于采用了`位分区`，该数字只能是2的整数次幂，所以不能是 31、33 等。但8、16、64等等呢？这是通过实际测试得出的，见下图：

![](<https://ygyooo.github.io/2018/09/19/%E6%B7%B1%E5%85%A5%E6%8E%A2%E7%A9%B6immutable.js%E7%9A%84%E5%AE%9E%E7%8E%B0%E6%9C%BA%E5%88%B6%EF%BC%88%E4%BA%8C%EF%BC%89/time.png>)

图中分别是查找和更新的时间，看上去似乎 8 或 16 更好？考虑到平时的使用中，查找比更新频次高很多，所以 Immutable.js 选择了 32。



## 12. 回顾

现在，我们就能理解第一篇文章开头的截图了：

![](<https://ygyooo.github.io/2018/09/19/%E6%B7%B1%E5%85%A5%E6%8E%A2%E7%A9%B6immutable.js%E7%9A%84%E5%AE%9E%E7%8E%B0%E6%9C%BA%E5%88%B6%EF%BC%88%E4%BA%8C%EF%BC%89/console%E6%88%AA%E5%9B%BE.png>)



![](<https://ygyooo.github.io/2018/09/19/%E6%B7%B1%E5%85%A5%E6%8E%A2%E7%A9%B6immutable.js%E7%9A%84%E5%AE%9E%E7%8E%B0%E6%9C%BA%E5%88%B6%EF%BC%88%E4%BA%8C%EF%BC%89/console%E6%88%AA%E5%9B%BE2.png>)



我们可以看到， map 里主要有三种类型的节点：

- `HashArrayMapNode`，拥有的子节点数量 ＞16 ，拥有的数组长度为 32
- `BitmapIndexedNode`，拥有的子节点数量 ≤16 ，拥有的数组长度与子节点数量一致，经由 bitmap 压缩
- `ValueNode`，叶子节点，存储 key 和 value

此外，每个节点似乎都有个`ownerID`属性，这又是做什么的呢？它涉及到 Immutable.js 中的可变数据结构。



## 13. Transient

其实可以说 Immutable.js 中的数据结构有两种形态，“不可变”和“可变”。虽然“不可变”是 Immutable.js 的主要优势，但“可变”形态下的操作当然效率更高。有时对于某一系列操作，我们只需要得到这组操作结束后的状态，若中间的每一个操作都用不可变数据结构去实现显然有些多余。这种情景下，我们就可以使用`withMutations`方法对相应数据结构进行临时的“可变”操作，最后再返回一个不可变的结构，这就是`Transient`，比如这样：

```js
let map = new Immutable.Map({});
map = map.withMutations((m) => {
  // 开启Transient
  m.set('a', 1); // 我们可以直接在m上进行修改，不需要 m = m.set('a', 1)
  m.set('b', 2);
  m.set('c', 3);
});
// Transient结束复制代码
```



实际上， Immutable.js 里很多方法都使用了`withMutations`构造临时的可变数据结构来提高效率，比如 Map 中的

`map` `deleteAll`方法以及 Map 的构造函数。而在一个不可变数据结构中实现临时的可变数据结构的关键（有点拗口XD），就是这个`ownerID`。下图对比了使用与不使用`Transient`时的区别：

![img](https://user-gold-cdn.xitu.io/2018/9/21/165fb2b893298cde)

显然，使用`Transient`后由于无需每次生成新的节点，效率会提高空间占用会减少。在开启`Transient`时，根节点会被赋与一个新的`ownerID`，在`Transient`完成前的每一步操作只需遵循下面的逻辑即可：



1. 若要操作的节点的`ownerID`与父节点的不一致，则生成新的节点，把旧节点上的值拷贝过来，其`ownerID`更新为父节点的`ownerID`，然后进行相应操作；
2. 若要操作的节点的`ownerID`与父节点的一致，则直接在该节点上操作；

下面先我们看下 Immutable.js 中开启`Transient`的相关源码：



```js
function OwnerID() {}
```



```js
function asMutable() {
  return this.__ownerID ? this : this.__ensureOwner(new OwnerID());
}
```



```js
function withMutations(fn) {
  const mutable = this.asMutable();
  fn(mutable);
  return mutable.wasAltered() ? mutable.__ensureOwner(this.__ownerID) : this;
}
```



它给了根节点一个`ownerID`，这个`ownerID`会在接下来的操作中按照上面的逻辑使用。这段代码有个“骚操作”，就是用 JS 的对象地址去作为 ID ，因为每次 new 之后的对象的地址肯定与之前的对象不同，所以用这种方法可以很简便高效地构造一套 ID 体系。下面再看下开启后进行操作时的一段源码（ Map 中的`set`操作就会调用这个`update`方法）：

```js
update(ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
  // ...省略前面的代码
  const isEditable = ownerID && ownerID === this.ownerID;
  const newNodes = setAt(nodes, idx, newNode, isEditable);

  if (isEditable) {
    this.count = newCount;
    this.nodes = newNodes;
    return this;
  }

  return new HashArrayMapNode(ownerID, newCount, newNodes);
}
```

与前面讲的逻辑一样，先比较该节点`ownerID`与传进来父节点的是否一致，然后直接在节点上操作或生成新的节点。



### 14. hash冲突

这块的内容就没什么新东西了，任何语言或库里对于 hashMap 的实现都需考虑到 hash 冲突的问题。我们主要看一下 Immutable.js 是怎么处理的。

要上一篇我们知道了，在往 Map 里存一对 key、value 时， Immutable.js 会先对 key 进行 hash ，根据 hash 后的值存到树的相应位置里。不同的 key 被 hash 后的结果是可能相同的，即便概率应当很小。
hash 冲突是一个很基本的问题，解决方法有很多，这里最简单适用的方法就是把冲突的节点扩展成一个线性结构，即数组，数组里直接存一组组 key 和 value ，查找到此处时则遍历该数组找到匹配的 key 。虽然这里的时间复杂度会变成线性的，但考虑到发生 hash 冲突的概率很低，所以时间复杂度的增加可以忽略不计。
我发现 Immutable.js 的 hash 函数对`abc`和`bCc`的 hash 结果都是 `96354`，在同一个 map 里用这两个 key 就会造成 hash 冲突，我们把这个 map log 出来如下：

![img](https://user-gold-cdn.xitu.io/2018/9/21/165fb2b89300d69c)



Immutable.js 用了一个叫做`HashCollisionNode`的节点去处理发生冲突的键值，它们被放在`entries`数组里。
大家也可以自己试试，代码如下：



```js
let map = new Immutable.Map({});

for (let i = 0; i < 10; i++) {
  map = map.set(Math.random(), i); // 随便塞一点别的数据
}

map = map.set('abc', 'value1');
map = map.set('bCc', 'value2');

console.log(map)
```


