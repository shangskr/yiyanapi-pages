const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const app = express();
const yiyanData = fs.readFileSync('yiyan.txt', 'utf-8').split(/\r\n|\n/);

const logger = morgan('dev');
const publicPath = path.join(__dirname, 'public');
app.get('/api/yiyan', (req, res) => {
  try {
    const randomIndex = Math.floor(Math.random() * yiyanData.length);
    const randomYiyan = yiyanData[randomIndex];

    console.log(`${new Date().toLocaleString()} - ${req.method} ${req.originalUrl} - ${req.headers['user-agent']} - 请求成功`);
    res.send(randomYiyan);
  } catch (error) {
    console.error(`${new Date().toLocaleString()} - ${req.method} ${req.originalUrl} - ${req.headers['user-agent']} - 请求失败: ${error.message}`);
    res.status(500).send('服务器内部错误');
  }
});
app.post('/api/yiyan', (req, res) => {
  try {
    const body = req.body;
    console.log(`${new Date().toLocaleString()} - ${req.method} ${req.originalUrl} - ${req.headers['user-agent']} - 请求成功，body: ${JSON.stringify(body)}`);
    res.send(body);
  } catch (error) {
    console.error(`${new Date().toLocaleString()} - ${req.method} ${req.originalUrl} - ${req.headers['user-agent']} - 请求失败: ${error.message}`);
    res.status(500).send('服务器内部错误');
  }
});
app.get('/', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

// 将 public 文件夹作为静态资源目录
app.use(express.static(publicPath));
app.use(logger);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`一言api启动成功`);
});