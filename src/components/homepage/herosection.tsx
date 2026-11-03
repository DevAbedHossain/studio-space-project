"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperClass } from "swiper";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { ArrowRight, Building2, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "@/styles/hero-slider.css";

const slides = [
    {
        image:
            "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=1600&auto=format&fit=crop",
        badge: "Recording studios",
        headline: "Book Your Perfect ",
        headlineHighlight: "Studio Space",
        headlineSuffix: " in Minutes",
        subtext:
            "Professional recording studios with world-class console and acoustic treatment — verified, available, and ready to reserve.",
    },
    {
        image:
            "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?q=80&w=1600&auto=format&fit=crop",
        badge: "Podcast studios",
        headline: "Record Your Next ",
        headlineHighlight: "Episode",
        headlineSuffix: " Like a Pro",
        subtext:
            "Broadcast-grade microphones, soundproof rooms, and expert engineers waiting for your next podcast session.",
    },
    {
        image:
            "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?q=80&w=1600&auto=format&fit=crop",
        badge: "Rehearsal rooms",
        headline: "Rehearse Where the ",
        headlineHighlight: "Music Lives",
        headlineSuffix: "",
        subtext:
            "Spacious, fully equipped rehearsal rooms — book by the hour, day, or month with instant confirmation.",
    },
];

const stats = [
    { value: "200+", label: "Studios listed" },
    { value: "5k+", label: "Happy creators" },
    { value: "24/7", label: "Instant booking" },
];

const HeroSection = () => {
    const swiperRef = useRef<SwiperClass | null>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <section className="border-b">
            <Swiper
                modules={[Autoplay, EffectFade, Pagination]}
                onSwiper={(swiper) => (swiperRef.current = swiper)}
                onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
                effect="fade"
                fadeEffect={{ crossFade: true }}
                autoplay={{ delay: 6000, disableOnInteraction: false }}
                pagination={{ clickable: true }}
                loop
                speed={700}
                className="hero-swiper"
            >
                {slides.map((slide, index) => (
                    <SwiperSlide key={slide.badge}>
                        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-24">
                            {/* Left: text + CTAs */}
                            <div
                                className={
                                    index === activeIndex
                                        ? "max-w-xl"
                                        : "max-w-xl opacity-40 transition-opacity"
                                }
                            >
                                <span className="border-primary/20 bg-primary/10 text-primary inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium">
                                    {slide.badge}
                                </span>

                                <h1 className="text-foreground mt-5 text-4xl font-bold tracking-tight sm:text-5xl">
                                    {slide.headline}
                                    <span className="text-primary">
                                        {slide.headlineHighlight}
                                    </span>
                                    {slide.headlineSuffix}
                                </h1>

                                <p className="text-muted-foreground mt-5 text-base leading-relaxed sm:text-lg">
                                    {slide.subtext}
                                </p>

                                {/* Punchy headline CTAs */}
                                <div className="mt-8 flex flex-wrap items-center gap-3">
                                    <Button
                                        size="lg"
                                        nativeButton={false}
                                        render={<Link href="/studios" />}
                                    >
                                        Explore Studios
                                        <ArrowRight className="size-4" />
                                    </Button>
                                </div>

                                {/* Trust stats */}
                                <div className="flex gap-8 py-5">
                                    {stats.map((stat) => (
                                        <div key={stat.label}>
                                            <p className="text-primary text-2xl font-bold sm:text-3xl">
                                                {stat.value}
                                            </p>
                                            <p className="text-muted-foreground mt-1 text-sm">
                                                {stat.label}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Right: high-res visual */}
                            <div>
                                <div className="border-border relative aspect-4/3 overflow-hidden rounded-3xl border shadow-2xl">
                                    <Image
                                        src={slide.image}
                                        alt={slide.badge}
                                        fill
                                        priority={index === 0}
                                        sizes="(min-width: 1024px) 560px, 90vw"
                                        className="object-cover"
                                    />
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}

            </Swiper>


        </section>
    );
};

export default HeroSection;
