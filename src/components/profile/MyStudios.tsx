import { IStudio } from '@/type/Studios';
import StudioCard from '../shared/StudioCard';
import Link from 'next/link';
import { Plus } from 'lucide-react';

const MyStudios = async ({ ownerEmail }: { ownerEmail: string }) => {

    const res = await fetch(`http://localhost:8000/studios/owner/${ownerEmail}`)
    const studios = await res.json();
    console.log("studios", studios)

    return (
        <div className="space-y-6">
            {/* Studio summary */}
            <div className="flex flex-col justify-between gap-3 rounded-xl bg-violet-50 p-4 dark:bg-violet-950/30 sm:flex-row sm:items-center">
                <div>
                    <h3 className="font-semibold">
                        Your Studio Listings
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                        You have {studios.length}{" "}
                        {studios.length === 1 ? "studio" : "studios"} listed on StudioSpace.
                    </p>
                </div>

                <Link
                    href="/studios/add"
                    className="inline-flex h-9 items-center justify-center rounded-md bg-violet-600 px-3 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-violet-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                    <Plus className="mr-2 size-4" />
                    Add Studio
                </Link>
            </div>

            {/* Studio cards */}
            <div className="grid gap-5 sm:grid-cols-2">
                {studios.map((studio: IStudio) => (
                    <StudioCard key={studio._id} studio={studio} />
                ))}
            </div>
        </div>
    );
};

export default MyStudios;