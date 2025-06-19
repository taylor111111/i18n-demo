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