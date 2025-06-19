## How to Persist Language Selection with i18next in a React App

When building a multilingual application, it's essential to provide a smooth user experience by remembering the language a user selects — even after a page refresh or reopening the site. This is known as **language persistence**.

In this article, we’ll walk through how to implement language persistence using `react-i18next` and `i18next-browser-languagedetector`.

---

### ✅ Why Persist the Language?

Without persistence:

* The app may revert to the browser default language on each visit.
* Users will need to manually switch back to their preferred language.

With persistence:

* Users only select once.
* The app remembers their choice automatically via `localStorage`.

---

### 📦 Installation

Ensure you have the following packages installed:

```bash
pnpm add i18next react-i18next i18next-browser-languagedetector
```

---

### 🔧 i18n Configuration (Key Part)

In your `src/i18n/index.ts` file:

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

### 🧠 How It Works

* `order`: Defines the priority of language detection sources.

    * `localStorage`: First checks if a language was saved from a previous session.
    * `navigator`: If not found, falls back to the browser's default language.

* `caches`: Defines where to store the detected language.

    * `['localStorage']`: Saves the user's selection so it persists across reloads.

---

### ✨ Language Switcher Example

```tsx
import { useTranslation } from 'react-i18next';

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng); // This also updates localStorage automatically
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

### 🔄 Try It Out

1. Switch language using the buttons.
2. Reload the page.
3. The app should remember your selection.

You can open **DevTools → Application → localStorage** and look for the key `i18nextLng` to confirm the stored value.

---

### ✅ Summary

With just a few lines of config, you can:

* Automatically detect and persist the user’s language
* Provide a more seamless internationalization experience

This setup works great in any Vite + React + i18next stack and scales well for production use.

Want to go further? You can also persist language in cookies or query strings for SSR and deep linking. Let me know if you’d like to explore that next!
