// utils/staticFileHandler.js
import fs from 'fs';
import path from 'path';
import { getContentType } from './mimeTypes.js';
import { render404 } from './templateRenderer.js';

/**
 * 讀取並發送靜態文件 [cite: 31, 32]
 * @param {object} res - HTTP 回應物件
 * @param {string} filePath - 靜態文件路徑
 */
export function handleStaticFile(res, filePath) {
  const staticFilePath = '.' + filePath;
  const extname = path.extname(filePath);

  fs.readFile(staticFilePath, (err, content) => {
    if (err) {
      // 若文件不存在，自動呼叫 render404() [cite: 34]
      render404(res);
    } else {
      // 根據副檔名設定正確的 Content-Type [cite: 33]
      const contentType = getContentType(extname);
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    }
  });
}