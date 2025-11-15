// ==========================================
// 靜態文件處理器
// ==========================================
// 處理靜態資源（CSS、JS、圖片等）的讀取與傳送

import fs from 'fs';
import path from 'path';
import { getContentType } from './mimeTypes.js';
import { render404 } from './templateRenderer.js';

/**
 * 處理靜態文件請求
 * @param {object} res - HTTP 回應物件
 * @param {string} filePath - 靜態文件路徑
 */
export const handleStaticFile = (res, filePath) => {
  const staticFilePath = '.' + filePath;
  const extname = path.extname(filePath);
  const contentType = getContentType(extname);

  fs.readFile(staticFilePath, (err, content) => {
    if (err) {
      // 文件不存在，顯示 404 頁面
      render404(res);
    } else {
      // 文件讀取成功，發送內容
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    }
  });
};
