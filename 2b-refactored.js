// ==========================================
// Node.js + EJS 網頁伺服器 (重構版)
// ==========================================
// 功能說明：
// - 專注於路由邏輯
// - 使用模組化設計，將共同邏輯抽取到獨立模組
// ==========================================

import http from 'http';
import { renderTemplate } from './utils/templateRenderer.js';
import { handleStaticFile } from './utils/staticFileHandler.js';

// ==========================================
// 創建 HTTP 伺服器
// ==========================================

http.createServer((req, res) => {

  // ==========================================
  // 路由設定 - 使用 Switch 判斷不同路由
  // ==========================================

  switch (req.url) {
    case '/':
      // 首頁：渲染 index.ejs，傳遞歡迎訊息
      renderTemplate(res, '/index.ejs', { message: '您好 xxx' });
      break;

    case '/calculator':
      // 計算器頁面：渲染 index2.ejs
      renderTemplate(res, '/index2.ejs');
      break;

    default:
      // 其他路徑：嘗試當作靜態文件處理
      // 如果文件不存在，會自動顯示 404 頁面
      handleStaticFile(res, req.url);
      break;
  }

}).listen(3000, () => {
  console.log('伺服器已啟動！請訪問 http://localhost:3000');
  console.log('可用路由：');
  console.log('  - http://localhost:3000/');
  console.log('  - http://localhost:3000/calculator');
  console.log('  - 其他路徑將顯示 404 錯誤頁面');
});
