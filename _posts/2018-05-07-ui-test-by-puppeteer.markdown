---
layout:     post
title:      使用Puppeteer进行用户界面测试
author:     王士江
date:       2018-05-07 11:02:00 +0800
categories: notes
tags:       Puppeteer UI Test
mediaImage: /images/puppeteer/ui-test-by-puppeteer-running.png
excerpt: Puppeteer是Chrome官方团队进行维护的一个Node库，通过提供了一组高级API，可以让用户界面测试变得很轻松。
---

[Puppeteer](https://github.com/GoogleChrome/puppeteer)是由[Google Chrome](https://github.com/GoogleChrome)
官方团队进行维护的一个Node库，提供了一组高级[API](https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md)，
通过[DevTools协议](https://chromedevtools.github.io/devtools-protocol/)控制无界面Chrome
（headless chrome, 也就是无UI界面的chrome）。

简而言之，Puppeteer可以让用户界面测试变得很轻松。

## 什么是Puppeteer？

[Puppeteer](https://github.com/GoogleChrome/puppeteer)是一个用户界面自动化工具。
它组合了"Chrome无界面模式"和"DevTools协议"，通过提供一个更上层的API，让用户界面测试自动化变得轻而易举。

[无界面Chrome](https://developers.google.com/web/updates/2017/04/headless-chrome)是没有UI界面的Chrome。
它允许你从浏览器之外的环境（即命令行）与Chromium进行交互。

## 示例代码

我们通过一个示例，来探讨Puppeteer的使用方法：使用Puppeteer来访问[百度](https://www.baidu.com)，
[源代码仓库地址请点击这里](https://github.com/wongjohn/ui-test-by-puppeteer)。

### 示例代码的安装、执行

在安装依赖、执行示例代码之前，请先安装最新版的[Node.js](https://nodejs.org/)。

```bash
# 建议使用cnpm进行安装，puppeteer需要下载Chromium (~170Mb Mac, ~282Mb Linux, ~280Mb Win)
sudo npm install -g cnpm

cnpm install

# 执行
npm start
# or npm run test
```

### 执行结果——无头

![无头浏览执行结果](/images/puppeteer/ui-test-by-puppeteer-headless.png)

### 执行结果——有头

![无头浏览执行结果](/images/puppeteer/ui-test-by-puppeteer-running.png)

### 代码说明


{% highlight javascript %}
/**
 * 下面是使用 puppeteer 的一个例子
 */
const puppeteer = require('puppeteer');

(async() => {
    // 1、打开 浏览器
    const browser = await puppeteer.launch({headless: true});
    // 2、打开 新页面
    const page = await browser.newPage();
    // 3、网址跳转到 百度
    await page.goto('https://www.baidu.com');
    // 4、在 百度的搜索框 输入 Puppeteer
    await page.type('#kw', 'Puppeteer', {delay: 50});
    // 5、点击 "百度一下" 按钮
    await page.click('#su');

    // 6、等待 1秒钟，等待百度传输结果
    await page.waitFor(1000);

    // 7、抽取所有结果的"标题"和"链接"
    const links = await page.evaluate(() => {
        const anchors = Array.from(document.querySelectorAll('.c-container h3.t a'));
        return anchors.map(anchor => anchor.textContent);
    });

    // 8、期待有结果
    console.log(links.join('\n'));

    // 9、关闭浏览器
    await browser.close();
})();

{% endhighlight %}

我们首先加载`puppeteer`模块——`require`是[Node.js](https://nodejs.org/)中用于加载模块的关键字。

然后我们将加载好的`puppeteer`模块放到名称为`puppeteer`的常量中——
`const`是[ES6](http://es6.ruanyifeng.com/)中用于定义`常量`的关键字

关于ES6，阮一峰写了一本免费、开源的电子书，[点击这里查看](http://es6.ruanyifeng.com/)。

{% highlight javascript %}
/**
 * 下面是使用 puppeteer 的一个例子
 */
const puppeteer = require('puppeteer');
{% endhighlight %}

接下来是一个匿名的`立即执行函数`（IIFE，Immediately Invoked Function Expression），里面是我们需要执行的测试代码，
[`async`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)
是`ES7`中用于异步操作的关键字，表示内部是异步操作，返回一个异步操作的结果。

关于`async`和`await`的更详细的内容，参见阮一峰的开源电子书[《ECMAScript 6 入门》](http://es6.ruanyifeng.com/#docs/async)
（电子书地址：[http://es6.ruanyifeng.com/](http://es6.ruanyifeng.com/)）

{% highlight javascript %}
(async() => {

})();

{% endhighlight %}

#### 1、打开 浏览器

{% highlight javascript %}
// 1、打开 浏览器
const browser = await puppeteer.launch();
{% endhighlight %}

我们通过`puppeteer`模块提供的`launch`方法，打开一个浏览器。

在打开浏览器的同时，我们可以提供一些配置项，比如不使用无头浏览器（`headless`设置为`false`）。

[`await`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/await)
是`ES7`中用于异步操作的关键字，表示等待异步操作结束、得到返回的结果，`await`只能用在异步函数`async function`中。

`打开浏览器`对`Puppeteer`来说是一个异步操作（返回值是`Promise`），
[Puppeteer的其他API](https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md)也是类似处理。

我们为了模拟人的输入方式、或者为了查看方便，我们还可以设置`slowMo`为`true`，这样浏览器会模拟人的输入方式、缓慢地进行输入。

{% highlight javascript %}
// 1、打开 浏览器
const browser = await puppeteer.launch({headless: true, slowMo: true});
{% endhighlight %}

#### 2、打开 新页面

{% highlight javascript %}
// 2、打开 新页面
const page = await browser.newPage();
{% endhighlight %}

#### 3、网址跳转到 百度

{% highlight javascript %}
// 3、网址跳转到 百度
await page.goto('https://www.baidu.com');
{% endhighlight %}

#### 4、在 百度的搜索框 输入 Puppeteer

{% highlight javascript %}
// 4、在 百度的搜索框 输入 Puppeteer
await page.type('#kw', 'Puppeteer', {delay: 50});
{% endhighlight %}

百度的关键字"输入框"，是一个`id`属性为`kw`的'Input'，我们要在里面输入`Puppeteer`字符串，
为了模拟人类的输入效果，各个字符之间、我们加了50毫秒的延迟。

{% highlight html %}
<!-- 百度的搜索框，是一个`id`属性为`kw`的'Input' -->
<input id="kw" name="wd" class="s_ipt" value="" maxlength="255" autocomplete="off">
{% endhighlight %}

#### 5、点击 "百度一下" 按钮

{% highlight javascript %}
// 5、点击 "百度一下" 按钮
await page.click('#su');
{% endhighlight %}

百度的"百度一下"按钮，是一个`id`属性为`su`的'Submit Button'。

{% highlight html %}
<!-- 百度的"百度一下"按钮，是一个`id`属性为`su`的'Submit Button'。 -->
<input type="submit" id="su" value="百度一下" class="bg s_btn">
{% endhighlight %}

#### 6、等待 1秒钟，等待百度传输结果

{% highlight javascript %}
// 6、等待 1秒钟，等待百度传输结果
await page.waitFor(1000);
{% endhighlight %}

由于"根据关键字进行查询"需要花一段时间，所以我们等1秒（1s，也就是1000毫秒，1000 ms）。

#### 7、抽取所有结果的"标题"和"链接"

{% highlight javascript %}
// 7、抽取所有结果的"标题"和"链接"
const links = await page.evaluate(() => {
    const anchors = Array.from(document.querySelectorAll('.c-container h3.t a'));
    return anchors.map(anchor => anchor.textContent);
});
{% endhighlight %}

百度的搜索结果，是放在样式类为`c-container`的`Div`中，我们想要的是结果是——结果的标题——
这样我们只需要找到样式类为`t`的`h3`标签、然后找到里面的`a`标签，取它的文本内容。

![百度搜索结果截图](/images/puppeteer/baidu-screenshot.png)

#### 8、期待有结果

{% highlight javascript %}
// 8、期待有结果
console.log(links.join('\n'));
{% endhighlight %}

#### 9、关闭浏览器

{% highlight javascript %}
// 9、关闭浏览器
await browser.close();
{% endhighlight %}

更多Puppeteer的API，请访问[Puppeteer官方API地址](https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md)。

![API 结构](/images/puppeteer/puppeteer-api-hierarchy.png)