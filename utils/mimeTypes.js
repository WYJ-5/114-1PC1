// ==========================================
// MIME 類型映射表
// ==========================================
// 定義各種文件類型對應的 Content-Type

export const contentTypes = {
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
 * 根據副檔名取得對應的 MIME 類型
 * @param {string} extname - 副檔名 (例如: '.css', '.js')
 * @returns {string} MIME 類型
 */
export const getContentType = (extname) => {
  return contentTypes[extname] || 'text/plain';
};
