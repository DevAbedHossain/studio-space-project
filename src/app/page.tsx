import AboutUs from "@/components/homepage/aboutus";
import CategoryFeature from "@/components/homepage/categoryfeature";
import HeroSection from "@/components/homepage/herosection";
import HowItWork from "@/components/homepage/howitwork";
import StudiosList from "@/components/homepage/studioslist";
import { IStudio } from "@/type/Studios";

export default async function Home() {
    // Fetched once and shared by both homepage sections (StudiosList +
    // CategoryFeature), cached for a minute instead of refetching per visit.
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/studios`, {
        next: { revalidate: 60 },
    });
    const studios: IStudio[] = await res.json();

    return (
        <>
            <HeroSection />
            <CategoryFeature studios={studios} />
            <StudiosList studios={studios} />
            <HowItWork />
            <AboutUs />
        </>
    );
}
