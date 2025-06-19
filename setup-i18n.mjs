import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const files = [
  {
    filePath: 'src/i18n/index.ts',
    content: `
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
`.trim(),
  },
  {
    filePath: 'src/i18n/locales/en.json',
    content: JSON.stringify({
      title: 'Welcome to the i18n demo',
      description: 'This is a simple internationalization example.',
      language: 'Language',
    }, null, 2),
  },
  {
    filePath: 'src/i18n/locales/zh.json',
    content: JSON.stringify({
      title: '欢迎使用 i18n 演示',
      description: '这是一个简单的国际化示例。',
      language: '语言',
    }, null, 2),
  },
  {
    filePath: 'src/components/LanguageSwitcher.tsx',
    content: `
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
`.trim(),
  },
  {
    filePath: 'src/pages/Home.tsx',
    content: `
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
`.trim(),
  },
];

function ensureDir(filePath) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

for (const { filePath, content } of files) {
  const fullPath = path.join(__dirname, filePath);
  ensureDir(fullPath);
  fs.writeFileSync(fullPath, content, 'utf8');
  console.log(`✅ Created ${filePath}`);
}

// 添加 import './i18n'; 到 main.tsx
const mainPath = path.join(__dirname, 'src/main.tsx');
if (fs.existsSync(mainPath)) {
  let mainContent = fs.readFileSync(mainPath, 'utf8');
  if (!mainContent.includes(`import './i18n'`)) {
    mainContent = `import './i18n';\n` + mainContent;
    fs.writeFileSync(mainPath, mainContent, 'utf8');
    console.log(`✅ Updated src/main.tsx to include i18n setup`);
  }
}

