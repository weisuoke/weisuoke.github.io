# 极客时间 - 零基础Java

## 001. 内容综述

![image-20200428225143397](https://wsk-mweb.oss-cn-hangzhou.aliyuncs.com/ipic/2020-04-28-145147.png)

## 002. 开发环境搭建

### 安装Java

- 下载安装 JDK (Java Development Kit）
- 检测 JDK 安装是否成功

- 编写运行第一个程序- Hello World 
- 练习题



```shell
# 检查 JDK 是否安装成功
# 在命令行中运行 java -version 来判断 java 的版本号
java -version
```

```shell
javac
```

## 003. 编写 Hello World

```java
// HelloWorld.java
public class HelloWorld {
  public static void main(String[] args) {
    System.out.println("Hello World!");
  }
}
```

```shell
javac HelloWorld.java # 生成 HelloWorld.class
java HelloWorld # 执行 HelloWorld.class
```

## 004. 详解 HelloWorld 程序

### 类（class）语法元素

![image-20200428230627108](https://wsk-mweb.oss-cn-hangzhou.aliyuncs.com/ipic/2020-04-28-150629.png)

- 类 --- class 
- Helloworld 是类名

- public class --- 告诉 Java 类名要与代码文件名一致
- 大括号内是类的内容

### main 方法（main method）语法元素

![image-20200428230825832](https://wsk-mweb.oss-cn-hangzhou.aliyuncs.com/ipic/2020-04-28-150827.png)

- `public static void main (String[] args)` --main 方法的定义。告诉 Java 这是程序入口，也就是程序开始执行的地方

- 大括号内是方法的内容，又称方法体（method bady) 
- main 方法最为特殊的一点是，它是 Java 程序的入口。

### System.out.println

<img src="https://wsk-mweb.oss-cn-hangzhou.aliyuncs.com/ipic/2020-04-28-151112.png" alt="image-20200428231104412" style="zoom:50%;" />

- `System.out.println` 是 Java 提供的内置功能，可以将内容输出。

- 小括号里的内容是参数（parameter)

- 没有参数的情况下，`System.out.println()` 会输出一行空行。

### 关键知识点

- class 后面的名字是类名

- 类名必须与源文件的文件名相同，文件名后缀必须是小写的 java
-  main 方法是 Java 程序执行的入口



## 005. Intellij IDEA集成开发环境的安装和使用

## 006.  从加减乘除到变量

### 基本数据类型---int

int 用来表示个整数，取值范围在-2^31~2^31-1。计算出来是 -2147483648~2147483647

### 关键字（keyword）和标示符（Identifier)

**标示符**

- 由大小写英文字符，数字和下划线组成的，区分大小写的，不以数字开头的文字
- 可以用作 Java 中的各种东西的名字，比如类名，方法名等。
- 标示符是区分大小写的。

**关键字是 Java 语法的保留字，不能用来做名字。**

**我们接触到的关键字**

- `public`
- `class`
- `static`
- `void`
- `int`

### 用变量解决问题

- 变量（variable)
- 如何创建变量
- 如何给变量一个值
- 如何使用变量



## 007. 再探计算加减乘除的程序

```java
public class Variable {
    public static void main(String[] args) {
      	int variable;
      
      	variable = 999;
      
        int a = 3;
        int b = 5;
        int c = 7;

        int x = 9;

        int y = a * x  + b * x * x + c * x * x * x;

        System.out.println(y);
    }
}
```

### Java --- 代码三级跳表达式，语句和代码块

- 表达式(expression):  Java 中最基本的一个运算。比如一个加法运算表达式。`1+2` 是一个表达式，`a+b` 也是。

- 语句(statement): 类似于平时说话时的一句话，由表达式组成，以`；`结束。`int a=3;` `y=a+9;` `System. out.println();`都是语句。

- 代码块：一对大括号括起来的就是一个代码块。

### Java 是区分大小写的

- 关键字和标示符都是区分大小写的
- 类名必须与文件名一致，包括大小写要求

- 使用变量时，名字必须和声明变量时的标示符大小写一致
- 方法名也区分大小写。main 和 Main 是两个名字
- 类型也区分大小写。int 是数据类型，Int 则不是
-  `System.out.println` 可以被 Java 认识，`SYSTEM.Out.println` 就不可以

### 字面值不简单

- 整数的字面值类型默认是 int
- 超过 int 的范围会怎么样？需要使用取值范围更大的类型



## 008. Java中的基本数据类型

- 认识二进制

- 数字的基本数据类型
- 布尔和字符数据类型
- 使用各种基本数据类型

### 认识二进制

- 十进制
  - 每一位可以是 09 这 10 个值，到 10 进位，一百用十进制表示就是 100, 十就是 40

- 二进制
  - 每一位可以是 0 和 1 这两个值，到 2 进位。一百用二进制表示就是 1100100, 十就是 1010。

- 十六进制
  - 每一位可以是 0~F 这 16 个值，到 16 进位。一百用十六进制表示就是 64, 十就是 A。

- bit 和 byte

  - 一个二进制的位叫做一个 bit。网络带宽中的单位，都是 bit。

  -  八个二进制的位，组成一个 byte。硬盘等存储的单位，都是 byte。
  -  byte 是计算机中基本的衡量存储的单位，计算机在对外使用时不会用 bit 作为划分存储的单位。

### 数字的基本数据类型 

- 整数类型
  - byte 占用 1 个 byte，值域是-128~127
  - short 占用 2 个 byte，值域是-32768~32767
  - int 占用 4 个 byte，值域是-2147483648~2147483647。Java 中整数缺省是 int 类型 
  - long 占用 8 个 byte，值域是-9223372036854714808~922372036854774807

- 浮点（小数）类型
  - float 占用 4 个 byte，有精度，值域复杂±340282346638528859811704183484516925440
  - double 精度是 float 的两倍，占用 8 个 byte。Java 中浮点数缺省是 double 类型

- 符号位

### 布尔和字符数据类型

- 布尔和字符数据类型
  - boolean 占用 1 个 byte，值域是 true, talse。
  - char 占用 2 个 byte，值域是所有字符

### 使用各种基本数据类型

- 例程
- L 后缀

- 感受浮点数精度

- 整数缺省是 int 类型，浮点数缺省是 double 类型
- 编译错误的定位和修正

```java
public class PrimaryTypes {
    public static void main(String[] args) {
        byte byteVar = 99;
        System.out.println(byteVar);

        short shortVar = -30000;
        System.out.println(shortVar);

        int intVar = 300000;
        System.out.println(intVar);

        long longVar = 99L;
        System.out.println(longVar);

        long bigLongVar = 99999999L;
        System.out.println(bigLongVar);

        float floatVar = 100.1f;
        System.out.println(floatVar);

        double doubleVar = 100.1;
        System.out.println(doubleVar);

        boolean condition = true;
        boolean fcondition = false;
        System.out.println(condition);

        char ch = 'A';
        System.out.println(ch);
    }
}
```

## 009. Java中的运算符

### 什么是运算符

- 运算符对一个或者多个值进行运算，并得出一个运算结果。

- 运算符的运算结果类型有的是固定的，有时候会根据被计算的值变化。比如两个 int 相加，结果的类型就是 int。两个 byte 相加，返回值的类型就是 byte。

- 混淆点：除赋值运算符外，运算符本身不会更改变量的值

### 整数的除法运算

- int 除以 int 还是 int，不会变成浮点数

### 比较运算符和布尔运算符

- 比较运算符
  - `>`
  - `>=`
  - `<`
  - `<=`
  - `!=`
  - `==`

- 布尔运算符
  - `!`叫做非运算符，`not` 运算符。`!true` 是 false, `!false` 是 true。
  - `&`叫做且运算符，`and` 运算符。`true & true` 是 true, `true & false` 是 false 
  - &&叫做且且运算符，andand 运算符。运算结果和`&`一样。
  - `|` 叫做或运算符，or 运算符。`true | false` 是 true, `false | false` 是 false, `true | true` 为true 
  - `||` 叫做或或运算符，oror 运算符。运算结果和`|`一样。

### 小括号运算符

- 小括号运算符内可以包含任何运算符，决定运算符的顺序

### 运算符优先级

- 运算符优先级
  - `()`
  - `!`
  - `*`、`/`、`%`
  - `+`、`-`
  - `>`、`>=`、`<`、`<=`
  - `==`
  - `!=`
  - `&`、`&&`、`|`、`||`
  - `=`

- 理解运算符，灵活记忆优先级
  - 为什么等号的优先级最低
  - 为什么布尔运算符的优先级低于比较运算符？
  - 为什么比较运算符的优先级比算数运算符低？

## 010. Java中的位运算符

### 字面值的八进制和十六进制

- 以 0 开头的整数为八进制
  - 05 就是十进制的 5
  - 011 就是十进制的 9

- 以 Ox 开头的整数位十六进制
  - 0xF 就是十进制的 15
  - 0x11 就是十进制的 17

```java
public class LiteralNumber {
    public static void main(String[] args) {
        int a = 05;
        int b = 011;
        int c = 0xF;
        int d = 0x11;

        System.out.println(a); // 5
        System.out.println(b); // 9
        System.out.println(c); // 15
        System.out.println(d); // 17
    }
}
```

### 按位运算符

- 按位运算符
  - 按位并（AND): `&`
  - 按位或（OR):`|`
  - 按位异或（XOR): `^`
  - 按位取反: `~`

```java
public class BitCalc {
    public static void main(String[] args) {
        // 二进制 1111 1000
        int a = 0xF8;
        // 二进制 1111 0100
        int b = 0xF4;
        // 二进制 1111 1111
        int c = 0xFF;

        System.out.println(a & b);	// 240
        System.out.println(a | b);  // 252
        System.out.println(a ^ b);  // 12
        System.out.println(~c); // -256
    }
}
```

### 位移运算符

- 位移运算符
  - `>>`：符号位不动，其余位右移，符号位后边补 0, 又称帯符号右移
  - `>>>`：符号位一起右移，左边补 0, 又称无符号右移
  - `<<`：左移，右边补 0。左移没有带符号位一说，因为符号位在最左侧

### 位运算符用处

- 按位运算符
  - 掩码（MASK）

  ```java
  public class BitOprUsage {
      public static void main(String[] args) {
          int base = 1;
          int is_student_mask = base;
          int is_programmer_mask = base << 1;
          int is_driver_mask = base << 2;
          int is_painter_mask = base << 3;
  
          int data = 5;
  
          boolean isStudent = (data & is_student_mask) != 0;
          System.out.println(isStudent);
  
          boolean isProgrammer = (data & is_programmer_mask) != 0;
          System.out.println(isProgrammer);
  
          boolean isDriver = (data & is_driver_mask) != 0;
          System.out.println(isDriver);
  
          boolean isPainter = (data & is_painter_mask) != 0;
          System.out.println(isPainter);
      }
  }
  ```

- 位移运算符
  
  - 高效除以 2

## 011. 基本数据类型的更多知识点

### 变量要先赋值后使用

- 变量要先赋值后使用
  - 不给变量赋值代表什么
  - 不赋值就使用会怎么样

### 数据类型自动转换

- 自动类型转换
  - 不会出现问题的类型转换，编程语言可以做自动类型转换，比如低精度的数字向高精度的数字转换。
  - 自动类型转换可以发生在算数运算，也可以发生在赋值

- 数值精度序：double > float > long > int > short > byte
- char 可以转换为 int
  - char 可以转换为 int
  - 虽然同样是两个 byte，但是因为 char 是无符号数，值域超出了 shot 可以表示的范围所以不可以自动转为 short

### 强制数据类转換

- 强制类型转换
  - 可能岀现问题的类型转换，需要使用强制类型转换，比如如高精度数值向低精度数值转换。
  - 强制类型转换也是操作符

  - 语法是用小括号括起来的目标类型放在被转换的值前面
  - 强制转换会造成数据精度丟失

- 数值溢出
  - 数值计算一旦溢出，结果将失去其原有意义。比如，两个正数会加出负数
  - 要能够处理的值有大概的估计。

### 从数值计算溢出理解程序员和編程语言责任的分界线

- 编程语言的作用
  - 编程语言负责按照语法执行
  - 编程语言负责和计算机交互

- 程序员的任务
  - 程序员负责理解问题
  - 程序员负责理解程序，并将问题转换为程序
  - 编程语言不负责解决问题，程序员才负责解决问题



## A01. 类（class）

- 用变量表示商品

- 商品有标识，名字，数量，价格着几个属性多个商品怎么办？重复，又是重复！

```java
// >> TODO 一个类以 public class开头，public class 代表这个类是公共类，类名必须和文件名相同。
// >> TODO public class 后面紧跟类名，然后是一对打括号的类体
public class Merchandise {
    // >> TODO 类体中可以定义描述这个类的属性的变量。我们称之为成员变量（member variable)
    // >> TODO 每个成员变量的定义以；结束
    String name;
    String id;
    int count;
    double price;
}

// >> TODO 上面这整个类，其实就是创建了一个模版。描述了一种我们需要的数据类型。
```

## A02. 初探类和对象

### 如何创建类的实例/对象(Instance/ Object)

- 从数据类型的角度来看，类就是自己创建了一种新的数据类型。类也叫做“自定义类型“。一个 Java 程序中不允许类同名

- 看例程，学习类和对象的使用

```java
public class SuperMarket {
    public static void main(String[] args) {
        // >> TODO 使用new操作符，可以创建一个类的实例/对象(instance/ object)
        // >> TODO 使用 new 创建一个类的实例后，类中定义的每种变量都会被赋以其类型的初始值。
        // >> TODO 这个和数组也是一样的
        // >> TODO 使用一个同类型的对象变量，可以指向并操作这个实例。这两点和数组都很类似
        // 创建一个 Merchandise 的实例，用 m1 指向它。
        Merchandise m1 = new Merchandise();
        // 使用点操作符，给 m1 指向的实例赋值。
        m1.name = "茉莉花茶包 20 包";
        m1.id = "000099518";
        m1.count = 1000;
        m1.price = 99.9;

        Merchandise m2 = new Merchandise();
        m2.name = "可口可乐 330ml";
        m2.id = "000099519";
        m2.count = 1000;
        m2.price = 3.0;

        // 卖出一个商品1
        int m1ToSold = 1;
        System.out.println("感谢购买" + m1ToSold + "个" + m1.name + "。商品单价为" + m1.price + "。消费总价为" + m1.price * m1ToSold + "。");
        m1.count -= m1ToSold;
        System.out.println(m1.id + "剩余的库存数量为" + m1.count);

        // 卖出3个商品2
        int m2ToSold = 1;
        System.out.println("感谢购买" + m2ToSold + "个" + m2.name + "。商品单价为" + m2.price + "。消费总价为" + m2.price * m2ToSold + "。");
        m2.count -= m2ToSold;
        System.out.println(m2.id + "剩余的库存数量为" + m2.count);
    }
}
```

### 通过点操作符操作对象的属性

- 认识点操作符
  - 点操作符是用来访问/操作前面实体的展性的，类似于“的”
  - `merchandise.name`可以读作 merchandise 的 name。

## A03. 认识引用类型

- 引用（reference）数据类型

- 引用数据类型和基本数据类型
-  Java 有一个大大的布告板，放着所有实例

### 引用（reference）数据类型

- Java 中的数据类型分为基本数据类型和引用数据类型
- 看例程，理解引用

```java
public class ReferenceAndPrimaryDataType {
    public static void main(String[] args) {

        // >> TODO M1 是一个 Merchandise 类型的引用，只能指向 Merchandise 类型的实例
        // >> TODO 引用数据类型变量包含两部分信息：类型和实例。也就是说，
        //    TODO 每一个引用数据类型的变量（简称引用），都是指向某个类（Class/自定义类型）
        //    TODO 的一个实例/对象(instance/ object）。不同类型的引用在 Java 的世界里都是引用。
        // >> TODO 引用的类型信息在创建时就已经确定，可以通过给引用赋值，让其指向不同的实例
        //    TODO 比如 m1 就是 Merchandise 类型，只能指向 Merchandise 的实例
        Merchandise m1;
        m1 = new Merchandise();
        Merchandise m2 = new Merchandise();
        Merchandise m3 = new Merchandise();
        Merchandise m4 = new Merchandise();
        Merchandise m5 = new Merchandise();

        // >> TODO 给一个引用赋值，则两者的类型必须一样。m5 可以给 m1 赋值，因为他们类型是一样的
        m1 = m5;
    }
}
```

### 引用数据类型和基本数据类型

**引用数据类型和基本数据类型的相同点**

- 都可以用来创建变量，可以赋值和使用其值
- 本身都是一个地址

**引用数据类型和基本数据类型的不同点**

- 基本类型变量的值，就是地址对应的值。引用数据类型的值还是一个地址，需要通过“二级跳”找到实例

- 引用数据类型是 Java 的一种内部类型，是对所有自定义类型和数组引用的统称，并非特指某种类型

### Java 有ー个的大大的布告板，放着所有实例

`Merchandise m1 = new Merchandise();`

- 使用 `new` 操作符可以创建某个类的一个实例。在 Java 程序运行的时候，所有这些创建出来的实例都被 Java 放在内存里一个叫做堆（heap）的、类似公告板的地方

- 创建一个实例，就是根据类的定义，点出需要的“纸”，订成一个本子，挂在布告板上。实例本身，可以认为是一个小本子
- 引用里存放的，相当于某个本子所在的布告板的地址

![image-20200511221813455](/Users/wuxiao/Library/Application Support/typora-user-images/image-20200511221813455.png)

## A04. 类、对象和引用的关系

### 类，对象和引用的关系

**类和对象的关系**

- 类是对象的模版，对象是类的一个实例

- 一个 Java 程序中类名相同的类只能有一个，也就是类型不会重名
- 一个类可以有很多对象
- 一个对象只能根据一个类来创建

**引用和类以及对象的关系**

- 引用必须是、只能是一个类的引用
- 引用只能指向其所属的类型的类的对象
- 相同类型的引用之间可以赋值

- 只能通过指向一个对象的引用，来操作一个对象，比如访问某个成员变量

## A05. 认识数组类型

### 认识数组类型

**数组是一种特殊的类**

- 数组的类名就是类型带上中括号

- 同一类型的数组，每个数组对象的大小可以不一样。也就是**每个数组对象占用的内存可以不一样**，这点和类的对象不同。

- 可以用引用指向类型相同大小不同的数组，因为它们属于同一种类型

```java
package a;

public class ArrayIsClass {
    public static void main(String[] args) {
        // >> TODO “数组变量“其背后真身就是引用。数组类型就是一种特殊的类。
        // >> TODO 数组的大小不决定数组的类型，数组的类型是只是由元素类型決定的。
        int[] intArr;
        intArr = new int[1];
        intArr = new int[2];

        double[][][] double3DArray;

        int[] a1 = new int[9];
        int[] a2 = new int[0];

        a2 = a1;
        System.out.println("a2.length=" + a2.length);
        double[] a3 = new double[5];
        //a3 是 double[]类型的引用，不可以用 int[]类型的引用赋值。
        a3 = a1
    }
}
```

**引用的数组**

- 可以把类名当成自定义类型，定义引用的数组，甚至多维数组

## A06. 引用的缺省值 --- null

### 引用的缺省值 null

- 引用也有缺省值---null
  - null 是引用类型的缺省值
  - null 代表空，不存在。可以读作空
  - 引用类型的数组创建出来，初始值都是空

```java
public class RefAndNull {
    public static void main(String[] args) {
        // 数组在创建出来之后，会按照类型给数组中的每个元素赋缺省值。
        // 引用类型的缺省值是 null
        Merchandise[] merchandises = new Merchandise[9];

        // 给索引为偶数的引用赋值
        for (int i = 0; i < merchandises.length; i++) {
            if (i % 2 == 0) {
                merchandises[i] = new Merchandise();
            }
        }

        // 依次输出数组的值
        for (int i = 0; i < merchandises.length; i++) {
            System.out.println(merchandises[i]);
        }

        for (int i = 0; i < merchandises.length; i++) {
            if (i % 2 == 0) {
                Merchandise m = merchandises[i];
                System.out.println(m.price);
                System.out.println(m.count);
                System.out.println(m.name);
            }
        }
    }
}
```

- nul 带来的问题
  - 大名鼎鼎的 NullPointerException (NPE）
  - 如果不确定，使用前要先判断引用是不是空

- 通过 null 理解引用的“二级跳

## A07. 像自定义类型一样使用类

- 类就是一种自定义类型
  - 在类定义中可以使用类，创建类的引用
  - 在类定义中，甚至可以使用类自己的类创建引用
  - 引用类型的缺省值是 null。一个类定义中如果有引用，创建出来的实例，其缺省值是 nul

## A08. Java中的包和访问修饰符的知识

### 类多太混乱？用 package 管理

- 为了避兔类在一起混乱，可以把类放在文件夹里。这时就需要用package语句告诉 Java 这个类在哪个 package 里。package 语句要和源文件的目录完全对应，大小写要一致
- package 读作包。一般来说，类都会在包里，而不会直接放在根目录
- 不同的包里可以有相同名字的类

- 一个类只能有一个 package 语句，如果有 package 语句，则必须是类的第一行有效代码

### 类使用太繁琐怎么办？用 import 

- 当使用另一个包里的类时候，需要带上包名

- 每次使用都带包名很繁琐，可以在使用的类的上面使用 Import 语句，一次性解决问题，就可以直接使用类了。就好像我们之前用过的 Scanner类

-  import 语句可以有多个

- 如果需要 import 一个包中的很多类，可以使用*通配符

### 属性访问修饰符：public

- 被 public 修饰的属性，可以被任意包中的类访问

- 没有访问修饰符的属性，称作缺省的访问修饰符，可以被本包内的其他类和自己的对象

- 访问修饰符是一种限制或者允许属性访问的修饰符