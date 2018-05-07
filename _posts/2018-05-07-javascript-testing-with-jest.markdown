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

### 执行所有文件结果

![执行所有文件结果](/images/jest/javascript-testing-with-jest-login.png)

### 在实际项目中，测试用例成功截图

![成功截图](/images/jest/success.jpg)

### 在实际项目中，测试用例失败截图

![失败截图](/images/jest/failure.jpg)
