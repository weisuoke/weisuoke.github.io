# React基础

## 1. 什么是React?

React 是一个用于构建用户界面的JavaScript库 核心专注于视图,目的实现组件化开发

## 2. 组件化的概念

我们可以很直观的将一个复杂的页面分割成若干个独立组件,每个组件包含自己的逻辑和样式 再将这些独立组件组合完成一个复杂的页面。 这样既减少了逻辑复杂度，又实现了代码的重用

- 可组合：一个组件可以和其他的组件一起使用或者可以直接嵌套在另一个组件内部
- 可重用：每个组件都是具有独立功能的，它可以被使用在多个场景中
- 可维护：每个小的组件仅仅包含自身的逻辑，更容易被理解和维护

## 3. 跑通react开发环境

```shell
npm install create-react-app -g
create-react-app <project-name>
cd <project-name> && npm start
```

默认会自动安装React,react由两部分组成,分别是:

- react.js 是 React 的核心库
- react-dom.js 是提供与DOM相关的功能,会在window下增加ReactDOM属性,内部比较重要的方法是render,将react元素或者react组件插入到页面中。

##  4. 简介JSX

是一种JS和HTML混合的语法,将组件的结构、数据甚至样式都聚合在一起定义组件,会编译成普通的Javascript。 需要注意的是JSX并不是html,在JSX中属性不能包含关键字，像class需要写成className,for需要写成htmlFor,并且属性名需要采用驼峰命名法！

## 5. createElement

JSX其实只是一种语法糖,最终会通过babel转译成createElement语法,以下代码等价

```jsx
ReactDOM.render(<div>wei,<span>suoke</span></div>);
ReactDOM.render(React.createElement("div", null, "wei,", React.createElement("span", null, "suoke")))
```

我们一般使用React.createElement来创建一个虚拟dom元素。

## 6. react元素/JSX元素

```javascript
function ReactElement(type,props) {
    this.type = type;
    this.props = props;
}
let React = {
    createElement(type,props={},...childrens){
        childrens.length===1?childrens = childrens[0]:void 0
        return new ReactElement(type,{...props,children:childrens})
    }
};
```

ReactElement就是虚拟dom的概念，具有一个type属性代表当前的节点类型，还有节点的属性props

## 7. 模拟Render实现

```javascript
let render = (eleObj,container)=>{
    // 先取出第一层 进行创建真实dom
    let {type,props} = eleObj;
    let elementNode = document.createElement(type); // 创建第一个元素
    for(let attr in props){ // 循环所有属性
        if(attr === 'children'){ // 如果是children表示有嵌套关系
            if(typeof props[attr] == 'object'){ // 看是否是只有一个文本节点
                props[attr].forEach(item=>{ // 多个的话循环判断 如果是对象再次调用render方法
                    if(typeof item === 'object'){
                        render(item,elementNode)
                    }else{ //是文本节点 直接创建即可
                        elementNode.appendChild(document.createTextNode(item));
                    }
                })
            }else{ // 只有一个文本节点直接创建即可
                elementNode.appendChild(document.createTextNode(props[attr]));
            }
        }else if(attr === 'className'){ // 是不是class属性 class 属性特殊处理
            elementNode.setAttribute('class',props[attr]);
        }else{
            elementNode.setAttribute(attr,props[attr]);
        }
    }
    container.appendChild(elementNode)
};
```

## 8. JSX表达式的用法

1.  可以放JS的执行结果
2. 如果换行需要用()包裹jsx代码
3. 可以把JSX元素当作函数的返回值
4. {来判断是表达式还是js

```jsx
import React from 'react';
import ReactDOM from 'react-dom';

function toResult({name,age}) {
    return <span>今年{name},{age}岁了!</span>
}
let arrs =  [{name:'zfpx',age:8},,{name:'姜文',age:28}];
ReactDOM.render(<div>
    {arrs.map(((item,index)=>(
        typeof item==='object'?<li key={index}>{toResult(item)}</li>:null
    )))}
</div>,document.getElementById('root'));
```

## 9. JSX属性

在JSX中分为普通属性和特殊属性，像class要写成className,for要写成htmlFor style要采用对象的方式 dangerouslyInnerHTML插入html

## 10. 组件的特点声明方式

react元素是是组件组成的基本单位

首字母必须大写,目的是为了和JSX元素进行区分 组件定义后可以像JSX元素一样进行使用 每个组件必须返回唯一的顶级JSX元素 可以通过render方法将组件渲染成真实DOM

## 11. 组件的两种定义方式

react怎么区分是组件还是jsx元素？组件名需要开头大写，react组件当作jsx来进行使用

第一种方式是函数声明

```jsx
function Build(props) {
  return <p>{props.name} {props.age}</p>
}
render(<div>
  <Build name={school1.name} age={school1.age}/>
  <Build {...school2} />
</div>,window.root);
```

第二种方式是类声明

```jsx
class Build extends Component{
  render(){
      let {name,age} = this.props;
      return <p>{name} {age}</p>
  }
}
```

类声明有状态，this，和声明周期

## 12. 组件中属性和状态的区别

组件的数据来源有两个地方 props 外界传递过来的(默认属性，属性校验) state 状态是自己的,改变状态唯一的方式就是setState 属性和状态的变化都会影响视图更新

## 13. 绑定事件

给元素绑定事件，事件绑定方式

```jsx
class Clock extends Component {
    constructor(){
        super();
        this.state = {date:new Date().toLocaleString()}
    }
    componentDidMount(){ //组件渲染完成，当渲染后会自动触发此函数
        this.timer = setInterval(()=>{ // 箭头函数 否则this 指向的是window
            this.setState({date:new Date().toLocaleString()})
        },1000);
    }
    componentWillUnmount(){ //组件将要卸载，当组件移除时会调用
        clearInterval(this.timer); //一般在这个方法中 清除定时器和绑定的事件
    }
    destroy=()=>{ //es7 箭头函数
        // 删除某个组件
        ReactDOM.unmountComponentAtNode(window.root);
    }
    render(){
        // 给react元素绑定事件默认this是undefined,bind方式 在就是箭头函数
        return <h1 onClick={this.destroy}>{this.state.date}</h1>
    }
}
```

// 执行顺序 constructor -> render -> componentDidMount -> setState-> render - onClick-> unmountComponentAtNode -> componentWillUnmount -> clearInterval ReactDOM.render(,window.root); 给jsx元素绑定事件要注意事件中的this指向，事件名采用 on+"开头大写事件名"的方式

## 14. 属性校验,默认属性

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types'; //引入属性校验的模块
class School extends React.Component{ // 类上的属性就叫静态属性
    static propTypes = { // 校验属性的类型和是否必填
        age:PropTypes.number.isRequired, // 支持的类型可以参考prop-types的readme文件
    };
    static defaultProps = { // 先默认调用defaultProps
        name:'珠峰',
        age:1
    }; // 默认属性
    constructor(props){ //如果想在构造函数中拿到属性需要通过参数的方式
         //不能在组件中更改属性 不能修改属性*
        super();
    }
    render(){
        return <h1>{this.props.name} {this.props.age}</h1>
    }
}
// propTypes和defaultProps名字不能更改，这是react规定好的名称
```

## 15. 状态的使用

```jsx
class Counter extends Component{
    constructor(){
        super();
        this.state = {count:0}
    };
    handleClick = ()=>{
        // setState方法会进行合并 setState有两种写法 一种是对象一种是函数
        /*this.setState({count:this.state.count+1});
          this.setState({count:this.state.count+1});*/
        //this.setState((prevState)=>({count:prevState.count+1})); //如果返回的就是一个对象可以用小括号包裹
        //this.setState((prevState)=>({count:prevState.count+1}));
        // 下一个状态是依赖于上一个状态时需要写成函数的方式
        this.setState({count:this.state.count+1},function () {
            this.setState({count:this.state.count+1});
        }); // 这个写法等同于 this.setState((prevState)=>({count:prevState.count+1}));
    };
    render(){
        console.log('render');
        return (
            <p>
                {this.state.count}
                <button onClick={this.handleClick}>+</button>
            </p>
        )
    }
}
ReactDOM.render(<Counter/>,window.root);
```

如果设置多个状态setState会合并，如果下一个状态依赖于上一个状态，需要写成函数的方式

### 16. 复合组件

复合组件就是将多个组件进行组合，结构非常复杂时可以把组件分离开

父子组件的通信

```jsx
class Panel extends Component{
    render(){
        let {header,body} = this.props;
        return (
            <div className="container">
                <div className="panel-default panel">
                    <Header head={header}></Header>
                    <Body b={body}/>
                </div>
            </div>
        )
    }
} // react种需要将属性一层层向下传递 单向数据流
class Body extends Component{
    render(){return (<div className="panel-body">{this.props.b}</div>)}
}
class Header extends Component{
    render(){return (<div className="panel-heading">{this.props.head}</div>)}
}
let data = {header:'我非常帅',body:'长的帅'};
ReactDOM.render(<Panel {...data}/>,window.root);
```

子父组件的通信 通过父亲传递给儿子一个函数，儿子调用父亲的函数将值传递给父亲,父亲更新值，刷新视图

```jsx
class Panel extends Component{
    constructor(){
        super();
        this.state = {color:'primary'}
    }
    changeColor=(color)=>{ //到时候儿子传递一个颜色
        this.setState({color});
    };
    render(){
        return (
            <div className="container">
                <div className={"panel-"+this.state.color+" panel"}>
                    <Header head={this.props.header}
                            change={this.changeColor}
                    ></Header>
                </div>
            </div>
        )
    }
}
class Header extends Component{
    handleClick = ()=>{
        this.props.change('danger'); //调用父亲的方法
    };
    render(){return (
        <div className="panel-heading">
        {this.props.head} <button className="btn btn-danger" onClick={this.handleClick}>改颜色</button>
        </div>)}
}
```

## 17. 受控组件和非受控组件

受状态控制的组件，必须要有onChange方法，否则不能使用 受控组件可以赋予默认值（官方推荐使用 受控组件） 实现双向数据绑定

```jsx
class Input extends Component{
    constructor(){
        super();
        this.state = {val:'100'}
    }
    handleChange = (e) =>{ //e是事件源
        let val = e.target.value;
        this.setState({val});
    };
    render(){
        return (<div>
            <input type="text" value={this.state.val} onChange={this.handleChange}/>
            {this.state.val}
        </div>)
    }
}
```

受控组件

```jsx
class Sum extends Component{
    constructor(){
        super();
        this.state = {a:1,b:1}
    }
    // key表示的就是当前状态改的是哪一个
    // e表示的是事件源
    handleChange(key,e){ //处理多个输入框的值映射到状态的方法
        this.setState({
            [key]:parseInt(e.target.value)||0
        })
    }
    render(){
        return (
            <div>
                <input type="number" value={this.state.a} onChange={e=>{this.handleChange('a',e)}}/>
                <input type="number" value={this.state.b} onChange={e=>{this.handleChange('b',e)}}/>
                {this.state.a+this.state.b}
            </div>
        )
    }
}
```

非受控组件

```jsx
class Sum extends Component{
    constructor(){
        super();
        this.state =  {result:''}
    }
    //通过ref设置的属性 可以通过this.refs获取到对应的dom元素
    handleChange = () =>{
        let result = this.refs.a.value + this.b.value;
        this.setState({result});
    };
    render(){
        return (
            <div onChange={this.handleChange}>
                <input type="number" ref="a"/>
                {/*x代表的真实的dom,把元素挂载在了当前实例上*/}
                <input type="number" ref={(x)=>{
                    this.b = x;
                }}/>
                {this.state.result}
            </div>
        )
    }
}
```

## 18. React生命周期

```jsx
class Counter extends React.Component{ // 他会比较两个状态相等就不会刷新视图 PureComponent是浅比较
  static defaultProps = {
    name:'weisuoke'
  };
  constructor(props){
    super();
    this.state = {number:0}
    console.log('1.constructor构造函数')
  }
  componentWillMount(){ // 取本地的数据 同步的方式：采用渲染之前获取数据，只渲染一次
    console.log('2.组件将要加载 componentWillMount');
  }
  componentDidMount(){
    console.log('4.组件挂载完成 componentDidMount');
  }
  handleClick=()=>{
    this.setState({number:this.state.number+1});
  };
  // react可以shouldComponentUpdate方法中优化 PureComponent 可以帮我们做这件事
  shouldComponentUpdate(nextProps,nextState){ // 代表的是下一次的属性 和 下一次的状态
    console.log('5.组件是否更新 shouldComponentUpdate');
    return nextState.number%2;
    // return nextState.number!==this.state.number; //如果此函数种返回了false 就不会调用render方法了
  } //不要随便用setState 可能会死循环
  componentWillUpdate(){
    console.log('6.组件将要更新 componentWillUpdate');
  }
  componentDidUpdate(){
    console.log('7.组件完成更新 componentDidUpdate');
  }
  render(){
    console.log('3.render');
    return (
      <div>
        <p>{this.state.number}</p>
        {this.state.number>3?null:<ChildCounter n={this.state.number}/>}
        <button onClick={this.handleClick}>+</button>
      </div>
    )
  }
}
class ChildCounter extends Component{
  componentWillUnmount(){
    console.log('组件将要卸载componentWillUnmount')
  }
  componentWillMount(){
    console.log('child componentWillMount')
  }
  render(){
    console.log('child-render')
    return (<div>
      {this.props.n}
    </div>)
  }
  componentDidMount(){
    console.log('child componentDidMount')
  }
  componentWillReceiveProps(newProps){ // 第一次不会执行，之后属性更新时才会执行
    console.log('child componentWillReceiveProps')
  }
  shouldComponentUpdate(nextProps,nextState){
    return nextProps.n%3; //子组件判断接收的属性 是否满足更新条件 为true则更新
  }
}
// defaultProps
// constructor
// componentWillMount
// render
// componentDidMount
// 状态更新会触发的
// shouldComponentUpdate nextProps,nextState=>boolean
// componentWillUpdate
// componentDidUpdate
// 属性更新
// componentWillReceiveProps newProps
// 卸载
// componentWillUnmount
```

## 19. 使用 PropTypes 进行类型检查

React 内置了类型检测的功能。要在组件中进行类型检测，你可以赋值 propTypes 属性

- .array 数组
- .bool 布尔值
- .func 函数
- .number 数字
- .object 对象
- .string 字符串
- .symbol 符号
- .node 任何东西都可以被渲染:numbers, strings, elements,或者是包含这些类型的数组(或者是片段)。
- .element React元素
- .instanceOf(Message) 类的一个实例
- .oneOf(['News', 'Photos']) 枚举值
- .oneOfType([PropTypes.string,PropTypes.number,PropTypes.instanceOf(Message)]) 多种类型其中之一
- .arrayOf(PropTypes.number) 某种类型的数组
- .objectOf(PropTypes.number) 某种类型的对象
- .shape({color: PropTypes.string,fontSize: PropTypes.number}) 特定形式的对象
- .func.isRequired 可以使用 `isRequired' 链接上述任何一个，以确保在没有提供 prop 的情况下显示警告
- .any.isRequired 任何数据类型的值
- function(props, propName, componentName) { return new Error()} 自定义的验证器
- .arrayOf(function(propValue, key, componentName, location, propFullName) {}

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
class Person extends React.Component{
  static defaultProps = {
    name:'Stranger'
  }
    static propTypes={
        name: PropTypes.string.isRequired,
        age: PropTypes.number.isRequired,
        gender: PropTypes.oneOf(['male','famale']),
        hobby: PropTypes.array,
        postion: PropTypes.shape({
            x: PropTypes.number,
            y:PropTypes.number
        }),
        age(props,propName,componentName) {
            let age=props[propName];
            if (age <0 || age>120) {
                return new Error(`Invalid Prop ${propName} supplied to ${componentName}`)
            }
        }
    }
    render() {
        let {name,age,gender,hobby,position}=this.props;
        return (
            <table>
                <thead>
                <tr>
                    <td>姓名</td>
                    <td>年龄</td>
                    <td>性别</td>
                    <td>爱好</td>
                    <td>位置</td>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>{name}</td>
                    <td>{age}</td>
                    <td>{gender}</td>
                    <td>{hobby.join(',')}</td>
                    <td>{position.x+' '+position.y}</td>
                </tr>
                </tbody>
            </table>
        )
    }
}
let person={
    age: 100,
    gender:'male',
    hobby: ['basketball','football'],
    position: {x: 10,y: 10},
}
ReactDOM.render(<Person {...person}/>, document.getElementById('root'));
```

## 20. 优化性能

在内部，React使用几种巧妙的技术来最大限度地减少更新UI所需的昂贵的 DOM 操作的数量

### 20.1 使用生产版本

- 最好在开发应用时使用开发模式，部署应用时换为生产模式

**Create React App**

```shell
npm run build
```

**单文件构建**

```html
<script src="https://unpkg.com/react@15/dist/react.min.js"></script>
<script src="https://unpkg.com/react-dom@15/dist/react-dom.min.js"></script>
```

**webpack**

```javascript
new webpack.DefinePlugin({
  'process.env': {
    NODE_ENV: JSON.stringify('production')
  }
}),
new webpack.optimize.UglifyJsPlugin()
```

## 21. 使用 Chrome 性能分析工具 分析组件性能

1. 通过添加 ?react_perf 查询字段加载你的应用(例如：[http://localhost:3000/?react_perf)。](http://localhost:3000/?react_perf)%E3%80%82)
2. 打开 Chrome DevTools Performance 并点击 Record 。[timeline-tool](https://developers.google.com/web/tools/chrome-devtools/evaluate-performance/reference)
3. 执行你想要分析的操作，不要超过20秒，否则 Chrome 可能会挂起。
4. 停止记录。
5. 在 User Timing 标签下，React事件将会分组列出。[react-16](https://building.calibreapp.com/debugging-react-performance-with-react-16-and-chrome-devtools-c90698a522ad)

## 22. 避免重新渲染

- React 构建并维护渲染 UI 的内部表示
- 当组件的 props 和 state 改变时，React 通过比较新返回的元素 和 之前渲染的元素 来决定是否有必要更新DOM元素。当二者不相等时，则更新 DOM 元素

### 22.1 shouldComponentUpdate

### 22.2 PureComponent

React.PureComponent 与 React.Component 完全相同，但是在shouldComponentUpdate()中实现时，使用了 props 和 state 的浅比较

### 22.3 使用 Immutable 数据结构

- 不可变(Immutable): 一个集合一旦创建，在其他时间是不可更改的。
- 持久的(Persistent): 新的集合可以基于之前的结合创建并产生突变，例如：set。原来的集合在新集合创建之后仍然是可用的。
- 结构共享(Structural Sharing): 新的集合尽可能通过之前集合相同的结构创建，最小程度地减少复制操作来提高性能。

```jsx
import { is } from 'immutable';
shouldComponentUpdate: (nextProps, nextState) => {
return !(this.props === nextProps || is(this.props, nextProps)) ||
       !(this.state === nextState || is(this.state, nextState));
}
```

改进setState

```jsx
this.setState({ data: this.state.data.update('counter', counter => counter + 1) });
```

## 23. Reconciliation

当比较不同的两个树，React 首先比较两个根元素。根据根跟的类型不同，它有不同的行为

- 当比较不同的两个树，React 首先比较两个根元素。根据根跟的类型不同，它有不同的行为
- 当比较两个相同类型的 React DOM 元素时，React 检查它们的属性（attributes），保留相同的底层 DOM 节点，只更新发生改变的属性（attributes）
- 当一个组件更新的时候，组件实例保持不变，以便在渲染中保持state。React会更新组件实例的属性来匹配新的元素，并在元素实例上调用 componentWillReceiveProps() 和 componentWillUpdate()
- Keys

## 24. 上下文(Context)

在某些场景下，你想在整个组件树中传递数据，但却不想手动地在每一层传递属性。你可以直接在 React 中使用强大的”context” API解决上述问题

```jsx
import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
class Header extends Component{
    render() {
        return (
            <div>
                <Title/>
            </div>
        )
    }
}
class Title extends Component{
    static contextTypes={
        color:PropTypes.string
    }
    render() {
        return (
            <div style={{color:this.context.color}}>
                Title
            </div>
        )
    }
}
class Main extends Component{
    render() {
        return (
            <div>
                <Content>
                </Content>
            </div>
        )
    }
}
class Content extends Component{
    static contextTypes={
        color: PropTypes.string,
        changeColor:PropTypes.func
    }
    render() {
        return (
            <div style={{color:this.context.color}}>
                Content
                <button onClick={()=>this.context.changeColor('green')}>绿色</button>
                <button onClick={()=>this.context.changeColor('orange')}>橙色</button>
            </div>
        )
    }
}
class Page extends Component{
    constructor() {
        super();
        this.state={color:'red'};
    }
    static childContextTypes={
        color: PropTypes.string,
        changeColor:PropTypes.func
    }
    getChildContext() {
        return {
            color: this.state.color,
            changeColor:(color)=>{
                this.setState({color})
            }
        }
    }
    render() {
        return (
            <div>
                <Header/>
                <Main/>
            </div>
        )
    }
}
ReactDOM.render(<Page/>,document.querySelector('#root'));
```

## 25. 片段(fragments)

React 中一个常见模式是为一个组件返回多个元素。 片段(fragments) 可以让你将子元素列表添加到一个分组中，并且不会在DOM中增加额外节点。

```javascript
import React from 'react';
import ReactDOM from 'react-dom';

class List extends React.Component{
    render() {
        return (
            <React.Fragment>
            {
                this.props.todos.map(item => (<li>{item}</li>))
            }
           </React.Fragment>
        )
    }
}
class Todos extends React.Component{
    constructor() {
        super();
        this.state={todos:['a','b','c']};
    }
    render() {
        return (
            <ul>
                <List todos={this.state.todos}/>
            </ul>
        )
    }
}

ReactDOM.render(<Todos/>,document.querySelector('#root'));
```

## 26. 插槽(Portals)

Portals 提供了一种很好的方法，将子节点渲染到父组件 DOM 层次结构之外的 DOM 节点。

```javascript
ReactDOM.createPortal(child, container)
```

- 第一个参数（child）是任何可渲染的 React 子元素，例如一个元素，字符串或 片段(fragment)
- 第二个参数（container）则是一个 DOM 元素

```jsx
import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import './modal.css';

class Modal extends Component{
    constructor() {
        super();
        this.modal=document.querySelector('#modal-root');
    }
    render() {
        return ReactDOM.createPortal(this.props.children,this.modal);
    }
}
class Page extends Component{
    constructor() {
        super();
        this.state={show:false};
    }
    handleClick=() => {
        this.setState({show:!this.state.show});
    }
    render() {
        return (
            <div>
                <button onClick={this.handleClick}>显示模态窗口</button>
                {
                    this.state.show&&<Modal>
                    <div id="modal" className="modal">
                        <div className="modal-content" id="modal-content">
                                内容
                                <button onClick={this.handleClick}>关闭</button>
                        </div>
                    </div>
                </Modal>
                }
            </div>
        )
    }
}
ReactDOM.render(<Page/>,document.querySelector('#root'));
```

```css
.modal{
    position: fixed;
    left:0;
    top:0;
    right:0;
    bottom:0;
    background: rgba(0,0,0,.5);
    display: block;
}

@keyframes zoom{
    from{transform:scale(0);}
    to{transform:scale(1);}
}

.modal .modal-content{
    width:50%;
    height:50%;
    background: white;
    border-radius: 10px;
    margin:100px auto;
    display:flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    animation: zoom .6s;
}
```

## 27. 错误边界(Error Boundaries)

部分 UI 中的 JavaScript 错误不应该破坏整个应用程序。 为了解决 React 用户的这个问题，React 16引入了一个 “错误边界(Error Boundaries)” 的新概念。

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
class ErrorBoundary extends React.Component{
    constructor(props) {
        super(props);
        this.state={hasError:false};
    }
    componentDidCatch(err,info) {
        this.setState({hasError: true});
    }
    render() {
        if (this.state.hasError) {
            return <h1>Something Went Wrong</h1>
        }
        return this.props.children;
    }
}

class Page extends React.Component{
    render() {
        return (
            <ErrorBoundary>
                <Clock/>
            </ErrorBoundary>
        )
    }
}
class Clock extends React.Component{
    render() {
        return (
            <div>hello{null.toString()}</div>
        )
    }
}

ReactDOM.render(<Page/>,document.querySelector('#root'));
```

## 28. 高阶组件(Higher-Order Components)

```jsx
const NewComponent = higherOrderComponent(OldComponent)
```

```jsx
import React,{Component} from 'react';
import ReactDOM from 'react-dom';

export default (WrappedComponent,name) => {
    class HighOrderComponent extends Component{
        constructor() {
            super();
            this.state={data:null};
        }

        componentWillMount() {
            let data=localStorage.getItem(name);
            this.setState({data});
        }

        render() {
            return <WrappedComponent data={this.state.data}/>
        }
    }
    return HighOrderComponent;
}
```

```jsx
import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import wrapLocalData from './wrapLocalData';
let UserName=(props) => {
    return <input type="text" defaultValue={props.data}/>
}
let Password=(props) => {
    return <input type="text" defaultValue={props.data}/>
}
let NewUserName=wrapLocalData(UserName,'username');
let NewPassword=wrapLocalData(Password,'password');
class Form extends Component{
    render() {
        return (
            <form>
                <NewUserName />
                <NewPassword/>
            </form>
        )
    }
}
ReactDOM.render(<Form/>,document.querySelector('#root'));
```

```jsx
import React,{Component} from 'react';
import ReactDOM from 'react-dom';

export default (WrappedComponent,name) => {
    class HighOrderComponent extends Component{
        constructor() {
            super();
            this.state={data:null};
        }

        componentWillMount() {
            fetch('/data.json',{
                method: 'GET'
            }).then(response => response.json()).then(data => {
                console.log(data[name]);
                this.setState({data:data[name]});
            })

        }

        render() {
            return <WrappedComponent data={this.state.data}/>
        }
    }
    return HighOrderComponent;
}

```

```jsx
import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import wrapLocalData from './wrapLocalData';
import wrapAjax from './wrapAjax';
let UserName=(props) => {
    console.log('UserName ',props);
    return <input type="text" value={props.data} />
}
let Password=(props) => {
    return <input type="text" value={props.data}/>
}
let NewUserName=wrapAjax(UserName,'username');
let NewPassword=wrapAjax(Password,'password');
class Form extends Component{
    render() {
        return (
            <form>
                <NewUserName />
                <NewPassword/>
            </form>
        )
    }
}
ReactDOM.render(<Form/>,document.querySelector('#root'));
```

```jsx
import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import wrapLocalData from './wrapLocalData';
import wrapAjax from './wrapAjax';
let UserName=(props) => {
    console.log('UserName ',props);
    return <input type="text" value={props.data} />
}
let Password=(props) => {
    return <input type="text" value={props.data}/>
}
UserName=wrapAjax(UserName);
UserName=wrapLocalData(UserName,'username');
class Form extends Component{
    render() {
        return (
            <form>
                <UserName />
            </form>
        )
    }
}
ReactDOM.render(<Form/>,document.querySelector('#root'));
```

