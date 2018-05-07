---
layout:     post
title:      使用Jest进行JavaScript测试
author:     王士江
date:       2018-05-07 15:12:00 +0800
categories: notes
tags:       Jest JavaScript Test
mediaImage: /images/jest/javascript-testing-with-jest-demo.png
excerpt: Jest是一个JavaScript测试框架，由Facebook用来测试所有JavaScript代码。
---

[Jest](https://facebook.github.io/jest/)是一个JavaScript测试框架，由Facebook用来测试所有JavaScript代码。

示例代码的仓库地址[请点击这里](https://github.com/wongjohn/javascript-testing-with-jest)。

## 示例代码的安装、执行

```bash
# 建议使用cnpm进行安装，puppeteer需要下载Chromium (~170Mb Mac, ~282Mb Linux, ~280Mb Win)
sudo npm install -g cnpm jest

cnpm install

npm start
# npm run test
# jest
```

### 执行`demo.test.js`文件结果

![DEMO执行结果](/images/jest/javascript-testing-with-jest-demo.png)

{% highlight javascript %}
/**
 * 下面是 Jest 的一个"测试用例"的例子
 * test方法是Jest注入的方法，使用它定义一个"测试用例"
 * （1）第一个参数，是测试用例的说明
 * （2）第二个参数，是测试用例的代码实现
 *     【注意：
 *          如果方法的"返回值"是一个"Promise"——比如使用await关键字修饰，
 *          Jest会等待当前的测试用例执行完毕，
 *          再继续执行其他的测试用例。
 *      】
 */
test('期待"1 + 2"的结果为"3"', () => {
    expect(1 + 2).toBe(3);
});

/**
 * 下面是使用 puppeteer 的一个例子
 */
const puppeteer = require('puppeteer');
// 第一个参数是"测试用例"说明，第二个是测试用例代码实现
test('测试使用百度检索搜索"Puppeteer"关键字', async() => {
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
    expect(links.length).not.toBe(0);
    expect(links.length).toBeTruthy();

    // 9、关闭浏览器
    await browser.close();
});
{% endhighlight %}


#### 代码说明

我们先看第一个最简单的例子，例子中的`test`方法，是Jest在代码执行之前`注入`进去——我们不必引用、直接使用。

{% highlight javascript %}
/**
 * 下面是 Jest 的一个"测试用例"的例子
 * test方法是Jest注入的方法，使用它定义一个"测试用例"
 * （1）第一个参数，是测试用例的说明
 * （2）第二个参数，是测试用例的代码实现
 *     【注意：
 *          如果方法的"返回值"是一个"Promise"——比如使用await关键字修饰，
 *          Jest会等待当前的测试用例执行完毕，
 *          再继续执行其他的测试用例。
 *      】
 */
test('期待"1 + 2"的结果为"3"', () => {
    expect(1 + 2).toBe(3);
});
{% endhighlight %}

第一个参数是字符串，用来填写当前`测试用例`的说明。

第二个参数是一个函数，用来填写我们要执行的测试代码。

代码里面的`expect`函数，传入的`参数`是真实的结果，
后面的`toBe(3)`是`匹配`（[Matcher](https://facebook.github.io/jest/docs/en/using-matchers.html)）,
表示我们最终`期待`的`结果`是数字`3`，其他的匹配请参见[Jest官方文档](https://facebook.github.io/jest/docs/en/using-matchers.html)）。

第二个测试用例，我们使用了上一篇关于`Puppeteer`文章中的示例，将其改造成一个`Jest`的测试用例。

### 执行所有文件结果

![执行所有文件结果](/images/jest/javascript-testing-with-jest-login.png)

这里又添加了另一个例子：

{% highlight javascript %}
/**
 * 测试登录、退出
 * 下面是组合Jest、Puppeteer进行"功能测试"的例子
 */
jest.setTimeout(30000);/*超时默认是5000(5秒)*/

const puppeteer = require('puppeteer');
const alphaConfig = {
    host:'https://dev.alphalawyer.cn/',
    userName:'USER_NAME',
    password:'PASSWORD'
};

let browser, page;
// 在所有"测试用例"之前执行，进行"资源创建"等等操作
beforeAll(async () => {
    browser = await puppeteer.launch(); // 打开浏览器
    page = await browser.newPage(); // 打开新页面
    await page;
});
// 在所有"测试用例"之后执行，进行"资源销毁"等等操作
afterAll(async () => {
    await browser.close(); // 关闭浏览器
});

test('测试登录', async () => {
    // 进入密码登录页面
    await page.goto(`${alphaConfig.host}#/login/password`);

    // 等待表单出现
    await page.waitForSelector('form[name="loginForm"]');
    await page.type('input[name="username"]', alphaConfig.userName, {delay: 50}); // 输入用户名
    await page.type('input[name="account_password"]', alphaConfig.password, {delay: 50}); // 输入密码

    const navigationPromise = page.waitForNavigation(); // 点击 "进入Alpha" 按钮，期待会有一次页面跳转
    await page.click('.login-button'); // 点击 "进入Alpha" 按钮
    await navigationPromise; // 期待页面跳转结束

    expect(page.url()).toBe(`${alphaConfig.host}#/app/my/task`); // 页面应该会跳转到"我的"=>"任务"页面
    await page.waitForNavigation();// 页面URL意外地有另一次跳转
    await expect(page.url()).toBe(`${alphaConfig.host}#/app/my/task/list`); // 页面跳转到"我的"=>"任务"列表页面
});

test('测试退出', async () => {
    await page.click('.v3-header-nav .tip-setting span'); // 继续点击页面右上角的"设置"按钮
    await page.waitForSelector('.getSettingBlock', {visible: true}); // 等待 弹出窗 弹出来

    const navigationPromise = page.waitForNavigation(); // 点击 "退出" 按钮，期待会有一次页面跳转
    await page.click('.getSettingBlock .ns-popover-tooltip li:nth-child(6)'); // 点击 "退出" 按钮
    await navigationPromise; // 等待页面跳转结束

    await expect(page.url()).toBe(`${alphaConfig.host}#/login/wechat`); // 期待跳转到"登录"页面
});
{% endhighlight %}

这是一个稍微复杂的用例，我们用来测试"登录、退出"。

`beforeAll`和`afterAll`是Jest提供的另一套[API](https://facebook.github.io/jest/docs/en/setup-teardown.html)，
供我们进行资源的初始化和销毁。

其中，`beforeAll`是在`所有测试用例之前`执行一次操作的代码，我们会经常在这里定义一些公用的资源，比如这里的`browser`和`page`。

`afterAll`是在`所有测试用例之后`执行一次操作的代码，我们会经常在这里销毁一些资源，比如这里的关闭`browser`。

Jest默认的单元测试的`超时时间`是5000毫秒（5秒），超过5秒就会报错，而在实际测试过程中，由于页面加载等等都需要花一定时间，
所以我们这里设置`超时时间`为30000毫秒（30秒）或者更长。

{% highlight javascript %}
jest.setTimeout(30000);/*超时默认是5000(5秒)*/
{% endhighlight %}

### 在实际项目中，测试用例成功截图

![成功截图](/images/jest/success.jpg)

### 在实际项目中，测试用例失败截图

![失败截图](/images/jest/failure.jpg)
