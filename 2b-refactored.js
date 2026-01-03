// 2b-refactored.js
import http from 'http';
import { renderTemplate } from './utils/templateRenderer.js';
import { handleStaticFile } from './utils/staticFileHandler.js';

// 創建 HTTP 伺服器
http.createServer((req, res) => {
  const url = req.url;

  // 使用 switch 語句處理路由邏輯 [cite: 40, 42]
  switch (url) {
    case '/':
      // 路由 / 渲染 index.ejs [cite: 43]
      renderTemplate(res, '/index.ejs', { data: "您好 xxx" });
      break;
    
    case '/calculator':
      // 路由 /calculator 渲染 index2.ejs [cite: 44]
      renderTemplate(res, '/index2.ejs');
      break;

    default:
      // 其他路徑嘗試作為靜態文件處理 [cite: 45]
      handleStaticFile(res, url);
      break;
  }

}).listen(3000, () => {
  console.log('伺服器已啟動！請訪問 http://localhost:3000');
});