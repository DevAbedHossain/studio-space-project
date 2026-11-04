import { IStudio } from "@/type/Studios";
import Link from "next/link";
import { MapPin, Star, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const StudioCard = ({ studio }: { studio: IStudio }) => {

    return (
        <div className="bg-card border-border group flex flex-col overflow-hidden rounded-3xl border">
            {/* Image */}
            <div className="border-border relative aspect-video overflow-hidden border-b">
                {/* eslint-disable-next-line @next/next/no-img-element -- studio images are owner-provided and may not be whitelisted hosts */}
                <img
                    src={studio.imageUrl}
                    alt={studio.title}
                    className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-x-3 top-3 flex items-center justify-between">
                    <span className="rounded-full border border-transparent bg-background/80 px-3 py-1 text-xs font-medium backdrop-blur">
                        {studio.category}
                    </span>
                    <span className="flex items-center gap-1 rounded-full bg-background/80 px-3 py-1 text-xs font-medium backdrop-blur">
                        <Star className="fill-amber-400 stroke-amber-400 size-3.5" />
                        {studio.rating} ({studio.reviews})
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col gap-4 p-6">
                <div>
                    <h3 className="text-lg font-semibold">{studio.title}</h3>
                    <p className="text-muted-foreground mt-1 flex items-center gap-1.5 text-sm">
                        <MapPin className="size-4 shrink-0" />
                        {studio.location}
                    </p>
                </div>

                {/* Footer: price + capacity + host */}
                <div className="border-border mt-auto flex items-center justify-between border-t pt-4">

                    <p className="text-primary text-xl font-bold">
                        ${studio.hourlyRate}
                        <span className="text-muted-foreground text-sm font-normal">
                            /hr
                        </span>
                    </p>
                    <p className="text-muted-foreground mt-0.5 flex items-center gap-1 text-xs">
                        <Users className="size-3.5 shrink-0" />
                        Up to {studio.maxCapacity} people
                    </p>

                </div>

                {/* View details */}
                <Button
                    variant="outline"
                    nativeButton={false}
                    render={<Link href={`/studios/${studio._id}`} />}
                >
                    View Details
                </Button>

            </div>
        </div>
    );
};

export default StudioCard;
