# 程式碼重構練習：模組化設計

## 📋 題目背景

目前的 `2b.js` 包含了所有功能的程式碼（共 272 行），包括：
- HTTP 伺服器建立
- 路由邏輯
- MIME 類型映射
- EJS 模板渲染
- 靜態文件處理
- 404 錯誤處理

雖然功能完整，但程式碼過長且職責混雜，不易維護和重複使用。

## 🎯 重構目標

請將 `2b.js` 重構為模組化設計，建立 `2b-refactored.js`，使主檔案**專注於路由邏輯**，並將共同功能抽取成獨立的 ES6 模組。

## 📝 題目要求

### 第一部分：建立 MIME 類型模組 (20%)

**檔案位置：** `utils/mimeTypes.js`

**要求：**
1. 將 `2b.js` 中的 `contentTypes` 物件抽取出來
2. 建立 `getContentType(extname)` 函數，根據副檔名回傳對應的 MIME 類型
3. 使用 ES6 的 `export` 匯出功能

**範例用法：**
```javascript
import { getContentType } from './utils/mimeTypes.js';
const mimeType = getContentType('.css'); // 回傳 'text/css; charset=utf-8'
```

---

### 第二部分：建立模板渲染模組 (30%)

**檔案位置：** `utils/templateRenderer.js`

**要求：**
1. 抽取 EJS 模板渲染的邏輯
2. 建立 `renderTemplate(res, filePath, data)` 函數
   - `res`: HTTP 回應物件
   - `filePath`: EJS 檔案路徑
   - `data`: 傳遞給模板的資料（預設為空物件）
3. 建立 `render404(res)` 函數，專門處理 404 錯誤頁面
4. 包含錯誤處理（檔案讀取失敗時回傳 500 錯誤）

**範例用法：**
```javascript
import { renderTemplate, render404 } from './utils/templateRenderer.js';

// 渲染首頁
renderTemplate(res, '/index.ejs', { message: '歡迎' });

// 顯示 404 頁面
render404(res);
```

---

### 第三部分：建立靜態文件處理模組 (30%)

**檔案位置：** `utils/staticFileHandler.js`

**要求：**
1. 抽取靜態文件處理邏輯
2. 建立 `handleStaticFile(res, filePath)` 函數
   - 讀取靜態文件（CSS、JS、圖片等）
   - 根據副檔名設定正確的 Content-Type
   - 若文件不存在，自動呼叫 `render404()` 顯示 404 頁面
3. 需要引入 `mimeTypes.js` 和 `templateRenderer.js` 模組

**範例用法：**
```javascript
import { handleStaticFile } from './utils/staticFileHandler.js';

// 處理靜態文件請求
handleStaticFile(res, '/style.css');
```

---

### 第四部分：重構主檔案 (20%)

**檔案位置：** `2b-refactored.js`

**要求：**
1. 引入必要的模組
2. **保留使用 `switch` 語句**處理路由
3. 主檔案應專注於路由邏輯，不包含實作細節
4. 路由規則：
   - `/` → 渲染 `index.ejs`，傳遞資料 `{ message: '您好 xxx' }`
   - `/calculator` → 渲染 `index2.ejs`
   - 其他路徑 → 嘗試作為靜態文件處理

**目標：** 將主檔案從 272 行縮減到 50 行以內

**範例架構：**
```javascript
import http from 'http';
import { renderTemplate } from './utils/templateRenderer.js';
import { handleStaticFile } from './utils/staticFileHandler.js';

http.createServer((req, res) => {
  switch (req.url) {
    case '/':
      // 你的程式碼
      break;
    case '/calculator':
      // 你的程式碼
      break;
    default:
      // 你的程式碼
      break;
  }
}).listen(3000, () => {
  console.log('伺服器已啟動！');
});
```

---

## ⚙️ 設定 ES6 模組支援

在 `package.json` 中加入：
```json
{
  "type": "module",
  "dependencies": {
    "ejs": "^3.1.10"
  }
}
```

---

## ✅ 測試驗證

執行重構後的伺服器：
```bash
node 2b-refactored.js
```

測試以下功能是否正常：
1. 訪問 `http://localhost:3000/` - 應顯示 index.ejs
2. 訪問 `http://localhost:3000/calculator` - 應顯示 index2.ejs
3. 訪問 `http://localhost:3000/style.css` - 應正確載入 CSS
4. 訪問 `http://localhost:3000/notfound` - 應顯示 404 錯誤頁面

---

## 🎓 評分標準

| 項目 | 分數 | 說明 |
|------|------|------|
| MIME 類型模組 | 20% | 正確匯出函數，功能完整 |
| 模板渲染模組 | 30% | 包含錯誤處理，可正確渲染模板 |
| 靜態文件處理模組 | 30% | 正確處理靜態文件與 404 情況 |
| 重構主檔案 | 20% | 程式碼簡潔，專注路由邏輯 |
| **加分項** | +10% | 程式碼註解清楚，符合 ES6 規範 |

---

## 💡 學習重點

透過本題目，你將學習到：

1. **模組化設計 (Modular Design)**
   - 單一職責原則 (Single Responsibility Principle)
   - 關注點分離 (Separation of Concerns)

2. **ES6 模組系統**
   - `import` / `export` 語法
   - 具名匯出 vs 預設匯出

3. **程式碼可維護性**
   - 降低耦合度
   - 提高可讀性
   - 促進程式碼重用

4. **重構技巧**
   - 識別重複的程式碼
   - 抽取共同邏輯
   - 保持功能不變的前提下改善結構

---

## 📚 參考資料

- [MDN: JavaScript modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)
- [Node.js ES modules](https://nodejs.org/api/esm.html)
- [Clean Code 原則](https://github.com/ryanmcdermott/clean-code-javascript)
