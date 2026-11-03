import {
    Headset,
    PackageCheck,
    ShieldCheck,
    UserCheck,
} from "lucide-react";

const assurances = [
    {
        icon: ShieldCheck,
        title: "Liability Protection",
        description:
            "Every booking is covered by our host guarantee — you're protected against accidental damage and liability for the full duration of the session.",
    },
    {
        icon: UserCheck,
        title: "Verified Profiles",
        description:
            "All hosts and creators complete identity verification before booking. See who you're working with before you ever share your space.",
    },
    {
        icon: PackageCheck,
        title: "Equipment Safety",
        description:
            "Studios list their gear with documented condition checks, and our safety standards ensure every session starts with equipment ready to work.",
    },
    {
        icon: Headset,
        title: "24/7 Host Support",
        description:
            "Real support around the clock. Chat, call, or email us any time — average first response is under 15 minutes, day or night.",
    },
];

const AboutUs = () => {
    return (
        <section id="about" className="border-b py-16 lg:py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
                    {/* Left: section intro */}
                    <div className="max-w-xl">
                        <span className="border-primary/20 bg-primary/10 text-primary inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium">
                            Host Guarantee &amp; Creator Support
                        </span>

                        <h2 className="text-foreground mt-5 text-3xl font-bold tracking-tight sm:text-4xl">
                            We Protect Your{" "}
                            <span className="text-primary">Space and Craft</span>{" "}
                            So You Can Focus on It
                        </h2>

                        <p className="text-muted-foreground mt-4 text-base leading-relaxed sm:text-lg">
                            Hosting your studio or creating in someone else's is built
                            on trust. StudioSpace backs every booking with platform
                            assurances that keep hosts safe and creators confident.
                        </p>
                    </div>

                    {/* Right: assurance cards */}
                    <div className="grid gap-6 sm:grid-cols-2">
                        {assurances.map((item) => {
                            const ItemIcon = item.icon;
                            return (
                                <div
                                    key={item.title}
                                    className="bg-card border-border rounded-3xl border p-6"
                                >
                                    <div className="bg-primary/10 text-primary flex size-12 items-center justify-center rounded-2xl">
                                        <ItemIcon className="size-6" />
                                    </div>

                                    <h3 className="mt-5 text-lg font-semibold">
                                        {item.title}
                                    </h3>

                                    <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                                        {item.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutUs;
