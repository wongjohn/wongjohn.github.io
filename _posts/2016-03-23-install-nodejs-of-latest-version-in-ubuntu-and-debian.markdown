---
layout: post
title:  为 Ubuntu 和 Debian 安装最新版本的 Node.js
author: 王赛
date:   2016-03-23 15:01:21 +0800
categories: tech-radar
tags:   nodejs
excerpt: 运行 Ghost 必须要安装 Node.js。但是 Ubuntu 或 Debian 的软件仓库中的 Node.js 更新较慢，甚至只能等到新版本发布才能有最新的 Node.js用。下面我们说一下从 NodeSource 提供的仓库中安装最新版本的 Node.js。
---

运行 Ghost 必须要安装 Node.js。但是 Ubuntu 或 Debian 的软件仓库中的 Node.js 更新较慢，甚至只能等到新版本发布才能有最新的 Node.js 用。下面我们说一下从 NodeSource 提供的仓库中安装最新版本的 Node.js。

支持的操作系统版本

被支持的 Ubuntu 版本：

Ubuntu 12.04 LTS (Precise Pangolin)
Ubuntu 14.04 LTS (Trusty Tahr)
Ubuntu 15.04 (Vivid Vervet)
Ubuntu 15.10 (Wily Werewolf) [For Node >= 4.2.x]
被支持的 Debian 版本：

Debian 7 (wheezy)
Debian 8 / stable (jessie)
Debian testing (stretch, aliased to jessie)
Debian unstable (sid)
安装步骤

Ghost 目前支持 0.10.*、0.12.* 和 >=4.2 <5.* (LTS) 版本的 Node.js，推荐的是 >0.10.40 (最新版本)。详细说明请看这里：http://support.ghost.org/supported-node-versions/

根据我们的安装经验，推荐安装 4.x（LTS）版本的 Node.js。

安装 Node.js v4.x

Ubuntu 系统

curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -  
sudo apt-get install -y nodejs  
Debian 系统。以 root 权限执行下列指令

curl -sL https://deb.nodesource.com/setup_4.x | bash -  
apt-get install -y nodejs  
安装 Node.js v0.10

Ubuntu 系统

curl -sL https://deb.nodesource.com/setup_0.10 | sudo -E bash -  
sudo apt-get install -y nodejs  
Debian 系统。以 root 权限执行下列指令

curl -sL https://deb.nodesource.com/setup_0.10 | bash -  
apt-get install -y nodejs  
安装 Node.js v0.12

Ubuntu 系统

curl -sL https://deb.nodesource.com/setup_0.12 | sudo -E bash -  
sudo apt-get install -y nodejs  
Debian 系统。以 root 权限执行下列指令

curl -sL https://deb.nodesource.com/setup_0.12 | bash -  
apt-get install -y nodejs  
安装 Node.js v5.x

注意：v5.x 的 Node.js 不被 Ghost 支持，以下安装介绍只为了完整介绍 Node.js 各个版本的安装！

Ubuntu 系统

curl -sL https://deb.nodesource.com/setup_5.x | sudo -E bash -  
sudo apt-get install -y nodejs  
Debian 系统。以 root 权限执行下列指令

curl -sL https://deb.nodesource.com/setup_5.x | bash -  
apt-get install -y nodejs  
