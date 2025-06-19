## Build a Minimal Internationalization Demo with Vite + React + react-i18next

When working on frontend projects, internationalization (i18n) is a common requirement. While full-featured templates like lemon-template-react provide complete solutions, if you're just looking to quickly try out i18n functionality, there's no need to bring in such a heavyweight setup.

This article walks you through how to build a **minimal working Vite + React i18n demo** using `react-i18next` to support language switching and multilingual content.

---

### 🧱 Tech Stack

* **Vite**: Modern, fast build tool
* **React**: UI library
* **react-i18next + i18next**: Internationalization framework
* **i18next-browser-languagedetector**: Auto-detect and cache user language

---

### 📦 Initialize Project

```bash
pnpm create vite i18n-demo --template react-ts
cd i18n-demo
pnpm install
```

Install i18n dependencies:

```bash
pnpm add i18next react-i18next i18next-browser-languagedetector
```

---

### 📁 Project Structure

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

### 🧠 Configure i18n `src/i18n/index.ts`

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

### 🌐 Language Files

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

### 🔧 Components and Page

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

### 🚀 Run the Project

```bash
pnpm dev
```

Open your browser and go to [http://localhost:5173](http://localhost:5173). You’ll see:

* Default language is detected based on the browser or localStorage
* Language switches instantly on button click
* All text is handled via `t('key')`, allowing centralized translations

---

### ✅ Summary

This is a minimal yet functional i18n demo. It's great for prototypes and can be integrated into larger projects easily.

To integrate it into a project like lemon-template-react, simply copy the `i18n/` folder and register it globally.

You can also extend the demo with:

* Lazy loading translation files
* Dynamic page titles
* Integration with UI libraries like Ant Design’s `ConfigProvider`

---

Hope this helps you quickly grasp the core of i18n in a React project 🎉
