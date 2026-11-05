"use client";


import Link from "next/link";
import { MapPin, Star, Users, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IStudio } from "@/type/Studios";

const StudioCardProfile = ({ studio }: { studio: IStudio }) => {

    return (
        <div className="bg-card border-border group flex flex-col overflow-hidden rounded-3xl border sm:flex-row">
            {/* Image */}
            <div className="border-border relative aspect-video overflow-hidden border-b sm:aspect-auto sm:w-56 sm:shrink-0 sm:border-b-0 sm:border-r">
                {/* eslint-disable-next-line @next/next/no-img-element -- studio images are owner-provided and may not be whitelisted hosts */}
                <img
                    src={studio.imageUrl}
                    alt={studio.title}
                    className="size-full h-51 object-cover transition-transform duration-500 group-hover:scale-105"
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
            <div className="flex min-w-0 flex-1 flex-col p-5">
                <div>
                    <Link
                        href={`/studios/${studio._id}`}
                        className="hover:text-primary text-lg font-semibold transition-colors"
                    >
                        {studio.title}
                    </Link>
                    <p className="text-muted-foreground mt-1 flex items-center gap-1.5 text-sm">
                        <MapPin className="size-4 shrink-0" />
                        {studio.location}
                    </p>
                </div>

                {/* Price + capacity */}
                <div className="mt-4 flex items-center gap-4">
                    <p className="text-primary text-xl font-bold">
                        ${studio.hourlyRate}
                        <span className="text-muted-foreground text-sm font-normal">
                            /hr
                        </span>
                    </p>
                    <p className="text-muted-foreground flex items-center gap-1 text-xs">
                        <Users className="size-3.5 shrink-0" />
                        Up to {studio.maxCapacity} people
                    </p>
                </div>

                {/* Actions */}
                <div className="border-border mt-5 flex flex-wrap items-center gap-2 border-t pt-4">
                    <Button
                        variant="outline"
                        size="sm"
                        nativeButton={false}
                        render={<Link href={`/studios/${studio._id}`} />}
                    >
                        View Details
                    </Button>


                    <Button size="sm" >
                        <Pencil className="size-4" />
                        Edit
                    </Button>



                    <Button variant="destructive" size="sm">
                        <Trash2 className="size-4" />
                        Delete
                    </Button>

                </div>
            </div>
        </div>
    );
};

export default StudioCardProfile;
