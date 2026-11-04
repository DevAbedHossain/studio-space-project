import { IStudio } from "@/type/Studios";
import StudioCard from "@/components/shared/StudioCard";

const StudiosList = async () => {

    const res = await fetch("http://localhost:8000/studios", { cache: "no-store" });
    const studios = await res.json();

    return (
        <section id="studios" className="border-b py-16 lg:py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Section header */}
                <div className="mx-auto max-w-xl text-center">
                    <span className="border-primary/20 bg-primary/10 text-primary inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium">
                        Featured Studios
                    </span>

                    <h2 className="text-foreground mt-5 text-3xl font-bold tracking-tight sm:text-4xl">
                        Choose the Perfect{" "}
                        <span className="text-primary">Studio for Your Session</span>
                    </h2>

                    <p className="text-muted-foreground mt-4 text-base leading-relaxed sm:text-lg">
                        Browse verified recording rooms, podcast booths, and
                        rehearsal spaces — book by the hour with instant
                        confirmation.
                    </p>
                </div>

                {/* Studio cards */}
                <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {studios.slice(0, 6).map((studio: IStudio) => (
                        <StudioCard key={studio._id} studio={studio} />
                    ))}
                </div>

            </div>
        </section>
    );
};

export default StudiosList;
