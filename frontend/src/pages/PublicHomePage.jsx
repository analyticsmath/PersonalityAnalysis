import { PublicFooter, PublicLayout } from '../components/public/PublicChrome';
import HomeNarrativeV3 from '../components/public/marketing/HomeNarrativeV3';
import './PublicHomePage.css';

export default function PublicHomePage() {
  return (
    <PublicLayout page="home" footerMode="integrated">
      <main id="main-content" className="marketing-home-root">
        <HomeNarrativeV3 />
        <PublicFooter integrated />
      </main>
    </PublicLayout>
  );
}
