import AboutUs from "@/components/homepage/aboutus";
import CategoryFeature from "@/components/homepage/categoryfeature";
import HeroSection from "@/components/homepage/herosection";
import HowItWork from "@/components/homepage/howitwork";
import StudiosList from "@/components/homepage/studioslist";


export default function Home() {
  return (
    <>
      <HeroSection />
      <CategoryFeature />
      <StudiosList />
      <HowItWork />
      <AboutUs />
    </>
  );
}
