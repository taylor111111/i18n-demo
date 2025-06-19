## 用 Vite + React + react-i18next 搭建一个最小可运行的国际化 Demo

在做前端项目时，国际化（i18n）是一个常见的需求。许多模板如 lemon-template-react 提供了完整的解决方案，但如果你只是想快速实践 i18n 功能，其实不需要引入太重的架构。

这篇文章将带你从零搭建一个 **最小可运行的 Vite + React 国际化 Demo**，基于 `react-i18next` 实现语言切换和文本多语言支持。

---

### 🧱 技术选型

* **Vite**：快速构建工具，替代 create-react-app
* **React**：视图库
* **react-i18next + i18next**：国际化解决方案
* **i18next-browser-languagedetector**：自动识别语言 & 本地缓存

---
### 🌍 国际化 Demo 功能预览

* 支持中英文切换；
* 页面文字通过 key 显示；
* 支持语言持久化（存 localStorage）；
* 自动记住上次选择语言；

---

### 📦 初始化项目

```bash
pnpm create vite i18n-demo --template react-ts
cd i18n-demo
pnpm install
```

安装国际化相关依赖：

```bash
pnpm add i18next react-i18next i18next-browser-languagedetector
```

---

### 📁 目录结构

```bash
src/
├── i18n/
│   ├── index.ts
│   └── locales/
│       ├── en.json
│       └── zh.json
├── components/
│   └── LanguageSwitcher.tsx
├── pages/
│   └── Home.tsx
├── App.tsx
└── main.tsx
```

---

### 🧠 配置国际化 `src/i18n/index.ts`

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

### 🌐 多语言文案文件

`src/i18n/locales/en.json`

```json
{
  "title": "Welcome to the i18n demo",
  "description": "This is a simple internationalization example.",
  "language": "Language"
}
```

`src/i18n/locales/zh.json`

```json
{
  "title": "欢迎使用 i18n 演示",
  "description": "这是一个简单的国际化示例。",
  "language": "语言"
}
```

---

### 🔧 页面与切换组件

`src/components/LanguageSwitcher.tsx`

```tsx
import { useTranslation } from 'react-i18next';

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const changeLanguage = (lng: string) => i18n.changeLanguage(lng);

  return (
    <div style={{ marginTop: 20 }}>
      <button onClick={() => changeLanguage('zh')}>中文</button>
      <button onClick={() => changeLanguage('en')} style={{ marginLeft: 10 }}>English</button>
    </div>
  );
};
```

`src/pages/Home.tsx`

```tsx
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from '../components/LanguageSwitcher';

const Home = () => {
  const { t } = useTranslation();

  return (
    <div style={{ padding: 40 }}>
      <h1>{t('title')}</h1>
      <p>{t('description')}</p>
      <LanguageSwitcher />
    </div>
  );
};

export default Home;
```

---

### 🚀 启动项目并预览效果

```bash
pnpm dev
```

访问浏览器中的 [http://localhost:5173，你将看到：](http://localhost:5173，你将看到：)

* 默认语言基于浏览器识别（或 localStorage 记忆）
* 点击按钮可在中英文之间实时切换
* 所有文字由 `t('key')` 控制，文案统一维护

---

### ✅ 总结

这就是一个最小可运行的国际化 demo。它不仅能用于原型验证，也可以轻松迁移到大型项目中。

如需集成到企业模板如 lemon-template-react，只需将 `i18n/` 拷贝过去，再全局注册一次即可。

你还可以扩展支持：

* 动态加载语言包（懒加载）
* 页面标题国际化
* 与组件库如 Ant Design 的 `ConfigProvider` 协同语言切换

---

希望这个 Demo 能帮你快速掌握 i18n 的核心实践 🎉
