# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 專案概述

這是 **DD_Woof（ㄉㄉ）** 的個人攝影網站，純靜態 HTML/CSS/JS，無任何建置工具或框架。

## 開發方式

無需安裝依賴，直接在瀏覽器開啟 HTML 檔案即可預覽。建議使用本地開發伺服器以避免瀏覽器的跨來源限制：

```bash
# 使用 Python（最簡單）
python -m http.server 8080

# 使用 Node.js（需全域安裝）
npx serve .
```

修改後直接重新整理瀏覽器即可，無需任何編譯步驟。

## 版本快取清除

CSS 和 JS 以查詢字串進行版本控制（例如 `?v=7`）。修改 `css/styles.css` 或 `js/main.js` 後，**必須同步更新所有頁面的版本號**，避免瀏覽器讀取舊快取：

- `index.html`：`css/styles.css?v=X` 與 `js/main.js?v=X`
- `services.html`：`css/styles.css?v=X`
- `portfolio.html`：`css/styles.css?v=X`

## 頁面架構

| 頁面 | 說明 |
|------|------|
| `index.html` | 首頁：輪播相簿 + 頭像 + 打字動畫 + 社群連結 |
| `services.html` | 攝影委託服務說明與費用 |
| `portfolio.html` | 作品集瀑布流格線，各格連至 Flickr 相簿 |

三個頁面共用：
- **`css/styles.css`**：所有樣式（含 CSS 設計系統變數）
- **`js/main.js`**：所有互動邏輯

Navbar、行動選單、Preloader 的 HTML 在每個頁面中**手動重複**，無模板系統。新增頁面時需完整複製此結構。

## CSS 設計系統

所有顏色定義為 `--neutral-*`（Teal 中性色）、`--primary-*`（萊姆綠）、`--secondary-*`（翠綠）CSS 變數，統一在 `:root` 區塊。語意化別名如 `--bg-body`、`--accent`、`--text-primary` 應優先使用，避免直接寫死顏色值。

頁面特定樣式以頁面層級 class 區分：
- 首頁：`.homepage-main`、`.carousel`、`.homepage-bg`
- 委託頁：`.services-page`、`.services-hero-bg`
- 作品集頁：`.portfolio-page`、`.portfolio-grid`

## `js/main.js` 功能模組

所有邏輯包裹在單一 `DOMContentLoaded` 監聽器中，以 `if (element)` 守衛條件讓各模組安全地在不同頁面執行：

| 功能 | 觸發條件 |
|------|----------|
| Preloader 淡出 | 所有頁面（`#preloader`） |
| 行動漢堡選單 | 所有頁面（`#hamburger`） |
| 桌面 Nav Toggle | 所有頁面（`#navToggleBtn`） |
| 輪播（自動播放 2.5 秒） | 僅首頁（`#carousel`） |
| Lightbox | 所有頁面（`#lightboxOverlay`） |
| 打字動畫 | 僅首頁（`#homepage-title`） |
| 滾動視差背景淡出 | 僅委託頁（`.services-hero-bg`） |
| 滾動顯示動畫（`.reveal`） | 所有頁面 |
| 一鍵複製（`.copy-trigger`） | 所有頁面 |
| Avatar 彩蛋（點擊三次觸發） | 僅首頁（`#avatarIcon`） |

## 語言規範

所有程式碼**註解**、**commit 訊息**、**文件**請以**正體中文**撰寫。
