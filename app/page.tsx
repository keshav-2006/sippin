import SiteHeader from './components/SiteHeader';
import Hero from './components/Hero';
import MenuSection from './components/MenuSection';
import QuoteBand from './components/QuoteBand';
import { FloatingContact } from './components/Extras';
import { SiteFooter, Space, Story, Ticker, Visit } from './components/Sections';

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <SiteHeader />
      <main id="main">
        <Hero />
        <Ticker />
        <Story />
        <MenuSection />
        <Space />
        <QuoteBand />
        <Visit />
      </main>
      <SiteFooter />
      <FloatingContact />
    </>
  );
}
