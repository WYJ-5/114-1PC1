// utils/templateRenderer.js
import fs from 'fs';
import ejs from 'ejs';

/**
 * 渲染 EJS 模板 [cite: 19]
 * @param {object} res - HTTP 回應物件
 * @param {string} filePath - EJS 檔案路徑
 * @param {object} data - 傳遞給模板的資料（預設為空物件） [cite: 24]
 */
export function renderTemplate(res, filePath, data = {}) {
  fs.readFile('.' + filePath, 'utf8', (err, template) => {
    if (err) {
      // 檔案讀取失敗時回傳 500 錯誤 [cite: 26]
      res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end('錯誤：無法讀取模板文件 - ' + err.message);
      return;
    }

    try {
      const html = ejs.render(template, data);
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(html);
    } catch (renderErr) {
      res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end('渲染錯誤：' + renderErr.message);
    }
  });
}

/**
 * 專門處理 404 錯誤頁面 [cite: 25]
 * @param {object} res - HTTP 回應物件
 */
export function render404(res) {
  // 呼叫 renderTemplate 渲染 index3.ejs 作為 404 頁面
  renderTemplate(res, '/index3.ejs');
}