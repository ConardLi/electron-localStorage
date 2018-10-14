# electron-localStorage
在eletron主线程也能使用的localStorage


electron主进程中是不能获取到浏览器的window对象的，所以我们不能像在渲染进程中一样使用浏览器为我们提供的localstorage对象。

但是主进程中有可能也需要这样的需求，比如我们在本地存储了当前的环境（dev/beta/prod），主进程需要根据不同的开发环境来load不同的url。

于是手动封装了一个可以在主进程中调用的localstorage。

# 1.安装

```
npm install electron-localstorage
```
# 2.引用：
```
const storage = require('electron-localstorage');
```

# 3.使用

## 3.1完美支持所有localStorage的所有api：

存储数据
```
storage.setItem(`myCat`, `Tom`);
```
获取数据
```
let cat = storage.getItem(`myCat`);
```
移除某个数据
```
storage.removeItem(`myCat`);
```
移除所有数据
```
storage.clear();
```

## 3.2 扩展方法

获取当前所有存储的项
```
storage.getAll();
```
自定义存储路径
```
storage.setStoragePath(path.join(__dirname,'test.json'));
```
获取当前数据存储路径
```
storage.getStoragePath();
```

# 4.示例程序

https://github.com/ConardLi/electron-localstorage-demo
