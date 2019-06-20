# 这是一个NB的项目

## 牛不牛比，用心感受，每一行代码中的牙签压抑

###制作顶部滑动条的坑

###初始化滑动条的时候，导入的mui.js,但是，控制台出错：
经过合理的推测，觉得应该是mui.js用到了"caller","callee", and "arguments" 东西，但是
webpack打包好的bundle.js中，默认是启用严格模式的，所以，这两者冲突了；
+ 解决方案：1.把mui.js中的非严格模式的代码改掉；但是不现实；
+ 2.把webpack打包时候的严格模式禁用掉
+最终使用了 babel-plugin-transform-remove-strict-mode插件

## tabbar按钮无法正常工作，原因是mui.js样式有冲突，需要把每个tabbar按钮的样式中
"mui-tab-item"重新改下名字