---
layout:     post
title:      iOS下input无法focus、不能打开软键盘问题处理
author:     王士江
date:       2018-05-09 15:30:00 +0800
categories: notes
tags:       iOS keyboard webview input
excerpt:
---

让对应的input获得focus状态，唤起软键盘，方便用户直接输入，是比较常见的场景，而在iOS的移动端Web页中，这一操作跟PC浏览器是有区别的。

今天在项目中，遇到了一个问题：在Chrome的PC浏览器中，我打开手机模拟界面、进行页面开发，其中有一段代码，是用户在填写多项筛选条件
时，允许用户点击`筛选区域`（一个`div`）、让小小的`输入区域`（一个有`contenteditable`属性的`span`）也能够进行编辑。

响应筛选区域的点击事件的代码如下：

{% highlight javascript %}
function handleClick (event) {
    let input = that.$refs['input-search']

    setTimeout(function () {
        input.focus()
        commonService.setCaretPosition(input)
    }, 100)
}
{% endhighlight %}

结果是，在Chrome的PC浏览器的模拟器中是可以的，但是放到我的手机（iOS 11.1）中的微信浏览器、移动Chrome中，
无论怎么点击`筛选区域`，`输入区域`就是没有办法聚焦(focus)、弹不出软键盘。

然后我使用[weinre](http://people.apache.org/~pmuellr/weinre/docs/latest/Home.html)对移动浏览器中的页面进行调试器，
结果再怎么调用document.querySelector('.input-search').focus()，都无法聚焦到`输入区域`、弹不出软键盘。

后来发现，这里涉及到了 iOS WebView 的一种默认安全机制。在 UIWebView 中有一个属性：

{% highlight object-c %}
@property (nonatomic) BOOL keyboardDisplayRequiresUserAction NS_AVAILABLE_IOS(6_0); // default is YES
{% endhighlight %}

这个属性默认是 YES，也就是说键盘的出现必须要用户交互。那我们就知道原因了，在setTimeout里面执行focus，
执行环境并不是用户触发的，因此 focus 被拦截掉了。

然后解决办法就清晰了，把`input.focus()`放在setTimeout外面执行就可以了。

{% highlight javascript %}
function handleClick (event) {
    let input = that.$refs['input-search']
    input.focus()

    setTimeout(function () {
        commonService.setCaretPosition(input)
    }, 100)
}
{% endhighlight %}

![项目中的使用场景截图](/images/problems/ios-webview-cant-open-keyboard.jpeg)
