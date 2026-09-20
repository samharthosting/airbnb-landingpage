import { Header } from "@/components/Header";
import { FloatingCta } from "@/components/FloatingCta";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/sections/Hero";
import { BrandStatement } from "@/components/sections/BrandStatement";
import { TrustBar } from "@/components/sections/TrustBar";
import { WhyShortTermRentals } from "@/components/sections/WhyShortTermRentals";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { MeetSam } from "@/components/sections/MeetSam";
import { Showcase } from "@/components/sections/Showcase";
import { Services } from "@/components/sections/Services";
import { WhyHartHosting } from "@/components/sections/WhyHartHosting";
import { Assessment } from "@/components/sections/Assessment";
import { GuestReviews } from "@/components/sections/GuestReviews";
import { Faq } from "@/components/sections/Faq";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <BrandStatement />
        <TrustBar />
        <WhyShortTermRentals />
        <HowItWorks />
        <MeetSam />
        <GuestReviews />
        <Showcase />
        <Services />
        <WhyHartHosting />
        <Assessment />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <FloatingCta />
    </>
  );
}
