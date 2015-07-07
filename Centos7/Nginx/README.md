#为PHP、Python、NodeJS开发者打造的Docker快速部署测试服务器镜像
---

为一些Web开发者打造的服务器部署镜像，主要面向PHP、Python、NodeJS开发者，集成了composer，PHP常用框架的支持，以及pip、mysql、mongodb等服务。主要面向测试环境，方便部署服务器。并且可以自由地定制版本，在测试环境通过后，建立安全基础设施后，可部署上线。
##0x01 Docker简单介绍
###利用Docker的场景.
1.在传统开发及测试当中，开发需要和测试进行一定的沟通，从而争取开发环境与测试环境的统一，但不能保证完全相同，以及还有服务器生产环境。版本配置等的不同,导致了一些部署上的问题。利用Docker，开发部门只需打包好镜像，测试及运维部门通过Docker快速部署，可以规定一些基础服务的版本等，只需要几分钟可以配置好测试及运维环境。

2.沙箱可以实现轻型隔离，多个容器间不会相互影响。

3.大规模集群部署。

4.Docker可以自动化打包和部署任何应用，方便地创建一个轻量级私有PaaS云。

###什么是Docker？
[Docker](https://www.docker.com/)是一个开放源代码软件专案，在软件容器下自动布署应用程序，借此在Linux操作系统上，提供了一个额外的软件抽象层，以及操作系统层虚拟化的自动管理机制。
###能用Docker做什么？
集群测试环境、大规模Web部署、数据库集群、持续部署系统、私有PaaS技术，面向服务的体系结构……

+ Docker可以应用在一些[集群部署](http://www.infoq.com/cn/articles/tencent-millions-scale-docker-application-practice)的场景，方便地构建[集群](http://www.infoq.com/cn/articles/large-scale-docker-cluster-practise-experience-share)架构。
+ [私有PaaS技术](http://qing.blog.sina.com.cn/2294942122/88ca09aa33003ydp.html)
+ 而对于一些中小型的创业企业或者互联网公司的开发者来说，一个稳定的[测试环境](http://www.xiaomastack.com/2015/04/05/docker-dev-test-deploy/)是重要的，尤其是开发部门和测试、运维部门的配合方面，开发部门只需维护一个[Dockerfile](https://docs.docker.com/reference/builder/)，可以统一开发环境并减低运维团队负担。

###Docker有什么优势？
[Docker之二三事](http://www.xiaozhou.net/something-about-docker-2014-05-30.html)
###Docker如何方便地入门？
+ [Docker入门与实践](https://www.gitbook.com/book/yeasy/docker_practice/details)
+ [Docker入门实战](http://yuedu.baidu.com/ebook/d817967416fc700abb68fca1)
+ [官方文档](https://docs.docker.com/)
+ [第一本Docker书](http://product.dangdang.com/23623098.html)
+ Docker几个概念要了解，镜像、容器、仓库
+ [「开发工具，开发模式」Docker 入门教程](http://www.html-js.com/qa/Docker-tutorial)

###对于PHP、Python、NodeJS开发及测试部门的部署场景。

##0x02 如何部署本镜像
###版本说明
基于CentOS7，~~其他版本的镜像在[]()。~~

+ Ubuntu版本的Dockerfile在[Github]()，镜像构建仓库在紧急测试中。

###部署说明
1.安装并测试Docker，可以参考[官方文档](https://docs.docker.com/installation/ubuntulinux/)。或者是《Docker入门与实践》[安装](http://yeasy.gitbooks.io/docker_practice/content/install/index.html)一节。

2.通过拉取镜像，配置服务。

	sudo docker pull index.alauda.cn/dubuqingfeng/centos7-php-python-nodejs

3.运行容器

	sudo docker run -t -i index.alauda.cn/dubuqingfeng/centos7-php-python-nodejs /bin/bash
	root@moyishizhe:/#

4.进入容器

	sudo docker attach

5.测试应用

详细测试可在*容器使用*一节

6.测试完毕后删除容器

	sudo docker rm  容器id

7.删除镜像

可以使用 `docker rmi `命令。注意 `docker rm `命令是移除容器。

	sudo docker rmi index.alauda.cn/dubuqingfeng/centos7-php-python-nodejs

**注意**：在删除镜像之前要先用 `docker rm `删掉依赖于这个镜像的所有容器。

###各组件版本说明
+ PHP：
+ Python：
+ Django：
+ NodeJS：
+ npm：
+ Composer：
+ MySql：
+ Mongodb：
+ pip：

其他版本的Dockerfile在[这里]()，如果想自由定制版本，参考**自由定制化**一节。
##0x03 容器使用
###PHP
	VOLUME ["/usr/src/app"]

	EXPOSE 4000

	WORKDIR /usr/src/app
###Python
###NodeJS
##0x04 镜像说明
###说明
本镜像是为了PHP、Python、NodeJS开发者建立的服务器快速部署，适用于开发部门测试好以后，提交给测试部门。

DevOps
###本镜像基础
本镜像基于Centos7
###自由定制化
可以自由定制一些镜像，例如：

+ [Centos7-NodeJS]()
+ [Centos7-NodeJS]() 
+ [Centos7-NodeJS]()
+ [Centos7-NodeJS]()
+ [Centos7-NodeJS]()
+ [Centos7-NodeJS]()
+ [Centos7-NodeJS]()
+ [Centos7-NodeJS]()

####自由定制版本
###打包镜像
####在此镜像基础上如何进一步打包镜像？

1.根据本镜像的Dockerfile，维护自己的Dockerfile。参考官方文档的[Dockerfile一节]()。

2.拉取本镜像，提交到自己的仓库里。

3.

####导出或者转储镜像
sudo docker save -o ubuntu_14.04.tar ubuntu:14.04

###本地化虚拟环境
Vagrant

##0x05 安全
##0x06 反馈
###提交反馈
如有问题及建议，请提交issue到[Github](https://github.com/dubuqingfeng/Docker-Web-Images)。或者发送email到1135326346@qq.com。
###协议

###更新记录
v1.0.0

+ 建立Dockerfile
+ 

###说明
本镜像是在近些天的学习中构建的，为了方便国内NodeJS开发者进行服务器的快速部署，同时尽可能将文档写得易懂，照顾基础不是很好的进行理解，在学习的过程中不免会有一些考虑不周到的方面，希望继续交流。

关于这个镜像的其他方面，还有一些问题，例如安全，自动化运维。。这里进行一些思考，并且做了一些实践。

在安全方面，因为Docker是一种沙箱机制。

Fig

##0x07 参考资料
[](https://blog.mikuru.tw/archives/429)
[使用 Docker 部署 Python 应用的一些经验总结](http://codecloud.net/docker-python-3828.html)
http://odewahn.github.io/docker-jumpstart/example.html
(Docker创建centos的LNMP镜像)[http://www.vckai.com/p/29]
()[http://www.widuu.com/archives/07/1072.html]
[http://best33.com/144.moe]
[http://www.sel.zju.edu.cn/?p=296]
https://www.likol.idv.tw/deploy-gitlab-with-docker/
http://www.jianshu.com/p/a2fec33c29b2
https://cnodejs.org/topic/53f494d9bbdaa79d519c9a4a
http://www.ithome.com.tw/news/91848
http://www.aixchina.net/club/thread-123391-1-1.html
http://snoopyxdy.blog.163.com/blog/static/601174402014720113318508/
http://codecloud.net/docker-command-4152.html
