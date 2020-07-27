## 项目名称
    e宠商城
### 演示
    官网 https://wap.epet.com/
    上线网址: 
    *   webapp: http://47.113.84.151:6767/
    *   后台管理系统： http://47.113.84.151:6688/ 
    git仓库地址 git@github.com:gzh52001/ePet.git
### 团队与分工
    国家划水队：
    负责人：吴诗雅，成员：刘健锋、陈锦鸿
### 负责模块说明
    - 吴诗雅：
        基本框架搭建，路由跳转，配置webpack.config，上线部署项目，项目选取和项目分工
        后台管理系统：用户管理模块，模块对应的接口和数据库
        webapp: loading组件，小萌书页面（懒加载，tab跳转），登录注册，退出登录，个人中心，用户设置（上传头像，修改用户信息等等）对应的接口和数据库
    - 刘健锋：
        参与上线部署项目
        后台管理系统：订单管理模块增删改查和对应的接口和数据库
        webapp: 主页, 购物车（react-redux）和对应的接口和数据库。实现功能：主页下拉更新商品列表 背景色更换的轮播图 普通轮播图 主页头部滚动条变色 购物车增删改查 全选复选 计算价格 合计
    - 陈锦鸿：
        参与项目选取和项目分工
        后台管理系统：登录登出，路由守卫，商品管理，还有与之相对应的接口和数据库
        webapp: 分类，列表，详情页，品牌页面，搜索页面，下拉懒加载，按销量，价格升序和降序。

### 项目页面截图
（截有代表性得页面，不少于3张）
*** 首页 ***
![Image text](http://47.113.84.151:6677/uploads/xiangmu5.png) 
*** 购物车 ***
![Image text](http://47.113.84.151:6677/uploads/xiangmu6.png) 
*** 分类页 ***
![Image text](http://47.113.84.151:6677/uploads/xiangmu1.png) 
*** 列表页 ***
![Image text](http://47.113.84.151:6677/uploads/xiangmu2.png) 
*** 小萌书 ***
![Image text](http://47.113.84.151:6677/uploads/xiangmu3.png) 
*** 个人中心 ***
![Image text](http://47.113.84.151:6677/uploads/xiangmu4.png) 



### 项目目录说明
* 后台管理系统目录
```text
    ├─api      =>接口api
    ├─assets    =>静态资源
    │  ├─css
    │  └─img
    ├─components    =>基本框架（app）
    │  └─Layoutbox
    ├─pages     => 路由页面
    │  ├─Custom     => 用户管理
    │  ├─Goods      =>商品管理
    │  ├─Home       =>首页
    │  ├─Login      =>登录页
    │  └─Order      =>订单管理
    └─utils     =>封装axios
```

* webapp目录
```text
    ├─api   =>接口api
    ├─assets    =>静态资源
    ├─components    => 路由组件
    │  ├─Brand      => 品牌页面
    │  ├─detailTwo      =>详情页2
    │  └─sortList   => 分类页列表
    ├─Hook      =>自定义hook
    ├─pages     => 路由页面
    │  ├─Book   => 小萌书
    │  ├─Cart   => 购物车
    │  ├─Detail     =>详情页1
    │  ├─GoodsList  => 商品列表
    │  ├─Home       =>首页
    │  ├─Login      =>登录页
    │  ├─Mine   =>个人中心
    │  ├─Reg    =>注册
    │  ├─Search     =>搜索页面
    │  └─Sort   =>分类主页
    ├─store     =>redux
    └─utils     =>封装axios
```

### bug汇总文档：
*   陈锦鸿：
```text
    1. 在做详情页的轮播图的时候，会因为滑动的时候触发报错，但页面显示正常，在多次的查找中，发现是浏览器对某些操作行为报警告性错误，在这个时候可以在样式加上* { touch-action: pan-y;}就可以解决问题。

    2. 在做页面的时候经常会遇到数据的获取比数据渲染要慢很多的时候，如果这个时候你的代码有时遍历渲染出来的，那么这个时候就会报错，错误大概意思就是在挂载的时候没有数据，我的作法就是在渲染的时候加一个条件判断，数据是否获取到了，再进行渲染。
```

*   刘健锋：
```text
    1. onsroll事件不能拥有多个 只能只有一个 所以在做下拉更新商品列表跟表头变色刚开始冲突了 然后解决是把他们都放在一起去判断 因为两个判断条件不一样可以用在一起或者也可以用addevent这个做法去做 不过还要销毁他 不然也是没用的

    2. 购物车的增删改查  
        - 增加：在相同的商品判断他修改数量 然而他数量没加 反而只是传过去的数量 而不是两个相加 然后解决是写多一个另外的接口文件 sql语句有错 跟购物车的修改冲突了 如果改原来的 只能增加另外一个接口
		- 删除：应该没有
		- 修改：应该也没有
		- 查询：应该也没有
		- 全选复选：刚开始是判断直接在redux 然后一直做不了 只能到修改数据库了 到后面直接判断传进来的id跟redux仓库的id对比来做全选复选
        购物车最大的bug是刚开始对redux不熟悉 难用 到后面 运用的还好因为是用类组件的 而没用到函数组件的hook

    3. 后台订单 ： 
        bug就是from表单的value值不能直接用state去修改 以及value去修改 只能通过他api文档 设定好的函数组件 hook去修改value值或者清空， 还有就是订单管理的时间 一直传进不入数据库 只能在前端先截取到然后发送请求一起发送到后端才解决
```

*   吴诗雅：
    - UI框架问题
        用户设置模块用了antd-mobile其中的picker组件，原本用useState（）给其设置初始值，想要修改picker的内容时报错“read only property '0' of undefined”, 后来发现是初始化格式的问题。
        解决方案：应该用useState([])来初始化picker组件的值
    - 路由相关问题
        上线时，两级路由刷新报错‘unexpected token <’，页面空白，是静态资源管理配置问题。
        解决方案：在 `webpack.config.js` 里面 的`output`加一个属性`publicPath:'/' `，当页面再次刷新就不会报错了
        ```js
            output: {
            path: path.join(__dirname, 'dist'),
            filename: "[name].[hash:5].bundle.js", 
            publicPath:'/'
            },
        ```
    - 上线配置代理问题（nodejs）
        一开始用的是proxy中间件，后来上线之后发现无法实现代理，并且报错“proxy is not a function”，结果发现nodejs在新的版本用的是另外一个中间件来配置代理
        解决方案：用的是 `createProxyMiddleware`
        ```js
        const { createProxyMiddleware } = require('http-proxy-middleware')

        app.use('/local',createProxyMiddleware({
            target: "http://localhost:6677",
            changeOrigin: true,
            pathRewrite: {"^/local" : "/"}
        }))
        ```
