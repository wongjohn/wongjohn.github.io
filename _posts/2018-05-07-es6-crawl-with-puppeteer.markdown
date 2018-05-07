---
layout:     post
title:      使用Puppeteer爬取《ECMAScript 6 入门》
author:     王士江
date:       2018-05-07 16:47:00 +0800
categories: notes
tags:       Puppeteer Crawl
mediaImage: /images/puppeteer/es6-crawl-with-puppeteer.png
excerpt: 使用Puppeteer爬取“阮一峰”开源电子书《ECMAScript 6 入门》（电子书地址：http://es6.ruanyifeng.com/）。
---

使用[Puppeteer](https://github.com/GoogleChrome/puppeteer)爬取“阮一峰”开源电子书《ECMAScript 6 入门》（电子书地址：[http://es6.ruanyifeng.com/](http://es6.ruanyifeng.com/)）。

示例代码的仓库地址[请点击这里](https://github.com/wongjohn/es6-crawl-with-puppeteer)。

## 示例代码的安装、执行

```bash
# 建议使用cnpm进行安装，puppeteer需要下载Chromium (~170Mb Mac, ~282Mb Linux, ~280Mb Win)
sudo npm install -g cnpm

cnpm install

npm start
```

### 代码说明

{% highlight javascript %}
/**
 * 使用Puppeteer爬取“阮一峰”开源电子书《ECMAScript 6 入门》（电子书地址：http://es6.ruanyifeng.com/）。
 */
const puppeteer = require('puppeteer');

(async() => {
    // 1、打开 浏览器
    const browser = await puppeteer.launch();
    // 2、打开 新页面
    let page = await browser.newPage();
    // 3、网址跳转到 电子书页面
    await page.goto('http://es6.ruanyifeng.com', {waitUtil: 'networkidle0'});
    await page.waitFor(2000);
    // 4、所有文章的链接地址
    let aTags = await page.evaluate(() => {
        let as = [...document.querySelectorAll('ol li a')];
        return as.map((a) =>{
            return {
                href: a.href.trim(),
                name: a.text
            };
        });
    });
    // 5、访问所有的文章，然后生成PDF
    for(let i = 0; i < aTags.length; i++) {
        page = await browser.newPage();
        await page.setViewport({width: 1200, height: 800});

        let a = aTags[i];
        await page.goto(a.href, {waitUtil: 'networkidle0'});
        await page.waitFor(5000);

        await page.pdf({path: `./docs/${i + '.' + a.name}.pdf`});

        await page.close();
    }

    // 6、关闭浏览器
    await browser.close();
})();
{% endhighlight %}

### 执行结果截图

![执行结果](/images/puppeteer/es6-crawl-with-puppeteer.png)


