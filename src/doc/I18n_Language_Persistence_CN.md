## 如何在 React 应用中使用 i18next 实现语言持久化

在构建多语言应用时，记住用户上次选择的语言（即使刷新页面或重新打开网站）是一种非常重要的用户体验优化。这种机制称为 **语言持久化**。

本文将演示如何使用 `react-i18next` 和 `i18next-browser-languagedetector` 实现语言持久化功能。

---

### ✅ 为什么需要语言持久化？

如果不做持久化：

* 每次访问应用时可能会恢复为浏览器默认语言；
* 用户每次都需要手动切换到他们偏好的语言。

启用持久化后：

* 用户只需选择一次语言；
* 应用会自动通过 `localStorage` 记住他们的选择。

---

### 📦 安装依赖

请确保已经安装以下依赖：

```bash
pnpm add i18next react-i18next i18next-browser-languagedetector
```

---

### 🔧 i18n 配置（关键部分）

在你的 `src/i18n/index.ts` 文件中：

```ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './locales/en.json';
import zh from './locales/zh.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      zh: { translation: zh },
    },
    fallbackLng: 'zh',
    interpolation: { escapeValue: false },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

export default i18n;
```

---

### 🧠 配置详解

* `order`：定义语言检测的优先顺序。

  * `localStorage`：优先检查上次用户是否保存了语言设置；
  * `navigator`：如果没有保存，则使用浏览器默认语言。

* `caches`：定义语言保存位置。

  * `['localStorage']`：将用户选择保存至本地存储，确保刷新页面语言不丢失。

---

### ✨ 语言切换组件示例

```tsx
import { useTranslation } from 'react-i18next';

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng); // 会自动更新 localStorage
  };

  return (
    <div>
      <button onClick={() => changeLanguage('en')}>English</button>
      <button onClick={() => changeLanguage('zh')}>中文</button>
    </div>
  );
};
```

---

### 🔄 使用步骤

1. 点击按钮切换语言；
2. 刷新页面；
3. 应用应能记住你的选择。

你可以打开 **开发者工具 → 应用 → localStorage**，查找键名 `i18nextLng` 来确认保存的语言值。

---

### ✅ 总结

只需简单几行配置，你就可以：

* 自动识别并记住用户的语言选择；
* 显著提升多语言用户体验。

这种方式非常适合在 Vite + React + i18next 项目中使用，且在生产环境下表现稳定。

如果你还想继续扩展，可以探索通过 Cookie 或 URL 参数实现语言持久化，以便服务端渲染（SSR）或深链接使用。如果你想深入了解这部分内容，也可以告诉我！
