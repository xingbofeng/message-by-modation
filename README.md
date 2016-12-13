# getShell-by-modation
本项目为基于[generator-modation](https://github.com/knownsec/generator-modation)的简易留言板应用。

本项目前端基于React & Redux，服务端基于Apache CouchDB。
## 使用方法
```
git clone https://github.com/xingbofeng/message-by-modation.git
cd getShell-by-modation
npm install
npm start
sudo apt-get install couchdb
npm install -g pouchdb-server
pouchdb-server --port 5984
```

Then, go to http://127.0.0.1:8000/ and enjoy it.
Besides,you can also go to http://127.0.0.1:5984/ see the server.
## ToDoList
- [x] React & Redux
- [x] Ant Design
- [ ] 样式调整
- [x] websocket
- [x] Hapi
- [ ] 部署到服务器
- [x] 使用PouchDB同步数据
- [x] 用户可回复留言
- [x] 通过Gravatar,输入邮箱获取头像
- [x] 单元测试


## Star
如果你喜欢本项目，那么求一个:star:

如果您有更好的建议，那么求一个Pull Request
## Licence
MIT
