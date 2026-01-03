// 從 2b.js 抽取的 MIME 類型映射表
const contentTypes = {
  '.html': 'text/html; charset=utf-8',
  '.ejs': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

/**
 * 根據副檔名回傳對應的 MIME 類型 [cite: 13]
 * @param {string} extname - 檔案副檔名
 * @returns {string} - MIME 類型字符串
 */
export function getContentType(extname) {
  return contentTypes[extname] || 'text/plain';
}