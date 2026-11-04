"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Loader2, MapPin, PenLine } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IStudio } from "@/type/Studios";

const MyStudios = ({
    email,
    onEdit,
    refreshKey,
}: {
    email: string;
    onEdit: (studio: IStudio) => void;
    refreshKey: number;
}) => {
    const [studios, setStudios] = useState<IStudio[] | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;

        const load = async () => {
            setIsLoading(true);
            try {
                const res = await fetch("http://localhost:8000/studios", {
                    cache: "no-store",
                });
                const data: IStudio[] = res.ok ? await res.json() : [];
                if (!cancelled) setStudios(data);
            } catch {
                if (!cancelled) setStudios([]);
            } finally {
                if (!cancelled) setIsLoading(false);
            }
        };

        load();
        return () => {
            cancelled = true;
        };
    }, [refreshKey]);

    if (isLoading) {
        return (
            <div className="text-muted-foreground flex items-center justify-center gap-2 py-16 text-sm">
                <Loader2 className="size-4 animate-spin" />
                Loading your studios...
            </div>
        );
    }

    const owned = studios!.filter(
        (studio) => studio.ownerEmail.toLowerCase() === email.toLowerCase()
    );

    if (owned.length === 0) {
        return (
            <div className="border-border bg-card flex flex-col items-center rounded-3xl border px-6 py-16 text-center">
                <h3 className="text-lg font-semibold">No studios yet</h3>
                <p className="text-muted-foreground mt-2 max-w-sm text-sm leading-relaxed">
                    Studios you add will appear here — and become instant
                    booking destinations for creators. Use the Add Studio tab
                    to list your first space.
                </p>
            </div>
        );
    }

    return (
        <div className="grid gap-4">
            {owned.map((studio) => (
                <div
                    key={studio._id}
                    className="border-border bg-card flex flex-col gap-4 rounded-3xl border p-4 sm:flex-row sm:items-center"
                >
                    {/* eslint-disable-next-line @next/next/no-img-element -- studio images are owner-provided and may not be whitelisted hosts */}
                    <img
                        src={studio.imageUrl}
                        alt={studio.title}
                        className="border-border aspect-video w-full rounded-2xl border object-cover sm:aspect-auto sm:h-16 sm:w-24"
                    />

                    <div className="min-w-0 flex-1">
                        <Link
                            href={`/studios/${studio._id}`}
                            className="hover:text-primary text-base font-semibold transition-colors"
                        >
                            {studio.title}
                        </Link>
                        <p className="text-muted-foreground mt-0.5 flex flex-wrap items-center gap-x-4 gap-y-0.5 text-xs">
                            <span className="flex items-center gap-1">
                                <MapPin className="size-3.5 shrink-0" />
                                {studio.location}
                            </span>
                            <span>{studio.category}</span>
                            <span>${studio.hourlyRate}/hr</span>
                        </p>
                    </div>

                    <Button
                        variant="outline"
                        size="sm"
                        className="cursor-pointer"
                        onClick={() => onEdit(studio)}
                    >
                        <PenLine className="size-4" />
                        Edit
                    </Button>
                </div>
            ))}
        </div>
    );
};

export default MyStudios;
