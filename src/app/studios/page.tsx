import { SearchX } from "lucide-react";
import StudioCard from "@/components/shared/StudioCard";
import { IStudio } from "@/type/Studios";


const StudiosPage = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/studios`, { cache: "no-store" });
    const studios = await res.json();

    return (
        <section className="py-16 lg:py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Page header */}
                <div className="mx-auto max-w-xl text-center">
                    <span className="border-primary/20 bg-primary/10 text-primary inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium">
                        All Studios
                    </span>

                    <h1 className="text-foreground mt-5 text-3xl font-bold tracking-tight sm:text-4xl">
                        Explore{" "}
                        <span className="text-primary">Every Studio</span>
                    </h1>

                    <p className="text-muted-foreground mt-4 text-base leading-relaxed sm:text-lg">
                        Browse verified recording rooms, podcast booths, and
                        rehearsal spaces — book by the hour with instant
                        confirmation.
                    </p>
                </div>

                {/* Studio cards */}
                <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {studios.map((studio: IStudio) => (
                        <StudioCard key={studio._id} studio={studio} />
                    ))}
                </div>

            </div>
        </section>
    );
};

export default StudiosPage;
