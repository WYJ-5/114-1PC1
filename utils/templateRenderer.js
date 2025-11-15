// ==========================================
// EJS 模板渲染器
// ==========================================
// 處理 EJS 模板的讀取與渲染

import fs from 'fs';
import ejs from 'ejs';

/**
 * 渲染 EJS 模板並發送回應
 * @param {object} res - HTTP 回應物件
 * @param {string} filePath - EJS 文件路徑
 * @param {object} data - 傳遞給模板的資料
 */
export const renderTemplate = (res, filePath, data = {}) => {
  fs.readFile('.' + filePath, 'utf8', (err, template) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end('錯誤：無法讀取模板文件 - ' + err.message);
      return;
    }

    const html = ejs.render(template, data);
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(html);
  });
};

/**
 * 渲染 404 錯誤頁面
 * @param {object} res - HTTP 回應物件
 */
export const render404 = (res) => {
  renderTemplate(res, '/index3.ejs');
};
