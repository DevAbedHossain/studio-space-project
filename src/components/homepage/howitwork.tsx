import { CalendarClock, Clapperboard, Search, Zap } from "lucide-react";

const steps = [
    {
        number: "01",
        icon: Search,
        title: "Discover Spaces",
        description:
            "Browse hundreds of verified recording, podcast, and rehearsal studios — filter by location, gear, and budget to find your perfect match.",
    },
    {
        number: "02",
        icon: CalendarClock,
        title: "Select Shoot Hours",
        description:
            "Pick the exact date and hours you need on the studio's real-time availability calendar — book by the hour, day, or full session.",
    },
    {
        number: "03",
        icon: Zap,
        title: "Book Instantly",
        description:
            "Confirm with secure checkout and get instant booking confirmation — no waiting, no back-and-forth emails, no hidden fees.",
    },
    {
        number: "04",
        icon: Clapperboard,
        title: "Create & Produce",
        description:
            "Show up, plug in, and create. Every studio is professionally maintained and engineer-ready so you can focus on your production.",
    },
];

const HowItWork = () => {
    return (
        <section id="how-it-works" className="border-b py-16 lg:py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Section header */}
                <div className="mx-auto max-w-xl text-center">
                    <span className="border-primary/20 bg-primary/10 text-primary inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium">
                        How Booking Works
                    </span>

                    <h2 className="text-foreground mt-5 text-3xl font-bold tracking-tight sm:text-4xl">
                        From Discovery to Production in{" "}
                        <span className="text-primary">Four Simple Steps</span>
                    </h2>

                    <p className="text-muted-foreground mt-4 text-base leading-relaxed sm:text-lg">
                        Booking studio time shouldn't be complicated. StudioSpace takes
                        you from searching to shooting in minutes.
                    </p>
                </div>

                {/* Steps */}
                <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {steps.map((step) => {
                        const StepIcon = step.icon;
                        return (
                            <div
                                key={step.number}
                                className="bg-card border-border relative rounded-3xl border p-6"
                            >
                                <span className="text-muted-foreground/50 absolute right-5 top-4 text-4xl font-bold">
                                    {step.number}
                                </span>

                                <div className="bg-primary/10 text-primary flex size-12 items-center justify-center rounded-2xl">
                                    <StepIcon className="size-6" />
                                </div>

                                <h3 className="mt-5 text-lg font-semibold">
                                    {step.title}
                                </h3>

                                <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                                    {step.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default HowItWork;
