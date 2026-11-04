import StudioCard from '@/components/shared/StudioCard';
import { IStudio } from '@/type/Studios';
import Link from 'next/link';
import { ArrowRight, SearchX } from 'lucide-react';


const CategoryDetailsPage = async ({ params }: { params: Promise<{ category: string }> }) => {

    const { category } = await params;

    const res = await fetch(`http://localhost:8000/studios/category/${category}`);
    const stuidos = await res.json();

    // UI-only: make the slug readable for display
    const displayCategory = decodeURIComponent(category);

    return (
        <section className="py-16 lg:py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Back link */}
                <Link
                    href="/studios"
                    className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1 text-sm transition-colors"
                >
                    <ArrowRight className="size-4 rotate-180" />
                    All studios
                </Link>

                {/* Page header */}
                <div className="mx-auto mt-6 max-w-xl text-center">
                    <span className="border-primary/20 bg-primary/10 text-primary inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium">
                        {stuidos.length} {stuidos.length === 1 ? 'studio' : 'studios'} in{' '}
                        {displayCategory}
                    </span>

                    <h1 className="text-foreground mt-5 text-3xl font-bold tracking-tight sm:text-4xl">
                        {displayCategory}{" "}
                        <span className="text-primary">Studios</span>
                    </h1>

                    <p className="text-muted-foreground mt-4 text-base leading-relaxed sm:text-lg">
                        Every verified {displayCategory.toLowerCase()} space
                        available for booking by the hour — reserve your slot in
                        minutes.
                    </p>
                </div>

                {/* Studio cards */}
                {stuidos.length > 0 ? (
                    <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {stuidos.map((studio: IStudio) => (
                            <StudioCard key={studio._id} studio={studio} />
                        ))}
                    </div>
                ) : (
                    <div className="border-border bg-card mt-12 flex flex-col items-center rounded-3xl border px-6 py-16 text-center">
                        <SearchX className="text-muted-foreground size-10" />
                        <h2 className="mt-4 text-lg font-semibold">
                            No studios in this category yet
                        </h2>
                        <p className="text-muted-foreground mt-2 max-w-sm text-sm leading-relaxed">
                            We couldn&apos;t find any {displayCategory.toLowerCase()}{" "}
                            studios right now. Try another category or check back
                            soon.
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default CategoryDetailsPage;
