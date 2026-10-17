import { FaqSection } from '@/components/faq';
import { Features } from '@/components/features';
import { FinalCta } from '@/components/final-cta';
import { Hero } from '@/components/hero';
import { HowItWorks } from '@/components/how-it-works';
import { InstallGuide } from '@/components/install-guide';
import { MobileDownloadBar } from '@/components/mobile-download-bar';
import { Pricing } from '@/components/pricing';
import { PromoVideo } from '@/components/promo-video';
import { VoicesSection } from '@/components/voices-section';

export default function HomePage() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <VoicesSection />
      <PromoVideo />
      <Features />
      <Pricing />
      <InstallGuide />
      <FaqSection />
      <FinalCta />
      <MobileDownloadBar />
    </>
  );
}
